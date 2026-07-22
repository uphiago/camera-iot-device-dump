#! /bin/sh

TARGET="/mnt/mtd/ipc"
CONF="$TARGET/conf"
PLATFORM=$CONF/config_platform.ini
NETDEV=ra0

DEF_IPADDR="192.168.1.88"
DEF_GATEWAY="192.168.1.1"

loadwifiap()
{
	TMP=/mnt/mtd/ipc/tmpfs/wf129
	TMP1=/mnt/mtd/ipc/tmpfs/wf129t
	iwlist ra0 scanning > /dev/null
	iwpriv ra0 get_site_survey | sed '1d 2d $d' > $TMP	
	$TARGET/wfsort $TMP $TMP1
	mv $TMP1 $TMP
	ifconfig ra0 down
	rmmod mtnet7601Usta
	rmmod mt7601Usta
	rmmod mtutil7601Usta
	killall updatewifi
	rm /mnt/mtd/ipc/tmpfs/wifi.ok
	insmod /mnt/mtd/ipc/modules/mt7601Uap.ko	
	ifconfig ra0 $DEF_IPADDR netmask 255.255.255.0
	TUUID=`/mnt/mtd/ipc/readcfg $PLATFORM "xquncfg:xqunuuid"`
	TUUID=`echo $TUUID | awk -F "-" '{print $2}'`
	WifiSsid="IPCAM-$TUUID"
	iwpriv ra0 set SSID="$WifiSsid"
	iwpriv ra0 set AuthMode=WPA2PSK
	iwpriv ra0 set EncrypType=AES
	iwpriv ra0 set WPAPSK="01234567"
	iwpriv ra0 set SSID="$WifiSsid"
	udhcpd -f /mnt/mtd/ipc/conf/udhcps/udhcpd.conf &
	route add default gw $DEF_GATEWAY	
}

NETFLAG=`cat /mnt/mtd/ipc/tmpfs/netflag.dat`
if [ $NETFLAG -eq 0 ]
then
	exit 0
fi

killall udhcpc
loadwifiap
touch /mnt/mtd/ipc/tmpfs/ap

exit 0
