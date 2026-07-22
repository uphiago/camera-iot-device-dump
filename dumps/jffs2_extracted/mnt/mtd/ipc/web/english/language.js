// JavaScript Document
//punct
var colon    = ":";
var period   = ".";
var comma    = ",";
var blank    = "&nbsp;";
var exclamation = "!";

//deviceinfo
var str_devname    = "Device ID";
var str_devtype    = "Device Type";
var str_netstat    = "Network connection";
var str_connnum    = "Current Client";
var str_softver    = "Software Version";
var str_webware    = "Webware Version";
var str_macaddr    = "Mac address";
var str_ipaddr     = "IP address";
var str_submask    = "Subnet mask";
var str_gateway    = "Gateway";
var str_1stdns     = "Primary DNS";
var str_2nddns     = "Secondary DNS";
var str_upnpstatus="UPnPstatus";
var str_facddnsstatus="Manufacture's DDNS status";
var str_th3ddnsstatus="Third Party DDNS status";
var success           = "Success";
var unenable          = "Noenable";
var fail              = "Failed";
var str_sysstart   = "Start Time";
var str_sdstat     = "SD status";
var str_connwireless = "WiFi";
var str_connwired    = "LAN";
var str_dnsset     = "DNS Configuration Type";
var str_manualdns  = "Manual DNS";
var str_autodns    = "From DHCP Server";
var str_httpport   = "HTTP Port number";
var str_rtspport   = "RTSP Port";
var str_rtmpport   = "RTMP Port";
var str_rtspauth   = "RTSP Permission check";
var str_cap_cvbs  = "CVBS Setting";

//terminal
var str_addrcode   = "Address";
var str_protocol   = "Protocal"; 
var str_portset    = "Com Setting";
var str_485portset = 485 + str_portset;
var str_baudrate   = "Baudrate";
var str_databit    = "Data bit";
var str_stopbit    = "Stop bit";
var str_check      = "Check type";
var str_none       = "None";
var str_oddcheck   = "Odd";
var str_evencheck  = "Even";
var str_tiltscope='(1-50)';
var str_tiltno='Cruise turns can not be empty';
var tilttes="PTZ speed";
var tiltnum="Cruise laps";
var tiltmunmax="Cruise circle range:1-50";
var tiltcenter="Centered While Self Check";
var str_speed0="Fast";
var str_speed1="Medium";
var str_speed2="Slow";
var str_ptzalarm="Close the alarm PTZ movement";
var str_lenmodetip='Indicator Display Mode';
var str_lenmode1='Been lighted';
var str_lenmode2='Been extinguished';

//FTP 
var str_pasvmode   = "Passive mode";
var str_ftppic_name="Snap name";
var str_time_name  ="Time name";
var str_fixed_name ="Fixed name";
var str_alampic_name ="Alarm snap name";
var str_timepic_name ="Time snap name";
var str_filename_set ="File name set";
var str_autocreatedir ="Auto create dir";

//server
var str_server     = "Server Address";
var str_port       = "Server Port";
var str_username   = "User name";
var str_password   = "Password";
var str_repassword = "Re-type password ";
var str_auth       = "Authentication";
var str_ftp_path   = "Path";
var str_ftp_test   ="Test FTP settings";
var str_email_test   ="Test Email settings";

//email 
var str_emailset   = "Email Setting";
var str_smtpserv   = "SMTP server name:";
var str_sendto     = "Send To";
var str_emailaddr  = "e-Mail Address "
var str_sendaddr   = "Sender";
var str_subject    = "Subject";
var str_info       = "Message";
var str_max127c    = "the max length is 127";
var str_safelink="Safe link";
var str_massl0="None";
var str_massl1="SSL";
var str_massl2="TLS";
var str_massl3="STARTTLS";

//autosnap
var str_timeint    = "snap interval";
var str_sendemail  = "Send E-mail";
var str_savepic    = "Save Picture on the SD Card";
var str_ftpsnap    = "Save Picture on the FTP Server";

//Record Setting
var str_recsetup   = "Record Setting";
var str_recfile    = "Record files duration";
var str_recplan    = "Schedule Recording";
var str_allday     = "ALLtime Recording";
var str_allclear   = "No Recording";
var str_timearea   = "Specified time Recording";
var str_recswitch  = "Whether to open Record";
var str_all_area   ='Select List';
var str_no_area    ='Clear List';
var str_recformat='Record Format';

