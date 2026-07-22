#! /bin/sh

DHCPNAMEPATH="/mnt/mtd/ipc/conf/config_priv.ini"

dhcpname=`grep dhcpname $DHCPNAMEPATH | awk -F "\"" '{print $2}'`

killall udhcpc

udhcpc -a -b -i $1 -h $dhcpname -R
