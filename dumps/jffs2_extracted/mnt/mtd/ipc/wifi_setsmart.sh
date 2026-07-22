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

findap()
{
TMP=/mnt/mtd/ipc/tmpfs/wf129  
TMP1=/mnt/mtd/ipc/tmpfs/wf129t
	
	iwlist ra0 scanning > /dev/null
	iwpriv ra0 get_site_survey | sed '1d 2d $d' > $TMP	
	$TARGET/wfsort $TMP $TMP1
	mv $TMP1 $TMP
}

loadwifismart()
{
	if ! $TARGET/wifiset.sh 1
	then
		echo "Smart set wifi fails"
		WIFIRES=1
		return 1
	fi
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
    $TARGET/loadp2p.sh 2 &
}

findap
loadwifismart
if [ $WIFIRES -eq 1 ]
then
	ifconfig ra0 $DEF_IPADDR netmask 255.255.255.0
	route add default gw $DEF_GATEWAY
	echo "1" > $TMP_PATH/apstat
	exit 1
fi
loadNetwork
killall upatewifi
killall onvif
loadAround
$TARGET/updatewifi 30 &
echo "0" > $TMP_PATH/apstat