//alarmin
var str_offenon    = "Open";
var str_offenoff   = "Close";
var str_alarmex    = "External Alarm";
var str_alarmimode = "External Alarm Mode";


var str_alarmaudio ="Audio alarm";
var str_audiorange ="Volume range";

//audio
var str_audioset   = "Audio Settings";
var str_collecta   = "Audio Settings";
var str_auformat   = "Audio Type";
var str_audioin    = "Input Mode";
var str_volumein   =  "Input volume";
var str_volumeout   = "Output volume";
var str_inoption   = "Audio Input";
var str_intype     = "Input Type";
var str_aumicin    = "MIC";
var str_aulinein   = "Line in";

//time
var str_timenow    = "Current date & time";
var str_timedev    = "Device Date Time";
var str_change     = "Adjust ";
var str_manualset  = "Manual setting";
var str_date       = "Date";
var str_time       = "Time";
var str_dateformat = "(yyyy-mm-dd)";
var str_timeformat = "(hh:mm:ss)";
var str_daterange  = "(1971-01-01 ~ 2036-12-31)";
var str_syncfrompc = "Sync with computer time ";
var str_syncfrompc1 = "Sync with PC time";
var str_pctime     = "PC Time";
var str_ntserver   = "Network Time Protocol";
var str_ntpserver  = "NTP server";
var str_synctime   = "Interval";
var str_hour       = "hours";
var str_keeptmset  = "Keep current setting";
var str_timezone   = "Time zone ";
var str_autotime   = "Automatically adjust clock for daylight saving time changes";

//video
var str_videoset   = "Video settings";
var str_videomode  = "Video format";
var str_videocoding = "Video Coding";
var str_resolution = "Resolution";
var str_streamrate = "Bit rate";
var str_framerate  = "Maximum frame rate";
var str_framegap   = "Key frame interval";
var str_vcodectrl  = "Bit rate control";
var str_fixedcr    = "CBR";
var str_variablecr = "VBR";
var str_vcodequa   = "Image quality";
var str_osdset     = "OSD set";
var str_osdopt     = "Parenthesis Options";
var str_osdtime    = "Time Stamp";
var str_osdname    = "Camera name";
var str_name       = "Name";
var str_maxchn     = "Largest video channel coding";
var str_colour      = "Color";
var str_timeshow    ="Time show";
var str_nameshow    ="Name show";
var str_roof        ="TOP";
var str_base        ="Base";

//platform
var str_plcon      = "Enable";
var str_puidnum    = "PUID";
var str_asp        = "Access server port";
var str_asa        = "Access server address";
var str_fsp        = "Forwarder server port";
var str_fsa        = "Forwarder server address";
var str_gpsi       = "GPS information send interval";
var str_msec       = "(millisecond)";
var str_loginid    = "Device ID";
var str_loginpass  = "Password";
var str_serverport = "Port";
var str_serveraddr = "Server";
var str_timeout    = "Timeout";
var str_constate   = "Connection status";
var str_devnum     = "Device ID";
var str_dvsn       = "Series Number";
var str_atransfer  = "Audio transmission";
var str_alarmtrans = "Alarm information transmission";
var str_uid        = "UID";
var str_server1   = "Server1";
var str_server2   = "Server2";
var str_server3   = "Server3";
var str_server4   = "Server4";

//onvif
var str_onvifenable = "onvif";
var str_offcheck     ="No check";
var str_timecheck    ="Time zone Settings";
var str_videocheck   ="Image Settings";
var str_allow        ="Allow";
var str_prohibit     ="Prohibit"; 
var str_onvifchn     ="Subcode circulation way";
var str_onvifsnap     ="Capture the channel";
var str_onvifnvctype ="NVC Type";
var str_normal ="Normal";
var str_uniview ="Uniview";

//alarm
var str_emailalarm = "E-mail Alarm and Send with Picture";
var str_sendpic    = "Send with Picture ";
var str_saverecftp = "Save Video on the FTP Server ";
var str_relayout   = "Relay out";
var str_savevideo  = "Save Video on the SD card ";
var str_ftpservset = "FTP Server Setting";
var str_alarmplan  = "Time alarm";
var str_alarmday   = "Alltime alarm";
var str_alarmclear = "No alarm";
var str_alermarea  = "Specified time alarm";
var str_linkset    ="Linkage set";
var str_snapset    ="Image capture";
var str_snapnum    ="Image capture number";
var str_alarmpreset ="Linkage preset";

