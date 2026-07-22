#! /bin/sh

TARGET="/mnt/mtd/ipc"
CONF="$TARGET/conf"
WIFIPATH="$CONF/wifi.conf"
TMP=/mnt/mtd/ipc/tmpfs/wf129
TMP1=/mnt/mtd/ipc/tmpfs/wf129t
. $WIFIPATH

if [ $WifiType = "Adhoc" ]
then
	NETFLAG=`cat /mnt/mtd/ipc/tmpfs/netflag.dat`
	if [ $NETFLAG -ne 0 ]
then
	exit 0
fi
fi

iwlist ra0 scanning > /dev/null
iwpriv ra0 get_site_survey | sed '1d 2d $d' > $TMP
$TARGET/wfsort $TMP $TMP1
mv $TMP1 $TMP
