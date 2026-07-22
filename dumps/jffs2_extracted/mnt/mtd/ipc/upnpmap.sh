#! /bin/sh

MAPINI="/mnt/mtd/ipc/conf/config_sysinfo.ini"
MPATH="/mnt/mtd/ipc/tmpfs/upnpmap.dat"
MACINI="/mnt/mtd/ipc/conf/config_priv.ini"
NETINI="/mnt/mtd/ipc/conf/config_net.ini"
INTER="120"

rtspport=`grep rtspport $NETINI | awk -F "\"" '{print $2}'` 
rtmpport=`grep rtmpport $NETINI | awk -F "\"" '{print $2}'` 
webport=`grep httpport $NETINI | awk -F "\"" '{print $2}'` 
map_enable=`grep uenable $MAPINI | awk -F "\"" '{print $2}'` 

NETFLAG=`cat /mnt/mtd/ipc/tmpfs/netflag.dat`
if [ $NETFLAG -eq 0 ]
then
	dev="eth0"
else
	dev="ra0"
fi

mac=`ifconfig $dev | grep HWaddr | awk -F " " '{print $5}'`

echo "none" > $MPATH

killall upnp_map
sleep 1
killall upnp_map

if [ $map_enable -eq 1 ]
then
    /mnt/mtd/ipc/upnp_map $mac $MPATH $webport $rtspport $INTER $dev $rtmpport > /dev/null &
fi