//network
var str_manualip   = "Fixed IP Address";
var str_autoip     = "Dynamic IP Address";
var str_lnset      = "LAN Settings";
var str_ipget      = "IP Configuration Type";
var str_internetip = "InternetIPAddress";
var str_netip      = "Internet IP Address";
var str_proddnsset = "Main DDNS ";
var str_hostname   = "Your Domain";
var str_3thdnsset  = "3th DDNS";
var str_servprov   = "Provider";
var str_autoupnp   = "UPnP Port Forwarding";
var str_wlcheck    = "Check  Wireless Set";
var str_wlsuccess  = "Connected to WiFi successfully.";
var str_applywl    = "Select &quot;Apply&quot; to save these settings.";
var str_wlfailed   = "Connect WiFi failed.";

//schdule
var str_weekmode     = "Use the week mode";
var str_weekendmode  = "Use the work mode";
var str_alltimemode  = "All times";
var str_week         = "day";
var str_begintime    = "start";
var str_endtime      = "end";
var str_workday      = "workday";
var str_freeday      = "weekend";
var str_sunday       = "Sunday";
var str_monday       = "Monday";
var str_tuesday      = "Tuesday";
var str_wednesday    = "Wednesday";
var str_thursday     = "Thursday";
var str_friday       = "Friday";
var str_saturday     = "Saturday";

//negative
var str_rtview   = "Monitor";
var str_config   = "Settings";
var str_avargs   = "Media";
var str_videoa   = "Video";
var str_imagea   = "Image";
var str_audioa   = "Audio";
var str_netset   = "Network";
var str_wlset    = "Wireless";
var str_ddnsset  = "Ddns";
var str_plset    = "Platform";
var str_onvif    = "ONVIF";
var str_p2pset   = "P2P";
var str_alarmset = "Alarm";
var str_alarmin  = "Alarm in";
var str_mdset    = "Motion detection";
var str_alaction = "Alarm";
var str_altime   = "schedule";
var str_advset   = "Advanced";
var str_userset  = "User";
var str_timesnap = "Auto snap";
var str_timerec  = "Timer record";
var str_email    = "Email";
var str_ftpset   = "FTP";
var str_ptzset   = "Terminal";
var str_sysset   = "System";
var str_timeset  = "Time";
var str_initset  = "Initialize";
var str_devinfo  = "Device information ";
var str_systemlog = "System Log";
var str_videoshade ="Video shade";

//sd op
var str_sdview   = "Browser SD Card";
var str_sdfat32  = "Format SD Card as fat32";
var str_sdstop   = "Unplug SD Card ";

//sd stat
var str_havesd     = "Card";
var str_nothavesd  = "No card";
var str_freespace  = "free space"
var str_totalspace = "total space" 

//system bak up
var str_reboot     = "Reboot";
var str_recoverdef = "Factory default";
var str_backup     = "Backup setting data";
var str_recoverbak = "Restore";
var str_upgradesys = "Upgrade";

//button
var str_btn_reboot     = "&nbsp;reboot&nbsp;";
var str_btn_save       = "&nbsp;save&nbsp;";
var str_btn_confirm    = "&nbsp;ok&nbsp;";
var str_btn_query      = "&nbsp;show&nbsp;";
var str_btn_advanced   = "&nbsp;Advanced&nbsp;";
var str_btn_recoverdef = "factory default";
var str_btn_apply      = "&nbsp;Apply&nbsp;";
var str_btn_cancel     = "Cancel";
var str_btn_clear      = "&nbsp;Clear&nbsp;";
var str_btn_default    = "Default";
var str_btn_search     = "&nbsp;search&nbsp;";
var str_btn_check      = "&nbsp;check&nbsp;";
var str_btn_close      = "&nbsp;close&nbsp;";
var str_btn_refresh    = "&nbsp;refresh&nbsp;";
var str_btn_test       = "Test";
var str_btn_cleanlog   = "Clear Log";

