#! /bin/sh

TARGET=/mnt/mtd/ipc

$TARGET/sd_detect ok &

while [ 1 ]
do
	sleep 15
	if ! ps | grep sd_detect | grep ok > /dev/null
	then
		$TARGET/sd_detect ok &
	fi
done
