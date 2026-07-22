#!/usr/bin/env python3
"""
Follow-up: fix library downloads (base64 via telnet) and restore admin password.
"""
import os
import subprocess
import sys
import telnetlib
import time
import base64

HOST = "192.168.1.10"
USER = "root"
PASSWORD = "admin"
OUTDIR = "/home/hiago/repositories/homelab/camera/dumps/live"

os.makedirs(OUTDIR, exist_ok=True)


def log(msg):
    print(f"[*] {msg}")


def tcmd(tn, cmd, timeout=15):
    tn.write(cmd.encode() + b"\n")
    time.sleep(0.3)
    try:
        data = tn.read_until(b"# ", timeout=timeout)
        return data.decode(errors="replace")
    except Exception:
        data = tn.read_very_eager()
        return data.decode(errors="replace")


def connect_telnet():
    log(f"Connecting to {HOST}:23 ...")
    tn = telnetlib.Telnet(HOST, 23, timeout=15)
    tn.read_until(b"login: ", timeout=10)
    tn.write(USER.encode() + b"\n")
    tn.read_until(b"Password: ", timeout=10)
    tn.write(PASSWORD.encode() + b"\n")
    time.sleep(0.5)
    tn.read_until(b"# ", timeout=10)
    tn.write(b"\n")
    time.sleep(0.3)
    tn.read_until(b"# ", timeout=5)
    log("Connected.")
    return tn


