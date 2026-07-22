# Camera Security Investigation Dossier

Hipcam PTZ IP Camera (Goke GK7102 SoC, ARM1176JZF-S ARMv6, 600MHz)

> **Blog post:** [Dissecting a 3 Year IoT Malware Infection](https://www.hiago.sh/?post=iot-malware-autopsy) — full narrative write-up.

## Documents

| Document | Description |
|----------|-------------|
| [CAMERA_INFO.md](CAMERA_INFO.md) | Hardware, firmware, network, CGI API, exploits |
| [MALWARE_ANALYSIS.md](MALWARE_ANALYSIS.md) | Full forensic analysis of the XMRig miner dropper |
| [FORENSICS.md](FORENSICS.md) | Step-by-step methodology walkthrough |
| [REVERSE_ENGINEERING.md](REVERSE_ENGINEERING.md) | Binary reverse engineering — ipc_server, onvif, watchdog |
| [IOCs.md](IOCs.md) | Indicators of Compromise (network, files, credentials) |
| [HARDWARE.md](HARDWARE.md) | SoC, flash layout, crypto engine, kernel modules, U-Boot |

## Artifacts

| Directory | Contents |
|-----------|----------|
| `backup_configs/` | Camera configuration files (shadow, passwd, config_*.ini) |
| `dumps/` | Full flash dumps (uboot, kernel, JFFS2 rootfs) + system info |
| `dumps/jffs2_extracted/` | 369 files extracted from JFFS2 root filesystem |
| `dumps/extracted/` | Rootfs tar extracted (binaries, libs, configs) |
| `dumps/reverse/` | Extracted binaries for RE (ipc_server, onvif, watchdog) |
| `forensics/` | Reconstructed malware binary, hex dump, analysis scripts |

## Key Findings

- **Hardware:** Goke GK7102 (ARM1176JZF-S, ARMv6) — firmware reports HiSilicon, reality is Goke
- **Malware:** XMRig Monero cryptominer dropper, persisted Aug 2023 to Jul 2026
- **C2 Server:** 86.38.203.214 (Hostinger via IPXO, offline when checked)
- **Attacker email:** hwansna@gmail.com
- **Infection vector:** CVE-2020-9529 (password reset) + SSI `#exec` command injection
- **Status:** CLEANED — malware removed, root password changed, system secured

## Timeline

```
Aug 22 2023    Malware installed (S98test mtime)
2023-2026      Persistent dropper loop running unnoticed for ~35 months
Jun 2026       Investigation begins — root shell via CVE-2020-9529 + telnet
Jun 2026       Malware discovered, analyzed, and cleaned
Jul 2026       Full forensic dump, reverse engineering, documentation complete
```

## Tools Used

- **[recon-skills](https://github.com/uphiago/recon-skills)** — 169 offensive security skills for recon and pentest
- **jefferson** — JFFS2 filesystem extraction
- **pyelftools + capstone** — ARM ELF parsing and disassembly
- **Ghidra** — NSA software reverse engineering framework (for follow-up analysis)
```
