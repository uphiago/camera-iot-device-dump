#! /bin/sh

TARGET="/mnt/mtd/ipc"
DRV_PATH="$TARGET/modules"
CONF="$TARGET/conf"
TMP_PATH=/mnt/mtd/ipc/tmpfs
NETDEV=ra0
NETINFO=$CONF/config_net.ini
NETPRIV=$CONF/config_priv.ini
WIFIRES=0
DEF_IPADDR="192.168.1.88"
DEF_GATEWAY="192.168.1.1"
PLATFORM=$CONF/config_platform.ini
PARAM=0

loadwifista()
{
	ifconfig ra0 down
	rmmod mt7601Uap
	insmod $DRV_PATH/mtutil7601Usta.ko
	insmod $DRV_PATH/mt7601Usta.ko
	insmod $DRV_PATH/mtnet7601Usta.ko
	ifconfig $NETDEV up
	if ! $TARGET/wifiset.sh $PARAM
	then
		echo "AP set wifi fails"
		WIFIRES=1
		return 1
	fi
}

loadwifiap()
{
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

loadNetwork()
{	
    dhcp1=`grep dhcp $NETINFO | awk -F "\"" '{print $2}'`
    ipaddr1=`grep ipaddr $NETINFO | awk -F "\"" '{print $2}'`
    gateway1=`grep gateway $NETINFO | awk -F "\"" '{print $2}'`
    netmask1=`grep netmask $NETINFO | awk -F "\"" '{print $2}'` 

    gat1=`echo $ipaddr1 | awk -F "." '{print $1}'`
    gat2=`echo $ipaddr1 | awk -F "." '{print $2}'`
    gat3=`echo $ipaddr1 | awk -F "." '{print $3}'`
    gat4=`echo $ipaddr1 | awk -F "." '{print $4}'`
    gateway2="$gat1.$gat2.$gat3.1"     	   	
		
	if [ $dhcp1 = "y" ] 
	then
		$TARGET/dhcp.sh $NETDEV
		sleep 5
		return 0
	fi   

	if ! ifconfig $NETDEV $ipaddr1 netmask $netmask1
	then
		ifconfig $NETDEV $DEF_IPADDR netmask 255.255.255.0	
	fi
	
	if ! route add default gw $gateway1
	then
		if ! route add default gw $gateway2
		then
			route add default gw $DEF_GATEWAY
		fi
	fi
		
	return 0      
}

loadAround()
{
    $TARGET/facddns.sh
    $TARGET/upnpmap.sh
    $TARGET/th3ddns.sh
    $TARGET/loadp2p.sh 1 &
}

PARAM=$1
killall udhcpd
killall updatewifi
killall onvif
loadwifista
if [ $WIFIRES -eq 1 ]
then
	loadwifiap
	$TARGET/loadp2p.sh 1 &
	echo "1" > $CONF_PATH/apstat
	exit 0
fi
loadNetwork
loadAround
$TARGET/updatewifi 30 &
echo "0" > $TMP_PATH/apstat
