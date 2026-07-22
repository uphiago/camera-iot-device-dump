#! /bin/sh

MAPINI="/mnt/mtd/ipc/conf/config_3thddns.ini"

enable=`grep th3enable $MAPINI | awk -F "\"" '{print $2}'` 
usernm=`grep th3username $MAPINI | awk -F "\"" '{print $2}'` 
passwd=`grep th3password $MAPINI | awk -F "\"" '{print $2}'` 
host=`grep th3host $MAPINI | awk -F "\"" '{print $2}'` 
delay=`grep th3interval $MAPINI | awk -F "\"" '{print $2}'` 
srvtype=`grep th3srvtype $MAPINI | awk -F "\"" '{print $2}'` 
path="/mnt/mtd/ipc/tmpfs/th3ddns.dat"

echo "none" > $path
killall ddns_update
if [ $enable -eq 1 ]
then
    /mnt/mtd/ipc/ddns_update $host $usernm $passwd $delay $srvtype $path &
fi
