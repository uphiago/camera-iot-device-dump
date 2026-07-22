# Camera Security Investigation Dossier

Hipcam PTZ IP Camera (Goke GK7102 SoC, ARM1176JZF-S ARMv6, 600MHz)

## Documents

| Document | Description |
|----------|-------------|
| [CAMERA_INFO.md](CAMERA_INFO.md) | Hardware, firmware, network, CGI API, exploits |
| [MALWARE_ANALYSIS.md](MALWARE_ANALYSIS.md) | Full forensic analysis of the XMRig miner infection |
| [FORENSICS.md](FORENSICS.md) | Step-by-step methodology walkthrough |
| [IOCs.md](IOCs.md) | Indicators of Compromise (network, files, credentials) |
| [REVERSE_ENGINEERING.md](REVERSE_ENGINEERING.md) | Binary reverse engineering — ipc_server, onvif, watchdog |

## Artifacts

| Directory | Contents |
|-----------|----------|
| `backup_configs/` | Camera configuration files (shadow, passwd, config_*.ini) |
| `dumps/` | Full flash dumps (uboot, kernel, JFFS2 rootfs) + system info |
| `dumps/jffs2_extracted/` | 369 files extracted from JFFS2 root filesystem |
| `dumps/extracted/` | Rootfs tar extracted (binaries, libs, configs) |
| `forensics/` | Reconstructed malware binary, hex dump, analysis scripts |

## Key Findings

- **Hardware:** Goke GK7102 (ARM1176JZF-S, ARMv6) — NOT HiSilicon!
- **Malware:** XMRig Monero cryptominer, active Aug 2023 - Jun 2026
- **C2 Server:** 86.38.203.214 (Latvia/Ukraine, AS48031)
- **Attacker email:** hwansna@gmail.com
- **Infection vector:** World-writable /etc/init.d/ init script, likely exploited via known CGI vulnerabilities
- **Status:** CLEANED — malware removed, root password changed, telnet secured

## Timeline

```
Aug 22 2023    Malware installed (S98test mtime)
2023-2026      Camera silently mining Monero for ~34 months
Jun 2026       Investigation begins
Jun 2026       Malware discovered and cleaned
Jun 2026       Telnet persistence established, documentation complete
```
