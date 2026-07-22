#! /bin/sh

MAPINI="/mnt/mtd/ipc/conf/config_facddns.ini"
NETINI="/mnt/mtd/ipc/conf/config_net.ini"
FPATH="/mnt/mtd/ipc/tmpfs/fddns.dat"

enable=`grep facenable $MAPINI | awk -F "\"" '{print $2}'` 
usernm=`grep facusername $MAPINI | awk -F "\"" '{print $2}'` 
passwd=`grep facpassword $MAPINI | awk -F "\"" '{print $2}'` 
server=`grep facserver $MAPINI | awk -F "\"" '{print $2}'` 
port=`grep facport $MAPINI | awk -F "\"" '{print $2}'` 
delay=`grep facinterval $MAPINI | awk -F "\"" '{print $2}'` 
webport=`grep httpport $NETINI | awk -F "\"" '{print $2}'` 
vendor="HX"
killall gerddns
echo "none" > $FPATH
if [ $enable -eq 1 ]
then
    /mnt/mtd/ipc/gerddns $usernm $passwd $server $port $delay $webport $vendor $FPATH &
fi
