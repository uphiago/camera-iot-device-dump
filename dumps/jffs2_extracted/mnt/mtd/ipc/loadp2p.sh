#! /bin/sh

OVINI="/mnt/mtd/ipc/conf/config_onvif.ini"

onvifstart()
{
	ovenable=`grep ovenable $OVINI | awk -F "\"" '{print $2}'` 
	if [ $ovenable -eq 1 ]
	then
	    killall -9 onvif
	    /mnt/mtd/ipc/onvif &
	fi
}

sleep $1

onvifstart