//propmt
var str_note_upgrade       = "&nbsp;IP Camera is upgrading,please don't turn off the camera. ";
var str_note_upgradeok     = "IP Camera upgrade success !";
var str_note_needreset     = "Note:Modify the settings, The system will automatically restart";
var str_note_needreset1    = "Note:Modify the settings, reboot the device";
var str_note_needreset2    = "(Note:Modify the settings, reboot the device)";
var str_note_astreamnote   = "(mobile)";
var str_note_wlsetting     = "Checking WiFi, please wait about 30 seconds.";
var str_note_inputpath     = "please input the file path ";
var str_note_inputipaddr   = "please input the ip address";
var str_note_inputsubmask  = "please input the subnet mask address";
var str_note_inputgateway  = "please input the gateway address";
var str_note_inputhostname = "please input domain";
var str_note_inputusername = "please input the username";
var str_note_inputpassword = "please input the password";
var str_note_inputport     = "please input server port";
var str_note_inputpath     = "Please enter the root path./";
var str_note_testtitle     = "Please set first, and then test.";
var str_note_inputservaddr = "please input server address";
var str_note_inputservname = "please input server name ";
var str_note_inputemail    = "please input the to address";
var str_note_inputsendaddr = "please input the from address";
var str_note_inputasp      = "Please input server port";
var str_note_inputasa      = "Please input access address";
var str_note_inputfsp      = "Please input forwarder server port";
var str_note_inputfsa      = "Please input forwarder address";
var str_note_inputtimeout  = "Please input timeout value";
var str_note_inputgpsi     = "Please input GPS information send interval";
var str_note_noinpublicip  = "Internet IP Address: NULL";
var str_note_internetipis  = "Internet IP Address: ";
var str_note_vcodequa      = "(The smaller the value, the better the image quality, larger flow control)";
var str_note_mbsize        = "Mobile picture resolution";
var str_note_mdoff         = "Note: the motion detection will be disable when the first stream is 320x176";
var str_note_maxframerate  = "Frame rates are over 25.";
var str_note_maxbps        = "Bit rate range is 32-6144.";
var str_note_maxbps1        = "Bit rate range is 32-8192.";
var str_note_maxbps2        = "Bit rate range is 32-2048.";
var str_note_maxbps3        = "Bit rate range is 32-512.";
var str_note_maxbps4        = "Bit rate range is 32-256.";
var str_note_atransfer     = "(Before opening audio transmission, Into the audio and video settings page, set the second audio stream turn on, AMR format)";
var str_note_ipportchange  = "Ip or port has been changed ,please Re-connect ";
var str_note_rhportsame    = "http and  rtsp use same port";
var str_note_inputdate     = "please input the date";
var str_note_inputtime     = "please input the time";
var str_note_routemode     = "(Select Infrastructure mode if using wireless router.)";
var str_note_inputascii    = "please input ASCII character (the length is 5 or 13 )";
var str_note_inputascii2   = "please input ASCII character (the length is 8 to 63 )";
var str_note_inputhex      = "please input HEX character (the length is 10 or 26 )";
var str_note_inputssid     = "please input the ssid";
var str_note_inputkey      = "Please input key";
var str_note_inputrekey    = "Please input re-type key";
var str_note_nosupportp2p  = "WPA/WPA2 is not supported in Point to Point mode.";
var str_note_turnoffmd     = "the video resolution is 320x176 , motion dectection is disable ";
var str_note_autoreboot    = "The machine will be rebooted!";
var str_test_success       = "Test......Success.";
var str_test_fail          = "Test......Failed.";



