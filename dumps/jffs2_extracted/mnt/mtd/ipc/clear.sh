#! /bin/sh

IPC_PATH="/mnt/mtd/ipc"

rm -fr $IPC_PATH/tutk
rm -fr $IPC_PATH/ipc_dog
rm -fr $IPC_PATH/hidog
rm -fr $IPC_PATH/hichip
rm -fr $IPC_PATH/hichip.bak
rm -fr $IPC_PATH/libAPILib.so
rm -fr $IPC_PATH/libAPILib.so.bak
rm -fr $IPC_PATH/libhichip.so
rm -fr $IPC_PATH/libhichip.so.bak
rm -fr /lib/libNetLib.so
rm -fr /lib/libAPILib.so
rm -fr /lib/libhichip.so
rm -fr /lib/libXqAPILib.so
rm -fr /lib/libxqun.so
ln -s $IPC_PATH/tmpfs/libNetLib.so /lib/libNetLib.so
ln -s $IPC_PATH/tmpfs/libXqAPILib.so /lib/libXqAPILib.so
ln -s $IPC_PATH/tmpfs/libxqun.so /lib/libxqun.so
rm -fr $IPC_PATH/smartset
rm -fr $IPC_PATH/smartset.sh

#sync
