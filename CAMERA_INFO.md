# Câmera IP - Informações

## Rede
- **IP:** 192.168.1.10 (fixo)
- **Máscara:** 255.255.255.0
- **Gateway:** 192.168.1.1
- **DNS:** 192.168.1.1
- **MAC Ethernet:** 00:E0:F8:54:79:17
- **MAC WiFi:** 10:A4:BE:81:D8:FC

## WiFi
- **SSID:** `<SSID>`
- **Segurança:** WPA2-PSK / AES
- **Senha:** `<PASSWORD>`
- **Auth (CGI):** `wf_auth=3` (WPA2-PSK)
- **Enc (CGI):** `wf_enc=1` (AES)
- **Status:** ✅ Funcionando
- **Obs:** WiFi tem MAC próprio, diferente do Ethernet

## Identificação
- **Fabricante:** IPCAM (Hipcam)
- **Modelo:** C9F0SeZ0N0P4L0
- **Hardware:** V1.0.0.1
- **Firmware reportado:** V9.1.6.1.24-20170925 (reporta "HiSilicon Hi3510")
- **Web:** V1.0.1
- **ONVIF:** Versão 2.4 (porta 8080)
- **Serial (ONVIF):** 10A4BE81D8FC
- **Possui PTZ:** Sim (Pan/Tilt/Zoom) - CGI e ONVIF
- **Resolução máxima:** 720P
- **SD Card:** 32GB (~28.4GB livre)

## Hardware Real (confirmado via /proc/cpuinfo e U-Boot)
- **SoC:** Goke GK7102 (ARM1176JZF-S, ARMv6, ~600MHz)
- **CPU:** ARMv6-compatible processor rev 7 (v6l)
- **Features:** swp half fastmult vfp edsp java tls
- **Board:** Goke GK7102 RB_SC1045 board V2.00
- **NOTA:** O SDK reporta "HiSilicon Hi3510" mas o hardware real é Goke. A Goke Microelectronics produz SoCs pin-compatible com HiSilicon para câmeras IP. O sufixo "gk" no kernel (3.4.43-gk) confirma.
- **WiFi:** MediaTek MT7601U (módulos mt7601Uap.ko / mt7601Usta.ko)
- **Crypto engine:** Hardware acceleration (hw_crypto.ko, encipher.ko, encript.ko)
- **Flash layout:** SPI NOR 16MB (mtd0-mtd4)

## Bootloader (U-Boot)
- **Versão:** U-Boot 2012.10 (Apr 17 2017)
- **Build target:** GK7102 rb sc1045 v2.00 (GOKE)
- **Console:** ttySGK0, 115200 baud
- **Bootcmd:** `run sfboot` (boot direto da SPI flash)
- **Kernel offset:** 0x50000 (mtd2)
- **MAC padrão U-Boot:** 3C:97:0E:22:E1:14 (diferente do MAC efuse)

