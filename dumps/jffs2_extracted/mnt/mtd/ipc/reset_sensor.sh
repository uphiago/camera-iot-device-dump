#! /bin/sh

echo 27 > /sys/class/gpio/export
echo out > /sys/class/gpio/gpio27/direction
echo 1 > /sys/class/gpio/gpio27/value
sleep 0.5
echo 0 > /sys/class/gpio/gpio27/value
sleep 0.5
echo 1 > /sys/class/gpio/gpio27/value