//err
var str_err_invaildc   = "include invalid character";
var str_err_invaildc2  = "include invalid character.(&,=,\",\\\)";
var str_err_username   = "username error";
var str_err_hostname   = "hostname error";
var str_err_servname   = "server name error";
var str_err_password   = "password error";
var str_err_port       = "the port is error";
var str_err_userinfo   = "user infomation error,please input again";
var str_err_servbusy   = "server is busy,please wait for a moment";
var str_err_addrcode   = "address out of range";
var str_err_port       = "port error"
var str_err_servaddr   = "your address is error";
var str_err_smptserv   = "the port is error";
var str_err_emailaddr  = "invalid address";
var str_err_tooshort   = "the length of address must bigger than 5";
var str_err_noat       = "the address must include '@' character";
var str_err_addr1      = "to address is error";
var str_err_addr2      = "";
var str_err_addr3      = "";
var str_err_sendaddr   = "from address is error";
var str_err_subject    = "subject is error";
var str_err_info       = "message is error";
var str_err_snapint    = "the interval is invalid (5-86400)";
var str_err_recfile    = "The time range of 15-900 seconds";
var str_err_recfile1    = "The time range of 15-600 seconds";
var str_err_pwdconfirm = "Re-type password error.";
var str_err_framegap   = "Key frame are 2-150";
var str_err_osdname    = "Word's number are more than 18.";
var str_err_noname     = "please input the camera name";
var str_err_noblank    = "Name cannot be all Spaces";
var str_err_puid       = "Input PUID error";
var str_err_asp        = "Access server port error";
var str_err_asa        = "Access address error";
var str_err_fsp        = "Forwarder server port error";
var str_err_fsa        = "Forwarder address error";
var str_err_username   = "username error";
var str_err_timeout    = "Input timeout value error";
var str_err_tooutrange = "timeout out of range";
var str_err_devnum     = "Input device ID error";
var str_err_servaddr   = "server address error";
var str_err_input      = " Input error\n\n";
var str_err_addrrange1 = "invalid address,the first number";
var str_err_addrrange2 = "invalid address,the second number";
var str_err_addrrange3 = "invalid address,the third number";
var str_err_addrlast   = "invalid address,the last number"
var str_err_addr       = "invalid address";
var str_err_value      = "invalid value";
var str_err_pctime     = "your pc time is invalid,the time must between 1970-01-01 to 2037-12-31";
var str_err_dateformat = "invalid date format";
var str_err_dfinput    = "the format must be yyyy-mm-dd";
var str_err_reinputd   = "the date invalid,please re-input";
var str_err_invaildtmf = "invalid date format";
var str_err_timeformat = "the format must be hh:mm:ss";
var str_err_imvaildtm  = "invalid time format";
var str_err_key        = "wep key length is error.Hex is 10 or 26; ASCII is 5 or 13";
var str_err_ssid       = "ssid is error,include invalid character";
var str_err_rekey      = "the Re-type key is error";
var str_err_ssid       = "ssid error,include invalid character";
var str_err_ip2gateway = "IP and gateway not in the same network segment";
var str_err_volume     = "The volume is out of range ( 1-100), please reset";
var str_err_volume16     = "The volume is out of range (1-16), please reset";
var str_err_volume13     = "The volume is out of range (1-13), please reset";
var str_err_username   ="The user name cannot be the same"; 
var str_err_nameerr    ="User name can only contain letters and numbers";
var str_err_nousername     = "please input the user name";
var str_error_none         ="An unknown error";
var str_error_server       ="Can not connect to the server";
var str_error_namepwd      ="Incorrect user or password";
var str_error_dir          ="Path error";
var str_error_ssl          ="SSL setting error";


var str_bps32_2048 = "First stream bitrate are 32-2048 kbps";
var str_bps32_512  = "First stream bitrate are 32-512 kbps";
var str_bps32_256  = "First stream bitrate are 32-256 kbps";

//range
var str_1_65535 = "1-65535";
var str_1_223_127 =" must between 1 to 223 and not 127";
var str_0_255   = " must between 0 to 255";
var str_1_255   = " must between 1 to 255";
var str_0_254   = " must between 0 to 254";
var str_1_254   = " must between 1 to 254"
var str_80or1024_49151 = "(80 or1024~49151)";
var str_554or1024_49151 = "(554 or1024~49151)";
var str_daterange  = "the date must between 1971-01-01 to 2036-12-31,please re-input ";
var str_drange  = "(1971-01-01 ~ 2036-12-31)";

//no ins
var str_noins0 = "The emergence of this page shows:";
var str_noins1 = "1. You do not install this ActiveX control.";
var str_noins2 = "2. You have installed, but it is an updated version of the ActiveX control that you need to download.";
var str_noins3 = "Please click";
var str_noins4 = "Download ActivX";
var str_noins5 = "and click";
var str_noins6 = "run";
var str_noins7 = "in the pop message box to install this ActiveX control, finnally, refresh this web page, start one device, then you can view the video.";

//in common use
var str_readonly  = "readonly";
var str_rate      = "rate";
var str_auto      = "auto";
var str_view      = "view";
var str_minute    = "minutes";
var str_stream    = "Stream";
var str_1ststream = "First stream";
var str_2ndstream = "Second stream";
var str_3thstream = "Third stream";
var str_on        = "On";
var str_off       = "Off";
var str_online    = "Online";
var str_offline   = "Offline";
var str_sec       = "sec"
var str_language  = "Language:";
var str_ch        = "Chinese";
var str_en        = "English";
var str_add       = "Action";
var str_encrypt   = "Encrypt";
var str_authen    = "Auth";
var str_connetm   = "Network Type";
var str_channel   = "Channel";
var str_confirm   = "Join"; 
var str_purview   ="Purview"; 


