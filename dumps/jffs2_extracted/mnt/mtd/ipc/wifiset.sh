#! /bin/sh

WF_SSID=0
WF_KEY=0
WF_Mode=0
WF_Enc=0
WF_RES=0
PHONE=0
NETDEV=ra0
TMP_PATH="/mnt/mtd/ipc/tmpfs"
WIFIPATH="/mnt/mtd/ipc/conf/wifi.conf"
WIFITMP="/mnt/mtd/ipc/tmpfs/wifi.conf"

checkwifi()
{
	sleep 4
	WF_RES=0
	if [[ $WF_Enc = "NONE" ]] || [[ $WF_Enc = "WEP" ]]
	then
		sleep 2
		for i in $(seq 8)
		do
			sleep 0.5
			if ! iwconfig ra0| grep "Access Point:"
			then
				WF_RES=1
				break			
			fi
		done		
	else
		if ! iwconfig ra0 | grep "Security mode:"
		then
			WF_RES=1
			break			
		fi	
		if ! iwconfig ra0 | grep "Access Point:"
		then
			wifi_res=1
			break			
		fi			
	fi
}

checkwifiext()
{
. $TMP_PATH/twifi.conf

	WF_RES=0
	if [[ $WifiEnc = "NONE" ]] || [[ $WifiEnc = "WEP" ]]
	then
		sleep 2
		for i in $(seq 6)
		do
			sleep 0.5
			if ! iwconfig ra0| grep "Access Point:"
			then
				WF_RES=1
				break			
			fi
		done		
	else
		for i in $(seq 5)
		do		
			sleep 1
			if ! iwconfig ra0 | grep "Security mode:"
			then
				WF_RES=1
				continue			
			fi	
			if ! iwconfig ra0| grep "Access Point:"
			then
				WF_RES=1
				continue
			fi
			WF_RES=0
			break	
		done			
	fi
}

updatewifi()
{
	echo "WifiEnable=1" > $WIFIPATH
	echo "WifiType=Infra" >> $WIFIPATH
	echo "WifiMode=$WF_Mode" >> $WIFIPATH
	echo "WifiEnc=$WF_Enc" >> $WIFIPATH
	echo "WifiSsid=\"$WF_SSID\"" >> $WIFIPATH
	echo "WifiKey=\"$WF_KEY\"" >> $WIFIPATH
}

returnok()
{
	if [ $WF_RES -eq 0 ]
	then
		updatewifi
		exit 0
	fi
}

wifi_wpa2_tkip()
{
	WF_Mode=WPA2PSK
	WF_Enc=TKIP

	iwpriv ra0 set AuthMode=$WF_Mode
	iwpriv ra0 set NetworkType=Infra
	iwpriv ra0 set EncrypType=$WF_Enc
	iwpriv ra0 set WPAPSK="$WF_KEY"
	iwpriv ra0 set SSID="$WF_SSID"
	checkwifi
	returnok
}

wifi_wpa2_aes()
{
	WF_Mode=WPA2PSK
	WF_Enc=AES

	iwpriv ra0 set AuthMode=$WF_Mode
	iwpriv ra0 set NetworkType=Infra
	iwpriv ra0 set EncrypType=$WF_Enc
	iwpriv ra0 set WPAPSK="$WF_KEY"
	iwpriv ra0 set SSID="$WF_SSID"
	checkwifi
	returnok
}

wifi_wpa_tkip()
{
	WF_Mode=WPAPSK
	WF_Enc=TKIP

	iwpriv ra0 set AuthMode=$WF_Mode
	iwpriv ra0 set NetworkType=Infra
	iwpriv ra0 set EncrypType=$WF_Enc
	iwpriv ra0 set WPAPSK="$WF_KEY"
	iwpriv ra0 set SSID="$WF_SSID"
	checkwifi
	returnok
}

wifi_wpa_aes()
{
	WF_Mode=WPAPSK
	WF_Enc=AES

	iwpriv ra0 set AuthMode=$WF_Mode
	iwpriv ra0 set NetworkType=Infra
	iwpriv ra0 set EncrypType=$WF_Enc
	iwpriv ra0 set WPAPSK="$WF_KEY"
	iwpriv ra0 set SSID="$WF_SSID"
	checkwifi
	returnok
}

wifi_wep_auto()
{
	WF_Mode=WEPAUTO
	WF_Enc=WEP	

	iwpriv ra0 set AuthMode=WEPAUTO
	iwpriv ra0 set NetworkType=Infra
	iwpriv ra0 set EncrypType=WEP
	iwpriv ra0 set DefaultKeyID=1
	iwpriv ra0 set Key1="$WF_KEY"
	iwpriv ra0 set SSID="$WF_SSID"
	checkwifi
	returnok
}

wifi_none_open()
{
	WF_Mode=OPEN
	WF_Enc=NONE

	iwpriv ra0 set AuthMode=OPEN
	iwpriv ra0 set NetworkType=Infra	
	iwpriv ra0 set EncrypType=NONE
	iwpriv ra0 set SSID="$WF_SSID"
	checkwifi
	returnok
}

loadwf()
{
	. $WIFITMP
	WF_SSID=$WifiSsid
	WF_KEY=$WifiKey
}

loadwificonf()
{
. $TMP_PATH/twifi.conf
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

chkonlyIDKey()
{
	loadwf
	wifi_wpa2_aes
	wifi_wpa2_tkip
	wifi_wpa_aes
	wifi_wpa_tkip
	wifi_wep_auto
	wifi_none_open
}

setwifival()
{
. $TMP_PATH/twifi.conf
	echo "WifiEnable=1" > $WIFIPATH
	echo "WifiType=Infra" >> $WIFIPATH
	echo "WifiMode=$WifiMode" >> $WIFIPATH
	echo "WifiEnc=$WifiEnc" >> $WIFIPATH
	echo "WifiSsid=\"$WifiSsid\"" >> $WIFIPATH
	echo "WifiKey=\"$WifiKey\"" >> $WIFIPATH
}

iwpriv ra0 set NetworkType=Infra
PHONE=$1
if ! /mnt/mtd/ipc/wifiget $WIFITMP
then
	chkonlyIDKey
	exit 1
fi
loadwificonf
WF_RES=0
if [ $PHONE -eq 1 ]
then
	sleep 5
	checkwifiext
fi
if [ $WF_RES -eq 0 ]
then
	setwifival
fi
exit $WF_RES
