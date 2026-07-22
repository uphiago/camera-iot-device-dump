#! /bin/sh

TMP=$1
DEV=${TMP}p1
#DSIZE=16777216
#14980
DSIZE=8388608

fdiskpart()
{
sfdisk -uM $TMP << EOF
,7600,83,*
EOF
}

DSKSIZE=`sfdisk -s $DEV`
if [ $DSKSIZE -lt $DSIZE ]
then
	exit 0
fi

for i in $(seq 10)
do
	fdiskpart
	if ls $DEV
	then
		break
	fi
	sleep 1
done

/mnt/mtd/ipc/mkfs.vfat -F 32 -s 64 $DEV

sync