//time zone
var str_GMT1  = 'International Date Line West';
var str_GMT2  = 'Samoa';
var str_GMT3  = 'Hawaii';
var str_GMT4  = 'Alaska';
var str_GMT5  = 'Pacific Time (U.S. and Canada)';
var str_GMT6  = 'Chihuahua,';
var str_GMT7  = 'Mountain Time (U.S. and Canada)';
var str_GMT8  = 'Arizona';
var str_GMT9  = 'Saskatchewan';
var str_GMT10 = 'Guadalajars,Mexico City,Monterrey';
var str_GMT11 = 'Central Time (U.S. and Canada)';
var str_GMT12 = 'Central America';
var str_GMT13 = 'Indians (East)';
var str_GMT14 = 'Eastern Time (U.S. and Canada)';
var str_GMT15 = 'Bogota,Lima,Quita';
var str_GMT16 = 'Carcacas';
var str_GMT17 = 'Santiago';
var str_GMT18 = 'Atlantic Time (Canada)';
var str_GMT19 = 'Newfoundland';
var str_GMT20 = 'Montevideo';
var str_GMT21 = 'Buenos Aires';
var str_GMT22 = 'Brasilia';
var str_GMT23 = 'Mid-Atlantic';
var str_GMT24 = 'Cape Verde Islands';
var str_GMT25 = 'Azores';
var str_GMT26 = 'Dublin,Edinburgh,Lisbon,London';
var str_GMT27 = 'Casablance';
var str_GMT28 = 'Amsterdam,Berlin,Bern,Rome,Stockholm,Vienna';
var str_GMT29 = 'Belgrade,Bratislava,Budapest,Ljubljana,Prague';
var str_GMT30 = 'Brussels,Copenhagen,Madrid,Paris';
var str_GMT31 = 'Sarajevo,Skopje,Warsaw,Zagreb';
var str_GMT32 = 'West Central Africa';
var str_GMT33 = 'Athens,Bucharest,Istanbul';
var str_GMT34 = 'Bucharest';
var str_GMT35 = 'Cairo';
var str_GMT36 = 'Harare,Pretoria';
var str_GMT37 = 'Helsinki,Kyiv,Riga,Sofia,Vilnius,Talinn';
var str_GMT38 = 'Jerusalem';
var str_GMT39 = 'Baghdad';
var str_GMT40 = 'Kuwait,Riyadh';
var str_GMT41 = 'Moscow,St.Petersburg,Volgograd';
var str_GMT42 = 'Nairobi';
var str_GMT43 = 'Tehran';
var str_GMT44 = 'Abu_Dhabi,Muscat';
var str_GMT45 = 'Baku';
var str_GMT46 = 'Kabul';
var str_GMT47 = 'Yekaterinburg';
var str_GMT48 = 'Islamabad,Karachi';
var str_GMT49 = 'Chennai,Kolkata,Mumbai,New Delhi';
var str_GMT50 = 'Katmandu';
var str_GMT51 = 'Novosibirsk';
var str_GMT52 = 'Dhaka';
var str_GMT53 = 'Astana';
var str_GMT54 = 'Rangoon';
var str_GMT55 = 'Bangkok,Hanoi,Jakarta';
var str_GMT56 = 'Krasnoyarsk';
var str_GMT57 = 'Beijing,Chongqing,Hong Kong,Urumqi';
var str_GMT58 = 'Irkutsk';
var str_GMT59 = 'Kuala Lumpur,Singapore';
var str_GMT60 = 'Perth';
var str_GMT61 = 'Taipei';
var str_GMT62 = 'Osaka,Sapporo,Tokyo';
var str_GMT63 = 'Seoul';
var str_GMT64 = 'Yakutsk';
var str_GMT65 = 'Adelaide';
var str_GMT66 = 'Brisbane';
var str_GMT67 = 'Canberra,Melbourne,Sydney';
var str_GMT68 = 'Guam,Port Moresby';
var str_GMT69 = 'Hobart';
var str_GMT70 = 'Vladivostok';
var str_GMT71 = 'Magadan';
var str_GMT72 = 'Auckland,Wellington';
var str_GMT73 = 'Fiji';
var str_GMT74 = 'Nuku_alofa';


