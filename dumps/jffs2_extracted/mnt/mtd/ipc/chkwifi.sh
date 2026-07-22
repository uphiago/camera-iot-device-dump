#! /bin/sh

CONF_PATH=/mnt/mtd/ipc/tmpfs
FLAG_PATH=$CONF_PATH/wifires
NETDEV=ra0
wifidev=ra0
wifi_res=1
. $CONF_PATH/wifi.conf

checkwifi()
{
	wifi_res=0
	if [[ $WifiEnc = "NONE" ]] || [[ $WifiEnc = "WEP" ]]
	then
		sleep 2
		for i in $(seq 6)
		do
			sleep 0.5
			if ! iwconfig $wifidev | grep "Access Point:"
			then
				wifi_res=1
				break			
			fi
		done		
	else
		if ! iwconfig $wifidev | grep "Security mode:"
		then
			wifi_res=1
			break			
		fi	
		if ! iwconfig $wifidev | grep "Access Point:"
		then
			wifi_res=1
			break			
		fi			
	fi
}

loadwifi()
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
}

rm $FLAG_PATH

NETFLAG=`cat /mnt/mtd/ipc/tmpfs/netflag.dat`
if [ $NETFLAG -eq 1 ]
then
	touch $FLAG_PATH
    exit $wifi_res
fi

loadwifi
sleep 4
checkwifi
if [ $wifi_res -eq 0 ]
then
	touch $FLAG_PATH
fi
iwpriv $NETDEV set SSID=""
exit $wifi_res	
