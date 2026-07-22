# Hardware Reference - Hipcam IP Camera

## SoC
- **Chip:** Goke GK7102
- **CPU:** ARM1176JZF-S (ARMv6TEJ), ~600 MHz
- **BogoMIPS:** 597.60
- **Board:** RB_SC1045 V2.00
- **Features:** swp half fastmult vfp edsp java tls

## Memory & Storage
- **RAM:** 41 MB (mem=41M kernel param)
- **Flash:** 16 MB SPI NOR (mtd0-mtd4)
- **SD Card:** 32 GB microSD (mmcblk0)

## Flash Layout
| mtd | Size | Name | Content |
|-----|------|------|---------|
| mtd0 | 256 KB | uboot | U-Boot 2012.10 |
| mtd1 | 64 KB | ubootenv | U-Boot environment |
| mtd2 | 1728 KB | kernel | Linux 3.4.43-gk zImage |
| mtd3 | 14 MB | rootfs | JFFS2 filesystem |
| mtd4 | 16 MB | all | Full flash image |

## Crypto Engine
- Hardware AES/DES/SHA1 accelerator in silicon
- Kernel modules: hw_crypto.ko -> encipher.ko -> encript.ko
- User-space device: /dev/encript (major 244, minor 0)
- Reduces CPU load for TLS/SSL operations

## WiFi
- Chipset: MediaTek MT7601U (USB)
- Modes: AP (mt7601Uap.ko) + STA (mt7601Usta.ko)
- Antenna: External, IPEX connector

## Peripherals
- PTZ motors (RS-485, Pelco-D protocol)
- IR cut filter (auto)
- IR LED illuminator
- Microphone + speaker (G.711)
- GPIO: gkio.ko kernel module

## Kernel Modules
| Module | Function |
|--------|----------|
| media.ko | Media processing engine |
| isp.ko | Image Signal Processor |
| vi.ko / vo.ko | Video In / Video Out |
| audio.ko | Audio codec |
| motor.ko | PTZ motor control |
| dsp.ko | Digital Signal Processor |
| hw_crypto.ko | Hardware crypto (AES/DES) |
| encipher.ko | Encryption wrapper |
| encript.ko | /dev/encript device |
| gkio.ko | Goke GPIO |
| mt7601Uap.ko | WiFi AP mode |
| mt7601Usta.ko | WiFi client mode |
| ar0130.ko | Aptina AR0130 sensor |
| sc1145.ko | Smartsens SC1145 sensor |
| gc1024.ko | GalaxyCore GC1024 sensor |

## U-Boot Environment
```
bootcmd=run sfboot
baudrate=115200
consoledev=ttySGK0
ethaddr=3C:97:0E:22:E1:14 (factory MAC)
ipaddr=192.168.1.9 (factory IP)
sfkernel=0x50000
mem=41M
rootfstype=jffs2 root=/dev/mtdblock3
```