//query
var str_ask_sdfat32    = "SD Card will be format as fat32. Are you sure?";
var str_ask_sdstop     = "SD Card will be stop. Are you sure?";
var str_ask_recoverbak = "the ipcam will be restore. Are you sure?";
var str_ask_syspath    = "please input the file path ";
var str_ask_upgradesys = "the ipcam will be upgrade. Are you sure?";
var str_ask_reboot     = "the ipcam will be rebooted. Are you sure?";
var str_ask_recoverdef = "setup data will be initialized. Are you sure?";


/// display
var str_adjustneff  = "(Night effect adjust)";
var str_nightmode   = "Night model";
var str_adjustnl    = "Night luminance adjust";
var str_nlight      = "Night luminance";
var str_brightness  = "Brightness";
var str_saturation  = "Saturation";
var str_contrast    = "Contrast";
var str_sharpness   = "Sharpness";
var str_hue         = "Hue";
var str_shutter     = "Shutter";
var str_ae          = "AE";
var str_targety     = "Exposure";
var str_dnt         = "Sensitivity";
var str_lumi        = "Luminance";
var str_imageset    = "Image settings";
var str_updown      = "Flip";
var str_leftright   = "Mirror";
var str_wdr     = "WDR";
var str_onmode      ="Mode";
var str_mode        ="Mode";
var str_black       ="Black And White";
var str_color       ="Color";
var str_aemode      ="Aemode";
var str_auto        ="Auto";
var str_indoor      ="Indoor";
var str_outdoor     ="Outdoor";
var str_imgmode     ="Imgmode";
var str_framerate1   ="Frame rate";
var str_inance      ="Illuminance";
var str_ircut       ="IRCut";
var str_ircutye     ="(1-1024,the late value,the greater the switching time)";
var str_sensitivity = "Sensitivity";
var str_wdrmode     = "WDR";
var str_window      = "Window";
var str_safetype    = "Security mode";
var str_encway      = "WPA Algorithm"; 
var str_key         = "Key";
var str_confirmkey  = "Re-type key";
var str_checkwl     = "Check  Wireless Setup";
var str_hwctrl      = "IR LED Control";
var str_noise       = "Noise";
var str_noisetye   = "(0-100,Lower according to the work)";

// wireless
var str_wlenable    = "Enable Wireless";
var str_conmode     = "Mode";
var str_route       = "Infrastructure";
var str_p2p         = "Point to Point";

var str_welcome     = "Select what you want to do:";
var str_pcview      = "PC view";
var str_mbview      = "Mobile view";
var str_setupsoft   = "Setup software(first time)";

var str_sd          ="SD card";
var str_snap        ="capture";
var str_record      ="record";
var str_playback    ="playback";
var str_up          ="up";
var str_down        ="down";
var str_right       ="right";
var str_left        ="left";
var str_center      ="center";
var str_ud          ="cruising up and down";
var str_lr          ="cruising left and right";
var str_preset       ="presetting";
var str_zoomin      ="zoom in";
var str_zoomout     ="zoom out";
var str_posset         ="set";
var str_poscall        ="call";
var str_refresh     ="Refresh";
//gb28181
var str_err_svrport    ="The server port range is 1 to 65535.";
var str_gb28181      ="GB28181";
var str_gb_gb28181   ="GB28181";
var str_svrid        ="Server ID";
var str_svrip        ="Server Address";
var str_svrport      ="Server Port";
var str_devid        ="Device ID";
var str_devpwd       ="Device password";
var str_alarmid      ="Alarm ID";
//Multiple settings
var str_addport ='Multiple settings';
var str_addportset ='Multiple settings';
var str_local_host = "Native";
var str_refesh = "Refresh";
var str_local_network = "Lan Search";
var str_first_dev = "The 1st device";
var str_second_dev = "The 2nd device";
var str_third_dev = "The 3rd device";
var str_fourth_dev = "The 4th device";
var str_fifth_dev = "The 5th device";
var str_sixth_dev = "The 6th device";
var str_seventh_dev = "The 7th device";
var str_eighth_dev = "The 8th device";
var str_ninth_dev = "The 9th device";
var str_add = "Add";
var str_remove = "Remove";
var str_set = "Submit";
var str_cancel= "Cancel";
var str_none = 'None';
var str_overlay_name='Camera Name:';
var str_ip_address='IP:';
var str_http_port='Port:';
var str_user_name='User:';
var str_user_psw='Password:';
var str_anonymous = '';
var str_err_selected ="The host does not exist, please choose again!" 
var str_err_hostnum  ="Please choose to operate on the host!"; 