## Fabricante (OEM)
- **SDK:** Hichip (http://www.hichip.net)
- **Modelo SDK:** HXC54G
- **Kernel:** Linux 3.4.43-gk armv6l PREEMPT #16 (2017-04-17)
- **Toolchain:** gcc 4.6.1 (crosstool-NG 1.18.0)
- **BusyBox:** v1.18.5 (2016-01-06)
- **Libc:** uClibc 0.9.33.2
- **Init:** BusyBox init
- **Shell:** ash (busybox)
- **RootFS:** JFFS2 em mtdblock3 (14MB, ~3.3MB livre)
- **RAM:** 41MB (mem=41M)
- **Servidor HTTP:** Hipcam (ipc_server é um ZIP auto-extraível de ~1MB)
- **Servidor RTSP:** Hipcam RealServer/V1.0

## Portas
| Porta | Servi\u00e7o       |
|-------|----------------|
| 80    | HTTP (admin)   |
| 554   | RTSP           |
| 8080  | ONVIF/gSOAP    |
| 1935  | RTMP           |

## Credenciais
- **Usu\u00e1rio:** admin
- **Senha:** admin
- **RTSP auth:** desabilitado (rtsp_aenable=0)
- **Usu\u00e1rios:** admin (authLevel=15), user (authLevel=3), guest (authLevel=1), +7 slots vazios

## Acesso
- **Web:** http://192.168.1.10/
- **RTSP principal:** `rtsp://192.168.1.10:554/11` (1280x720, H.264, Main Profile)
- **RTSP secund\u00e1ria:** `rtsp://192.168.1.10:554/12` (640x352, H.264)
- **RTSP sem auth:** sim (pode acessar sem credenciais)
- **ONVIF:** http://192.168.1.10:8080/onvif/device_service
- **Config backup:** http://192.168.1.10/cgi-bin/hi3510/backup.cgi (tar.gz do /mnt/mtd/ipc/conf/)
- **Config restore:** http://192.168.1.10/cgi-bin/hi3510/restore.cgi (upload tar.gz)
- **Firmware upgrade:** http://192.168.1.10/cgi-bin/hi3510/upgrade.cgi?filename=
- **Admin panel:** http://192.168.1.10/web/config.html (frameset: menu.html + p\u00e1ginas de config)

## Vídeo
| Stream | Canal | Resolução | Bitrate | FPS | GOP | Profile |
|--------|-------|-----------|---------|-----|-----|---------|
| Principal | enc_chn.11 | 1280x720 | 1536 Kbps | 25 | 50 | Main (4D001F) |
| Secundária | enc_chn.12 | 640x352 | 448 Kbps | 25 | 50 | Main (4D001E) |
| Mobile | enc_chn.13 | ? | 256 Kbps | 25 | 50 | (configurado) |

## Imagem
| Parâmetro | Valor |
|-----------|-------|
| Brilho | 64 |
| Saturação | 0 |
| Nitidez | 32 |
| Contraste | 32 |
| Matiz (Hue) | 50 |
| WDR | off |
| Modo noturno | on (auto) |
| Shutter | 65535 |
| Flip | off |
| Mirror | off |
| Gamma | 1 |
| Redução de ruído | on |
| Exposição | auto (ae=2) |
| IR cut | auto (ADC: 500/300) |
| LED iluminador | on |

## Funcionalidades
- Detecção de movimento programável com ação em preset PTZ
- Anti-sabotagem (TamperDetector)
- PTZ controlável via CGI/ONVIF (128 presets via ONVIF, 16 via config)
- Áudio bidirecional (G711)
- Streaming RTMP (porta 1935)
- SD Card 32GB para gravação local
- UPnP ativado
- FTP para upload de snapshots/gravação
- DDNS (DynDNS e 3o DDNS compatíveis)
- Relé (saída de alarme)
- Snapshot em alarme (1-3 fotos)
- IR cut automático (visão noturna)
- LED de iluminação integrado
- Agendamento de gravação/snapshot
- NTP (time.nist.gov)
- DHCP server interno (udhcpd, interface ra0, range 192.168.1.100-200)
- Push notifications (64 slots configuráveis, vazios)
- Cloud storage (appkey+appsecret configurados)
- 3G/4G modem backup (APN configurável)
- Debug server (envio de logs para 192.168.1.88:12990)
- Telnet embutido (desabilitado: tenable=0)
- RS-485 (9600 baud, Pelco-D compatível)
- Privacy mask (4 áreas configuráveis, desabilitadas)
- 3 streams de vídeo independentes

## PTZ
### CGI
- **Movimento:** `ptzctrl.cgi?-step=0&-act=up|down|left|right|home|stop`
- **Varredura:** `ptzctrl.cgi?-step=0&-act=hscan|vscan`
- **Presets:**
  - Salvar: `preset.cgi?-act=set&-status=1&-number=N` (N=1-128)
  - Ir: `preset.cgi?-act=goto&-number=N`

### ONVIF (SOAP)
- **Token:** ptzNodeToken
- **Absolute** pan/tilt/zoom (-1 a 1)
- **Relative** movement
- **Continuous** velocity control
- **Home:** suportado
- **Presets:** até 128

## Áudio
- **Codec:** G711
- **Volume in:** 14 (0-)
- **Volume out:** 9
- **AEC:** desligado
- **Denoise:** ligado

## CGI - Comandos via POST
Parâmetros usam prefixo `-` (ex: `-wf_ssid`, `-wf_auth`).  
Endpoint: `http://192.168.1.10/cgi-bin/hi3510/param.cgi`

### Set (escrita)
| Comando | Descrição |
|---------|-----------|
| `cmd=setwirelessattr` | Configurar WiFi |
| `cmd=setnetattr` | Configurar rede |
| `cmd=setuserattr` | Alterar senhas |
| `cmd=setmdalarm` | Detecção de movimento |
| `cmd=setmotorattr` | PTZ / presets |
| `cmd=setlightattr` | Iluminador LED |
| `cmd=setvencattr` | Qualidade de vídeo |
| `cmd=setftpattr` | Configurar FTP |
| `cmd=setalarmsnapattr` | Snapshot em alarme |
| `cmd=setrelayattr` | Relé |
| `cmd=setimageattr` | Imagem (brilho, contraste etc) |
| `cmd=setinfrared` | IR |
| `cmd=setircutattr` | IR cut |
| `cmd=setoverlayattr` | OSD/texto |
| `cmd=setaencattr` | Áudio encode |
| `cmd=setaudioinvolume` | Volume entrada |
| `cmd=setaudiooutvolume` | Volume saída |
| `cmd=sethttpport` | Porta HTTP |
| `cmd=setrtspport` | Porta RTSP |
| `cmd=setrtspauth` | Autenticação RTSP |
| `cmd=setrtmpattr` | Config RTMP |
| `cmd=set3thddnsattr` | DDNS terceiro |
| `cmd=setourddnsattr` | DDNS próprio |
| `cmd=setupnpattr` | UPnP |
| `cmd=setonvifattr` | ONVIF |
| `cmd=setmdattr` | Detecção de movimento |
| `cmd=setschedule` | Agenda |
| `cmd=setsmtpattr` | Email |
| `cmd=sysreboot` | Reiniciar |
| `cmd=sysreset` | Reset de fábrica |
| `cmd=setcapability` | Capabilities (CVBS) |

### Get (leitura via GET ou script include)
| Comando | Descrição |
|---------|-----------|
| `cmd=getserverinfo` | Info servidor (modelo, versões, SD card) |
| `cmd=getdevtype` | Tipo do dispositivo |
| `cmd=getstreamnum` | Número de streams |
| `cmd=getimageattr` | Configurações de imagem |
| `cmd=getimagemaxsize` | Resolução máxima (720P) |
| `cmd=getinfrared` | Status IR |
| `cmd=getircutattr` | Threshold IR cut |
| `cmd=getlightattr` | Status iluminador |
| `cmd=getmotorattr` | Config PTZ |
| `cmd=getmdattr` | Config detecção movimento |
| `cmd=getmdalarm` | Status alarme movimento |
| `cmd=getoverlayattr` | OSD |
| `cmd=getvencattr` | Encode vídeo |
| `cmd=getvideoattr` | Atributos vídeo |
| `cmd=getaencattr` | Encode áudio |
| `cmd=getaudioinvolume` | Volume entrada |
| `cmd=getaudiooutvolume` | Volume saída |
| `cmd=getaudioflag` | Flag áudio |
| `cmd=getnetattr` | Configuração de rede |
| `cmd=getwirelessattr` | Config WiFi |
| `cmd=gethttpport` | Porta HTTP |
| `cmd=getrtspport` | Porta RTSP |
| `cmd=getrtspauth` | Auth RTSP |
| `cmd=getrtmpattr` | Config RTMP |
| `cmd=getupnpattr` | Status UPnP |
| `cmd=get3thddnsattr` | Config DDNS |
| `cmd=getourddnsattr` | Config DDNS próprio |
| `cmd=getonvifattr` | Config ONVIF |
| `cmd=getftpattr` | Config FTP |
| `cmd=getsmtpattr` | Config email |
| `cmd=getrelayattr` | Config relé |
| `cmd=getalarmsnapattr` | Config snapshot alarme |
| `cmd=getplanrecattr` | Config gravação |
| `cmd=getschedule` | Agenda alarme |
| `cmd=getscheduleex` | Agenda extendida |
| `cmd=getuserattr` | Config usuários |
| `cmd=getsetupflag` | Flag setup (admin) |
| `cmd=getlanguage` | Idioma |
| `cmd=getcapability` | Capabilities |

---

# EXPLORACAO AVANCADA - DIRETORIOS EXPOSTOS

## /log/ e /tmpfs/ (mesmo diretorio)
O servidor web Hipcam expoe listagem de diretorios. `/log/` e `/tmpfs/` sao o mesmo tmpfs mount.

### Binarios extraidos
| Arquivo | Tamanho | Tipo |
|---------|---------|------|
| `ipc_server` | 1.0 MB | ELF 32-bit ARM (stripped) - binario PRINCIPAL da camera |
| `libNetLib.so` | 217 KB | ELF 32-bit ARM shared object - biblioteca de rede |
| `libXqAPILib.so` | 14 KB | ELF 32-bit ARM shared object - API XQ |
| `libxqun.so` | 257 KB | ELF 32-bit ARM shared object |

### Arquivos de configuracao/info
| Arquivo | Conteudo |
|---------|----------|
| `proc.tmp` | Lista de processos (ipc_server + 30 workers) |
| `ifconfig.tmp` | ifconfig output (eth0, lo, ra0) |
| `efuse.tmp` | Kernel cmdline: `console=ttySGK0,115200 mem=41M root=/dev/mtdblock3 rootfstype=jffs2` |
| `syslog.txt` | System log com logins e eventos |
| `sensor.conf` | Sensor ID: `15` |
| `config_backup.bin` | Cópia do backup de config |

### P2P (Cloud)
| Config | Valor |
|--------|-------|
| P2P enable | 0 (desabilitado) |
| Hip2P enable | 0 (desabilitado) |
| XQP2P enable | **1 (ATIVO!)** |
| XQP2P UID | `IIII-142493-FBBBC` |
| XQP2P push addr | `47.91.149.233` |
| Hip2P push addr | `49.213.12.136` |
| Cloud storage | type=0 (Dropbox), creds vazias |

### SmartEye (dados de fabrica)
- **MAC:** 10:A4:BE:81:D8:FC
- **MID:** HX (Hichip)
- **PID:** C9F0SeZ0N0P4L0
- **SN:** IPCAM
- **Default IP:** 192.168.1.88
- **DDNS server:** hipcam.org:80
- **Pan range:** 520, **Tilt range:** 160
- **Pan home:** 296, **Tilt home:** 26

---

# GRAVACOES SD CARD

O SD card estava acessivel via `/log/sd/` com diretorios por data:
- `20170829/` a `20260722/` (meses de gravacoes!)
- Cada dia tem `record000/` com arquivos `.264` (H.264 raw) + `recdata.db`
- Arquivos nomeados: `P{YYMMDD}_{HHMMSS}_{HHMMSS}.264`
- **ATENCAO:** `sdfrmt.cgi` formata o SD card SEM confirmacao!

Exemplo de gravacao baixada:
```
P260722_063110_063155.264 - 893 KB - 45 segundos de video
```

---

# BINARIO - ANALISE DE STRINGS

## CGI endpoints descobertos (214 referencias encontradas)

### Snapshot/Video
| CGI | Descricao |
|-----|-----------|
| `snap.cgi?-chn=11` | JPEG snapshot 1280x720 |
| `snap.cgi?-chn=12` | JPEG snapshot 640x352 |
| `snapimage.cgi` | Snapshot alternativo |
| `printscreenrequest.cgi` | Printscreen (forca geracao de snap) |
| `mjpegstream.cgi` | MJPEG stream (crasha o servidor) |
| `requestifrm.cgi` | Forca I-frame |
| `manualsnap.cgi` | Snapshot manual |
| `manualrec.cgi` | Gravacao manual |

### P2P/Cloud
| CGI | Descricao |
|-----|-----------|
| `gethip2ppriv.cgi` | Chave privada Hip2P |
| `syncnewp2pprivattr.cgi` | Sincronizar P2P |
| `getxqp2pattr.cgi` | Config XQ P2P |
| `getp2pattr.cgi` | Config P2P generico |
| `getcloudstorageattr.cgi` | Config cloud storage |
| `cloudupgrade` (cmd) | Cloud firmware upgrade |

### SD Card (perigosos!)
| CGI | Descricao |
|-----|-----------|
| `sdfrmt.cgi` | **FORMATA SD CARD** sem confirmacao |
| `sdstop.cgi` | Para gravacao SD |
| `logsync.cgi` | Sincroniza logs |
| `cleanlog.cgi` | Limpa logs |

### Diagnostico
| CGI | Descricao |
|-----|-----------|
| `checkiris.cgi` | Teste de iris |
| `checkpixel.cgi` | Teste de pixel |
| `getmotorrange.cgi` | Range PTZ (pan=520, tilt=160) |
| `getbcastaging.cgi` | Burn-in aging test |
| `getldcattr.cgi` | Lens distortion correction |
| `get_smarteye.cgi` | SmartEye factory params |

### Sistema
| CGI | Descricao |
|-----|-----------|
| `softreboot.cgi` | Reboot suave (POST) |
| `sysupdate.cgi` | System update |
| `devsearch.cgi` | Device search |
| `getdevices.cgi` | Lista devices linkados |
| `getvendorinfo.cgi` | Vendor info (HX / C9F0SeZ0N0P4L0) |
| `getdevlist.cgi` | Lista de devices |
| `getvendortag.cgi` | Vendor tag |
| `getcover.cgi` | Privacy mask (4 regioes 160x160) |
| `getrecstatus.cgi` | Status gravacao |
| `getaestate.cgi` | Audio encode state |
| `getchkwireless.cgi` | Check wireless status |
| `get3gattr.cgi` + start/stop | Controle 3G/4G |

## Kernel cmdline (de efuse.tmp)
```
console=ttySGK0,115200 noinitrd mem=41M rw rootfstype=jffs2 root=/dev/mtdblock3 init=linuxrc
```

## EXPLORACAO AVANCADA - RESULTADOS

### HDS/1.0 Protocol (UDP 12222)
- **SEARCH * HDS/1.0** via UDP broadcast/unicast na porta 12222
- Camera responde com Device-ID, IP, MAC, firmware version, etc
- Device-ID: `ABBD000000e0f8547917BVFCDETYUISX`
- Formato: CRLF (`\r\n`), nao null bytes
- Protocolo de autenticacao: **dupla autenticacao**
  - `Authorization:Basic admin:admin` (plain text, nao base64!)
  - `Authentication: ZTEALE234=2opWae`
- Comandos autenticados que funcionam:
  - `printscreen set -telnet 1`  -> `[Success]set printscreen!` (habilita telnet)
  - `netconf set -dhcp 0`        -> `[Success]set net information OK!`
  - `httpport set -httpport 80`  -> `[Success]set httpport!`
  - `devidset set -devid test`   -> `[Success]set devid!`
  - `sysreboot`                  -> `[Success]system reboot!`
  - `sysreset`                   -> `[Success]system reset!`
- Comando NAO autenticado (CVE-2020-9529):
  - `usrpwd set -resetpwd on`    -> `[Success]usrpwd reset!` (reseta senha admin web)
  - NAO requer nenhum header de auth!

### CVE-2020-9529 - Admin Password Reset
- **Severity:** 9.8 Critical
- **Metodo:** `CMD * HDS/1.0` via UDP 12222 com `usrpwd set -resetpwd on`
- **Efeito:** Reseta senha admin web para `admin`
- **Persistencia:** Sobrevive a reboots (escreve em config_user.ini)
- **PoC:** pmarrapese/iot/exploits/cve-2020-9529/reset.sh
- **Side effect:** Camera reboots apos o comando

### Gestao de Usuarios Web (setuserattr)
- Formato correto dos parametros:
  ```
  cmd=setuserattr&-at_username=<old>&-at_newname=<new>&-at_password=<newpass>
  ```
- Senha admin pode ser alterada via param.cgi com auth HTTP Basic
- NAO afeta a senha root do sistema (telnet)

### Telnet (Acesso Root Obtido!)
- **Habilitacao:** `printscreen set -telnet 1` via HDS/1.0 autenticado
  OU `telnetd -l /bin/sh &` no shell (persistente no `/mnt/mtd/ipc/run`)
- **Porta 23:** Aberta permanentemente (telnetd adicionado ao script de boot)
- **Prompt:** "IPCamera login:"
- **Usuario root:** login com `root` / `admin`
- **Usuario default:** login com username vazio / `default` (UID 1000, sem hash em /etc/shadow)
- **Senha root ORIGINAL:** `F0pCSaZ.P1Rrc` (DES crypt, 13 chars - nao quebrada, substituida)
- **Senha root ATUAL:** `admin` (mesma senha admin web; modificada via /etc/shadow)
- **Privilege escalation:** /etc/shadow e world-writable -> `crypt.crypt('hi', salt)` -> `sed -i 's|root:[^:]*|root:HASH|' /etc/shadow` -> `su -` com nova senha
- **Telnet permanente:** `telnetd -l /bin/sh &` adicionado ao `/mnt/mtd/ipc/run` na linha apos `start.g711`
- **Config debug:** `tenable=1` em `/mnt/mtd/ipc/conf/config_debug.ini`
- **Arquivos world-writable:** `/etc/passwd`, `/etc/shadow`, `/mnt/mtd/ipc/conf/*`, `/etc/init.d/*`, `/mnt/mtd/ipc/run` (todos 666 ou 777)
- **Protecao minima:** Camera nao tem autenticacao pra escrita nos arquivos de sistema
- **Persistencia apos reboot:** SIM (run script executa telnetd na inicializacao)
- **Kernel:** Linux 3.4.43-gk armv6l
- **BusyBox:** v1.18.5
- **Shell:** ash (busybox)
- UART console via `/dev/ttySGK0` a 115200 baud (acesso fisico)

### CGIs com Autenticacao Admin
- `setuserattr` funciona com: `-at_username`, `-at_newname`, `-at_password`
- `setnetattr`, `setonvifattr`, `setmotorattr`, `setlightattr`, `setcapability`, `setlanguage`, `cleanlog` todos funcionam
- `setftpattr`, `setsmtpattr` funcionam
- `sysreboot` e `sysreset` funcionam via param.cgi
- `restore.cgi` SEMPRE retorna 400 (bloqueado)
- `upgrade.cgi` retorna 400 (requer digest verification)
- `backup.cgi` funciona - baixa tar.gz de `/mnt/mtd/ipc/conf/`

### Backdoor / Hardcoded
- `Authentication: ZTEALE234=2opWae` - segundo fator auth HDS/1.0
- `Authorization:Basic %s:%s` no SearchLib.dll - formato plain text
- `/dev/encript` - dispositivo de criptografia no SoC
- P2P push servers: `47.91.149.233`, `49.213.12.136`
- DDNS factory server: `hipcam.org`
- Possiveis senhas no binario: `w54723`, `00250900000B`

## MALWARE (Cleaned)

The camera was infected with persistent malware since August 22, 2023.
See [MALWARE_ANALYSIS.md](MALWARE_ANALYSIS.md) for the full forensic report.

### Quick Summary
- **Malware family:** XMRig Monero cryptominer
- **Infection date:** August 22, 2023 (S98test mtime)
- **Duration:** ~34 months of active mining
- **C2 IP:** 86.38.203.214 (AS48031, Latvia/Ukraine)
- **Dropper:** Hex-embedded ARM ELF binary in `/etc/init.d/S98test`
- **Payload:** `/bin/omm` (~2.1MB XMRig static ARM build)
- **Attacker email:** hwansna@gmail.com
- **Persistence:** World-writable init script + infinite monitoring loop
- **Status:** CLEANED - malware removed, system secured

### Files Involved
| File | Purpose | Status |
|------|---------|--------|
| `/etc/init.d/S98test` | Boot persistence | Replaced with clean `exit 0` |
| `/tmp/dl` | ARM ELF HTTP downloader (1924 bytes) | Removed |
| `/tmp/r` | Runner shell script (loop every 4s) | Removed |
| `/bin/omm` | XMRig miner (~2.1MB) | Never downloaded (downloads failing) |

### Related Documents
- [MALWARE_ANALYSIS.md](MALWARE_ANALYSIS.md) - Full forensic breakdown
- [FORENSICS.md](FORENSICS.md) - Step-by-step methodology
- [IOCs.md](IOCs.md) - Indicators of compromise

## Processos (ps via telnet)
```
init
├── getty (ttySGK0, serial console)
├── ipc_server (HTTP, RTSP, CGI, PTZ, audio, recording)
├── onvif (SOAP server on port 8080)
├── telnetd (port 23, /bin/sh)
├── watchdog
├── updater (wifi, net_detect, chksock, upnp_map)
├── sd.sh / sd_detect (SD card)
├── /tmp/r (infectado, limpo)
└── ftpget (infectado, limpo)
```

## Snapshot URLs
| URL | Resolucao |
|-----|-----------|
| `http://192.168.1.10/tmpfs/auto.jpg` | 1280x720 (live snapshot) |
| `http://192.168.1.10/tmpfs/snap.jpg` | 1280x720 (snapshot printscreen) |
| `http://192.168.1.10/cgi-bin/hi3510/snap.cgi?-chn=11` | 1280x720 (snapshot CGI) |
| `http://192.168.1.10/cgi-bin/hi3510/snap.cgi?-chn=12` | 640x352 (sub stream) |

---

# DUMPS E ARTEFATOS

## Flash Dumps (dumps/)
Arquivos extraídos da camera e baixados via HTTP:

| Arquivo | Tamanho | Descrição | SHA256 |
|---------|---------|-----------|--------|
| `mtd0_uboot.bin` | 256 KB | U-Boot 2012.10 bootloader | `ec0cf7bd...` |
| `mtd1_ubootenv.bin` | 64 KB | U-Boot environment variables | `ece8438b...` |
| `mtd2_kernel.bin` | 1.7 MB | Linux kernel 3.4.43-gk zImage | `7b940693...` |
| `mtd3_rootfs.bin` | 14 MB | JFFS2 root filesystem | `10f3a6d6...` |
| `rootfs.tar` | 6.5 MB | Tar do rootfs (/bin, /etc, /lib, /sbin, /usr, /var) | `1a89bac1...` |
| `sysinfo.txt` | 69 KB | System info completo (cpu, mtd, mounts, ps, ifconfig, configs) | `7f634744...` |

## JFFS2 Extraído (dumps/jffs2_extracted/)
369 arquivos extraídos do JFFS2 com `jefferson`. Destaques:

### Binários principais (/mnt/mtd/ipc/)
| Arquivo | Tipo | Descrição |
|---------|------|-----------|
| `ipc_server` | **ZIP** (não ELF!) | Servidor principal (HTTP, RTSP, CGI) - 1MB comprimido |
| `ipc_server.bak` | ZIP | Backup do ipc_server |
| `onvif` | ELF 32-bit ARM | Servidor ONVIF/gSOAP |
| `watchdog` | ELF 32-bit ARM | Watchdog daemon (não stripped) |
| `chksock` | ELF 32-bit ARM | Verificador de socket |
| `chknet` | shell script | Verificador de rede |

### Módulos do kernel (/mnt/mtd/ipc/modules/)
| Módulo | Descrição |
|--------|-----------|
| `mt7601Uap.ko` | WiFi AP mode (MediaTek MT7601U) |
| `mt7601Usta.ko` | WiFi STA mode (MediaTek MT7601U) |
| `media.ko` | Media processing engine |
| `isp.ko` | Image Signal Processor |
| `vi.ko` / `vo.ko` | Video Input / Video Output |
| `audio.ko` | Audio codec |
| `motor.ko` | PTZ motor control |
| `gkio.ko` | Goke GPIO/I/O |
| `hw_crypto.ko` | Hardware crypto accelerator |
| `encipher.ko` | Encryption engine |
| `encript.ko` | Encryption device (/dev/encript) |
| `dsp.ko` | Digital Signal Processor |
| `ar0130.ko` / `gc1024.ko` / `sc1145.ko` | Sensor drivers (Aptina, GalaxyCore, Smartsens) |

### Bibliotecas
| Biblioteca | Propósito |
|-----------|-----------|
| `libcrypto.so.1.0.0` | OpenSSL crypto (usada pelo XMRig miner!) |
| `libssl.so.1.0.0` | OpenSSL SSL/TLS |
| `libstdc++.so.6.0.16` | C++ standard library |
| `libiconv.so.2.5.1` | Character encoding |
| `libiniparser.so` | INI config parser (com debug info!) |
| `libAPILib.so` | API library do fabricante |
| `libNetLib.so` | Network library |
| `libXqAPILib.so` | XQ P2P cloud library |
| `libxqun.so` | XQ P2P client library |

### Web Interface (/mnt/mtd/ipc/web/)
Interface web completa com HTML, JS, CSS:
- `config.html`, `network.html`, `wifi.html`, `video.html`, `audio.html`, `ptz.html`
- `user.html` (gestão de usuários), `alarm.html`, `ftp.html`, `email.html`, `ddns.html`
- JavaScript: `js/jquery.js`, `js/common.js`, `js/video.js`, `js/wifi.js`
- Bibliotecas: `lib/prototype.js`, `lib/scriptaculous.js`, `lib/effects.js`
- Múltiplas interfaces: 4-canais (`mainpage4.html`, `view4.html`), 9-canais (`mainpage9.html`)

### /root/.ash_history
Histórico completo da sessão de investigação - registra todos os comandos executados durante a descoberta e limpeza do malware.

### Config files não documentados
| Arquivo | Conteúdo |
|---------|----------|
| `config_devices.ini` | Dispositivos linkados/P2P |
| `config_priv.ini` | Configurações privadas (appkey, appsecret, cloud) |
| `config_action.ini` | Ações programadas |
| `config_alarm_token.ini` | Tokens de push notification |
| `config_encode.ini` | Configurações de encode |
| `config_md.ini` | Motion detection |
| `config_osd.ini` | On-screen display |
| `config_ptz.ini` | PTZ presets e configurações |
| `config_run3g.ini` | Configuração 3G/4G |
| `config_videoex.ini` | Configurações extras de vídeo |
| `config_cover.ini` | Privacy mask |
| `config_custom.ini` | Customizações |
| `config_defaultimage.ini` | Imagem padrão |
| `config_facddns.ini` | Factory DDNS |
| `config_iris.dat` | Calibração de íris |
| `config_pixel.dat` | Calibração de pixel |
| `config_timer.ini` | Timers/agendamento |
| `config_com485.ini` | RS-485 (Pelco-D)
