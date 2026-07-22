#! /bin/sh

OPID=`ps | grep udhcpc | awk '{print $1}'`
kill -9 $OPID
OPID=`ps | grep sd.sh | awk '{print $1}'`
kill -9 $OPID
OPID=`ps | grep sd_detect | awk '{print $1}'`
kill -9 $OPID
OPID=`ps | grep gerddns | awk '{print $1}'`
kill -9 $OPID
OPID=`ps | grep ddns_update | awk '{print $1}'`
kill -9 $OPID
OPID=`ps | grep upnp_map | awk '{print $1}'`
kill -9 $OPID
OPID=`ps | grep proxy | awk '{print $1}'`
kill -9 $OPID
OPID=`ps | grep onvif | awk '{print $1}'`
kill -9 $OPID
OPID=`ps | grep hidog | awk '{print $1}'`
kill -9 $OPID
OPID=`ps | grep hichip | awk '{print $1}'`
kill -9 $OPID
OPID=`ps | grep tutk | awk '{print $1}'`
kill -9 $OPID
OPID=`ps | grep p2p_obj | awk '{print $1}'`
kill -9 $OPID
OPID=`ps | grep net_detect | awk '{print $1}'`
kill -9 $OPID
OPID=`ps | grep chksock | awk '{print $1}'`
kill -9 $OPID
OPID=`ps | grep updatewifi | awk '{print $1}'`
kill -9 $OPID