#! /bin/sh

#echo "function $1"

TMP=$1
DEV=${TMP}p1

fdiskpart()
{
sfdisk -uM $TMP << EOF
,,83,*
EOF
}

for i in $(seq 10)
do
	fdiskpart
	if ls $DEV
	then
		break
	fi
	sleep 1
done

if [ $i -eq 10 ]
then
	exit 1
fi

mkfs.vfat -F 32 -s 64 $DEV

sync
