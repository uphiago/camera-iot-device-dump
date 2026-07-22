#! /bin/sh

TARGET="/mnt/mtd/ipc"
CONF="$TARGET/conf"
DRV_PATH="/mnt/mtd/ipc/modules"
MSG="/mnt/mtd/ipc/tmpfs/wps.tmp"
FLAG="/mnt/mtd/ipc/tmpfs/wps.dat"
WIFIPATH="/mnt/mtd/ipc/conf/wifi.conf"
WIFIMODE=0
NETDEV=ra0
NETINFO=$CONF/config_net.ini
NETPRIV=$CONF/config_priv.ini
PLATFORM=$CONF/config_platform.ini
DEF_IPADDR="192.168.1.88"
DEF_GATEWAY="192.168.1.1"

setwifista()
{
. $WIFIPATH
	iwpriv ra0 set AuthMode=$WifiMode
	iwpriv ra0 set NetworkType=Infra
	iwpriv ra0 set EncrypType=$WifiEnc
	if [ $WifiEnc != "NONE" ]
	then	
		if [ $WifiEnc == "WEP" ]
		then
			iwpriv ra0 set DefaultKeyID=1
			iwpriv ra0 set Key1="$WifiKey"
		else
			iwpriv ra0 set WPAPSK="$WifiKey"
		fi
	fi
	iwpriv ra0 set SSID="$WifiSsid"
	$TARGET/updatewifi 20 &
}

loadwifi()
{
. $WIFIPATH
	if [ $WifiType = "Smart" ]	
	then
		killall smartset
		killall smartset
		WIFIMODE=1		
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
    $TARGET/loadp2p.sh 1 &
}

loadwifi
sleep 1
iwpriv ra0 wsc_conf_mode 1
iwpriv ra0 wsc_mode 2
iwpriv ra0 wsc_ap_band 0
iwpriv ra0 wsc_start
sleep 15
for i in $(seq 8)
do
	sleep 6
	iwpriv ra0 stat > $MSG
	if grep successfully $MSG
	then
		break
	fi
done

iwpriv ra0 wsc_stop

if [ $i -eq 8 ]
then	
	echo "error" > $FLAG
	if [ $WIFIMODE -eq 1 ]
	then
		$TARGET/smartset.sh 3 &
	fi
	exit 1
fi

SSID=`grep SSID $MSG | awk -F "= " '{print $2}'`
AuthType=`grep AuthType $MSG | awk -F "= " '{print $2}'`
EncrypType=`grep EncrypType $MSG | awk -F "= " '{print $2}'`
Key=`grep Key $MSG | awk -F "= " '{print $2}' | sed -n 2p`

echo $SSID
echo $AuthType
echo $EncrypType
echo $Key

echo "WifiEnable=1" > $WIFIPATH
echo "WifiType=Infra" >> $WIFIPATH
echo "WifiSsid=\"$SSID\"" >> $WIFIPATH
echo "WifiMode=$AuthType" >> $WIFIPATH
echo "WifiEnc=$EncrypType" >> $WIFIPATH
echo "WifiKey=\"$Key\"" >> $WIFIPATH 
sync

echo "good" > $FLAG

NETFLAG=`cat /mnt/mtd/ipc/tmpfs/netflag.dat`
if [ $NETFLAG -eq 0 ]
then
	exit 0
fi

killall udhcpc	
killall udhcpd
killall upnp_map
killall updatewifi
#killall hidog
#killall hichip
#killall tutk
#killall p2p_obj
#killall goolink
killall onvif
touch /mnt/mtd/ipc/tmpfs/wifi.ok
setwifista
loadNetwork
loadAround

exit 0
