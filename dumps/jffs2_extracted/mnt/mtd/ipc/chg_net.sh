#! /bin/sh

TARGET="/mnt/mtd/ipc"
DRV_PATH="$TARGET/modules"
CONF="$TARGET/conf"
NETDEV=eth0
WIFIPATH="$CONF/wifi.conf"
. $WIFIPATH
NETINFO=$CONF/config_net.ini
NETPRIV=$CONF/config_priv.ini
PLATFORM=$CONF/config_platform.ini

DEF_IPADDR="192.168.1.88"
DEF_GATEWAY="192.168.1.1"

clearRoute()
{
	route del -net 239.0.0.0 netmask 255.0.0.0 eth0
	route del -net 239.0.0.0 netmask 255.0.0.0 ra0
	GATEWAY=`route -n | grep UG | awk -F " " '{printf $2}'`
	route del default gw $GATEWAY
	GIP=`route -n | grep eth0 | awk -F " " '{printf $1}'`
	GNM=`route -n | grep eth0 | awk -F " " '{printf $3}'`
	route del -net $GIP netmask $GNM
	GIP=`route -n | grep ra0 | awk -F " " '{printf $1}'`
	GNM=`route -n | grep ra0 | awk -F " " '{printf $3}'`
	route del -net $GIP netmask $GNM
}

setRoute()
{
	ipaddr1=`ifconfig $NETDEV | grep "inet addr:" | awk '{printf $2}' | awk -F ":" '{printf $2}'`
    gat1=`echo $ipaddr1 | awk -F "." '{print $1}'`
    gat2=`echo $ipaddr1 | awk -F "." '{print $2}'`
    gat3=`echo $ipaddr1 | awk -F "." '{print $3}'`
    routeway1="$gat1.$gat2.$gat3.0" 
    route add -net $routeway1 netmask 255.255.255.0 $NETDEV
}

loadwifista()
{
	iwpriv $NETDEV set AuthMode=$WifiMode
	iwpriv $NETDEV set NetworkType=Infra
	iwpriv $NETDEV set EncrypType=$WifiEnc
	if [ $WifiEnc != "NONE" ]
	then	
		if [ $WifiEnc == "WEP" ]
		then
			iwpriv $NETDEV set DefaultKeyID=1
			iwpriv $NETDEV set Key1="$WifiKey"
		else
			iwpriv $NETDEV set WPAPSK="$WifiKey"
		fi
	fi
	iwpriv $NETDEV set SSID="$WifiSsid"
    $TARGET/updatewifi 10 &
}

loadwifiap()
{
	TMP=/mnt/mtd/ipc/tmpfs/wf129
	TMP1=/mnt/mtd/ipc/tmpfs/wf129t
	iwlist ra0 scanning > /dev/null
	iwpriv ra0 get_site_survey | sed '1d 2d $d' > $TMP	
	ifconfig ra0 down
	$TARGET/wfsort $TMP $TMP1
	mv $TMP1 $TMP
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

	killall runarp
	$TARGET/runarp $NETDEV & > /dev/null	
		
	return 0      
}

loadwifi()
{
	if [ $WifiType = "Infra" ]	
	then
		loadwifista
		loadNetwork
	elif [ $WifiType = "Adhoc" ]
	then
		loadwifiap
	else
		ifconfig ra0 $DEF_IPADDR netmask 255.255.255.0
		route add default gw $DEF_GATEWAY
	fi
}

loadAround()
{
    $TARGET/facddns.sh
    $TARGET/upnpmap.sh
    $TARGET/th3ddns.sh
    $TARGET/loadp2p.sh 1 &
}

NETFL=`cat /mnt/mtd/ipc/tmpfs/netchg`
killall udhcpc
killall udhcpd
killall upnp_map
killall updatewifi
killall onvif
rm /mnt/mtd/ipc/tmpfs/wifi.ok 2> /dev/null

if [ $NETFL -eq 0 ]
then
	NETDEV="eth0"
	if lsmod | grep mt7601Uap
	then
		ifconfig ra0 down
		rmmod mt7601Uap
		insmod $DRV_PATH/mtutil7601Usta.ko
		insmod $DRV_PATH/mt7601Usta.ko
		insmod $DRV_PATH/mtnet7601Usta.ko
		ifconfig ra0 up
	fi	
	iwpriv ra0 set SSID=""
	clearRoute
	setRoute
	loadNetwork
    NETFLAG="0"
else
	NETDEV="ra0"
	clearRoute
	setRoute
	loadwifi
	NETFLAG="1"
fi

echo $NETFLAG > $TARGET/tmpfs/netflag.dat
loadAround
rm -f /mnt/mtd/ipc/tmpfs/netchg