def main():
    tn = connect_telnet()

    # ─── TASK A: Download libraries via base64 over telnet ───
    log("── Downloading libraries via base64 over telnet ──")
    libs = [
        ("/mnt/mtd/ipc/tmpfs/libNetLib.so", "libNetLib.so"),
        ("/mnt/mtd/ipc/tmpfs/libXqAPILib.so", "libXqAPILib.so"),
        ("/mnt/mtd/ipc/tmpfs/libxqun.so", "libxqun.so"),
    ]

    for src, fname in libs:
        # Get file size
        out = tcmd(tn, f"ls -la {src} 2>&1")
        log(f"  {fname}: {out.strip().splitlines()[-1] if out.strip() else 'N/A'}")

        # Base64 encode on camera, capture via telnet
        log(f"  Encoding {fname} ...")
        out = tcmd(tn, f"echo B64START && base64 {src} && echo B64END", timeout=60)
        # Extract base64 content
        if "B64START" in out and "B64END" in out:
            b64_data = out.split("B64START", 1)[1].split("B64END", 1)[0]
            # Remove shell prompt artifacts and command echo
            lines = b64_data.strip().splitlines()
            clean_lines = [l for l in lines if not l.startswith("echo B64START") and not l.startswith("base64") and "# " not in l]
            b64_data = "".join(clean_lines)
            try:
                raw = base64.b64decode(b64_data.strip())
                dest = os.path.join(OUTDIR, fname)
                with open(dest, "wb") as f:
                    f.write(raw)
                log(f"  Saved {fname}: {len(raw)} bytes")
            except Exception as e:
                log(f"  ERROR decoding {fname}: {e}")
        else:
            log(f"  Failed to get base64 for {fname}")

    # ─── TASK B: Look for kcore alternative ───
    log("── Checking /proc/kcore alternatives ──")
    for f in ["/proc/kcore", "/proc/kallsyms", "/proc/modules", "/proc/config.gz"]:
        out = tcmd(tn, f"ls -la {f} 2>&1")
        log(f"  {f}: {out.strip().splitlines()[-1] if out.strip() else 'N/A'}")

    log("  Checking /proc/...")
    out = tcmd(tn, "ls /proc/ | head -40")
    log(f"  /proc top entries:\n{out}")

    # ─── TASK C: Restore password to admin ───
    log("── Restoring admin password ──")

    # Verify current state - try admin:admin
    res = subprocess.run(
        ["curl", "-s", "-u", "admin:admin",
         f"http://{HOST}/cgi-bin/hi3510/param.cgi?cmd=getuserattr"],
        capture_output=True, text=True, timeout=15
    )
    if "admin" in res.stdout:
        log("Password is currently 'admin'. Restoring to admin...")

        # Try sending through UDP HDS protocol
        import socket
        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        sock.settimeout(5)
        # Try setting password directly via HDS
        payload = b'CMD * HDS/1.0\r\nusrpwd set -setusrpwd&admin:admin\r\n\r\n'
        log(f"  Sending HDS setusrpwd command ...")
        sock.sendto(payload, (HOST, 12222))
        try:
            resp, addr = sock.recvfrom(4096)
            log(f"  HDS response: {resp.decode(errors='replace').strip()}")
        except socket.timeout:
            log("  HDS timeout (may still have worked)")
        sock.close()

        time.sleep(2)

        # Verify
        res2 = subprocess.run(
            ["curl", "-s", "-u", "root:admin",
             f"http://{HOST}/cgi-bin/hi3510/param.cgi?cmd=getuserattr"],
            capture_output=True, text=True, timeout=15
        )
        if "admin" in res2.stdout.lower():
            log("  Password restored - root:admin now works for HTTP.")
        else:
            log("  Still cannot auth with root:admin. Trying admin:admin...")
            res3 = subprocess.run(
                ["curl", "-s", "-u", "admin:admin",
                 f"http://{HOST}/cgi-bin/hi3510/param.cgi?cmd=getuserattr"],
                capture_output=True, text=True, timeout=15
            )
            if "admin" in res3.stdout.lower():
                log("  admin:admin works for HTTP.")
            else:
                log(f"  Response: {res3.stdout[:300]}")
                log("  WARNING: Could not verify password restore!")
    else:
        log("Password appears to already be something other than 'admin'.")
        log(f"Response: {res.stdout[:300]}")

    # Also try the CGI restore with different format
    log("  Trying setuserattr CGI restore...")
    for fmt in [
        "cmd=setuserattr&-userattr&admin:0:admin:Administrator",
        "cmd=setuserattr&-userattr&admin:admin:0:Administrator",
        "cmd=setuserattr&-userattr&admin:0:admin:Administrator",
        "cmd=setuserattr&-userattr=admin:0:admin:Administrator",
    ]:
        res = subprocess.run(
            ["curl", "-s", "-u", "admin:admin",
             f"http://{HOST}/cgi-bin/hi3510/param.cgi?{fmt}"],
            capture_output=True, text=True, timeout=15
        )
        log(f"    Format: {fmt[:60]}... -> {res.stdout.strip()[:100]}")
        if "Error" not in res.stdout and res.stdout.strip():
            log(f"    POTENTIAL SUCCESS with format: {fmt}")
            break

    # ─── TASK D: Read the camera's admin-auth and user config ───
    log("── Reading camera config files ──")
    for f in [
        "/etc/shadow",
        "/etc/passwd",
        "/etc/config/passwd",
        "/mnt/mtd/Config/Account1",
        "/mnt/mtd/Config/passwd",
        "/mnt/custom/Config/Account1",
        "/tmp/ipc.cfg",
    ]:
        out = tcmd(tn, f"cat {f} 2>&1 | head -20")
        if out.strip() and "No such file" not in out and "can't open" not in out:
            log(f"  {f}:\n{out[:500]}")
        else:
            log(f"  {f}: not found")

    # Find where password is stored
    log("  Searching for password config files...")
    out = tcmd(tn, "find /mnt -name '*password*' -o -name '*Account*' -o -name '*passwd*' 2>/dev/null")
    log(f"  Password-related files:\n{out}")

    # ─── TASK E: Run missing commands ───
    log("── Re-running arp/ping with diagnostic ──")

    out = tcmd(tn, "arp -a 2>&1; echo EXITCODE=$?")
    log(f"  arp:\n{out[:500]}")

    out = tcmd(tn, "which arp ping netstat iwconfig iwpriv 2>&1")
    log(f"  which:\n{out}")

    out = tcmd(tn, "cat /proc/net/arp 2>&1")
    log(f"  /proc/net/arp:\n{out[:500]}")

    out = tcmd(tn, "ifconfig 2>&1")
    log(f"  ifconfig:\n{out[:500]}")

    # Cleanup: remove temp files
    log("── Cleanup ──")
    tcmd(tn, "rm -f /tmp/libNetLib.so /tmp/libXqAPILib.so /tmp/libxqun.so /tmp/kcore.dump")
    log("  Cleanup done.")

    tn.write(b"exit\n")
    tn.close()
    log("Done.")


if __name__ == "__main__":
    main()
