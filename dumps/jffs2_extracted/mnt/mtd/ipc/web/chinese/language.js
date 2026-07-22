// JavaScript Document
//标点符号
var colon    = "：";
var period   = "。";
var comma    = "，";
var blank    = "&nbsp;";
var exclamation = "！";

//设备信息
var str_devname    = "设备名称";
var str_devtype    = "设备类型";
var str_netstat    = "网络连接状态";
var str_connnum    = "用户连接数";
var str_softver    = "软件版本";
var str_webware    = "网页版本";
var str_macaddr    = "Mac 地址";
var str_ipaddr     = "IP 地址";
var str_submask    = "子网掩码";
var str_gateway    = "网关";
var str_1stdns     = "首选 DNS";
var str_2nddns     = "备用 DNS";
var str_upnpstatus = "UPnP状态";
var str_facddnsstatus = "厂商动态域名状态";
var str_th3ddnsstatus = "第三方动态域名状态";
var success           = "成功";
var unenable          = "未启用";
var fail              = "失败";
var str_sysstart   = "系统开始运行时间";
var str_sdstat     = "SD卡状态";
var str_connwireless = "无线连接";
var str_connwired    = "有线连接";
var str_dnsset     = "DNS 设置";
var str_manualdns  = "手动设置DNS";
var str_autodns    = "自动设置DNS";
var str_httpport   = "HTTP 端口";
var str_rtspport   = "RTSP 端口";
var str_rtmpport   = "RTMP 端口";
var str_rtspauth   = "RTSP权限校验";
var str_cap_cvbs  = "CVBS设置";

//云台设置
var str_addrcode   = "地址码";
var str_protocol   = "协议"; 
var str_portset    = "端口设置";
var str_485portset = 485 + str_portset;
var str_baudrate   = "波特率";
var str_databit    = "数据位";
var str_stopbit    = "停止位";
var str_check      = "校验";
var str_none       = "无";
var str_oddcheck   = "奇校验";
var str_evencheck  = "偶校验";
var str_tiltscope='（1-50）';
var str_tiltno='巡航圈数不能为空';
var tilttes="云台速度";
var tiltnum="巡航圈数";
var tiltmunmax="巡航圈数范围为1-50";
var tiltcenter="自检居中";
var str_speed0="快";
var str_speed1="中";
var str_speed2="慢";
var str_ptzalarm="云台运动时关闭报警";
var str_lenmodetip='指示灯显示模式';
var str_lenmode1='一直亮';
var str_lenmode2='一直熄灭';

//FTP 
var str_pasvmode   = "被动模式";
var str_ftppic_name="图片文件名";
var str_time_name  ="日期时间名";
var str_fixed_name ="固定文件名";
var str_alampic_name ="报警抓拍图片文件名";
var str_timepic_name ="定时抓拍图片文件名";
var str_filename_set ="文件名设置";
var str_autocreatedir ="自动创建目录";

//服务器设置
var str_server     = "服务器";
var str_port       = "端口";
var str_username   = "用户名";
var str_password   = "密码";
var str_repassword = "确认密码";
var str_auth       = "验证";
var str_ftp_path   ="路径";
var str_ftp_test   ="测试FTP设置";
var str_email_test   ="测试Email设置";

//email 设置
var str_emailset   = "E-mail 设置";
var str_smtpserv   = "SMTP 服务器：";
var str_sendto     = "接收地址";
var str_emailaddr  = "电邮地址"
var str_sendaddr   = "发件地址";
var str_subject    = "主题";
var str_info       = "信息";
var str_max127c    = "最多可以输入127个字符";
var str_safelink="安全连接";
var str_massl0="None";
var str_massl1="SSL";
var str_massl2="TLS";
var str_massl3="STARTTLS";

//自动抓拍
var str_timeint    = "时间间隔";
var str_sendemail  = "发送E-mail";
var str_savepic    = "保存图片到SD卡";
var str_ftpsnap    = "保存图片到FTP服务器";

//录像设置
var str_recsetup   = "录像设置";
var str_recfile    = "录像文件时长";
var str_recplan    = "计划录像";
var str_allday     = "全天录像";
var str_allclear   = "不录像";
var str_timearea   = "指定时间录像";
var str_recswitch  = "是否开启录像";
var str_all_area ='全选列表';
var str_no_area ='清除列表';
var str_recformat='录像格式';

//外置报警
var str_offenon    = "常开";
var str_offenoff   = "常闭";
var str_alarmex    = "外置报警输入";
var str_alarmimode = "外置报警模式";

var str_alarmaudio ="声音报警";
var str_audiorange ="音量范围";


//音频设置
var str_audioset   = "音频设置";
var str_collecta   = "采集音频";
var str_auformat   = "音频格式";
var str_audioin    = "音频输入";
var str_volumein   = "输入音量";
var str_volumeout   = "输出音量";
var str_inoption   = "输入选项";
var str_intype     = "输入类型";
var str_aumicin    = "麦克输入";
var str_aulinein   = "线性输入";

//时间设置
var str_timenow    = "当前日期时间";
var str_timedev    = "设备日期时间";
var str_change     = "更改";
var str_manualset  = "手动设置";
var str_date       = "日期";
var str_time       = "时间";
var str_dateformat = "(年-月-日)";
var str_timeformat = "(时：分：秒)";
var str_daterange  = "(1971-01-01 ~ 2036-12-31)";
var str_syncfrompc = "同步到PC时间";
var str_syncfrompc1 = "与PC时间同步";
var str_pctime     = "PC 时间";
var str_ntserver   = "网络时间服务器";
var str_ntpserver  = "NTP服务器";
var str_synctime   = "同步间隔";
var str_hour       = "小时";
var str_keeptmset  = "保持当前设置";
var str_timezone   = "时区";
var str_autotime   = "自动调节时间";

//视频设置
var str_videoset   = "视频设置";
var str_videomode  = "视频制式";
var str_videocoding = "视频编码";
var str_resolution = "清晰度";
var str_streamrate = "码率";
var str_framerate  = "帧率";
var str_framegap   = "主帧间隔";
var str_vcodectrl  = "视频编码控制";
var str_fixedcr    = "固定码率";
var str_variablecr = "可变码率";
var str_vcodequa   = "视频编码质量";
var str_osdset     = "OSD设置";
var str_osdopt     = "叠加选项";
var str_osdtime    = "叠加时间";
var str_osdname    = "叠加名称";
var str_name       = "名称";
var str_maxchn     = "最大视频编码通道";
var str_colour      = "颜色";
var str_timeshow    ="时间显示";
var str_nameshow    ="名称显示";
var str_roof    ="顶部";
var str_base    ="底部";

//平台设置
var str_plcon      = "平台连接";
var str_puidnum    = "PUID号";
var str_asp        = "接入服务器端口";
var str_asa        = "接入服务器地址";
var str_fsp        = "转发服务器端口";
var str_fsa        = "转发服务器地址";
var str_gpsi       = "GPS信息传输间隔";
var str_msec       = "(毫秒)";
var str_loginid    = "登录ID";
var str_loginpass  = "登录密码";
var str_serverport = "服务器端口";
var str_serveraddr = "服务器地址";
var str_timeout    = "超时时间";
var str_constate   = "连接状态";
var str_devnum     = "设备号";
var str_dvsn       = "序列号";
var str_atransfer  = "音频传输";
var str_alarmtrans = "报警信息传输";
var str_uid        = "UID";
var str_server1   = "服务器1";
var str_server2   = "服务器2";
var str_server3   = "服务器3";
var str_server4   = "服务器4";

//onvif设置
var str_onvifenable = "onvif";
var str_offcheck     ="不校验";
var str_timecheck    ="时间时区设置";
var str_videocheck   ="图象参数设置";
var str_allow        ="允许";
var str_prohibit     ="禁止"; 
var str_onvifchn     ="子码流通道";
var str_onvifsnap     ="抓拍通道";
var str_onvifnvctype ="NVC类型";
var str_normal ="标准";
var str_uniview ="Uniview";
 

//报警联动
var str_emailalarm = "E-mail 报警并发送图片";
var str_sendpic    = "发送图片";
var str_saverecftp = "保存视频到FTP服务器";
var str_relayout   = "继电器输出";
var str_savevideo  = "保存视频到SD卡";
var str_ftpservset = "FTP服务器设置";
var str_alarmplan    = "报警时间";
var str_alarmday     = "所有时间报警";
var str_alarmclear   = "不报警";
var str_alermarea   = "指定时间报警";
var str_linkset    ="联动设置";
var str_snapset    ="图片抓拍";
var str_snapnum  ="图片抓拍张数";
var str_alarmpreset ="联动预置位";

//网络设置
var str_manualip   = "手动设置IP";
var str_autoip     = "自动获取IP";
var str_lnset      = "局域网设置";
var str_ipget      = "IP 获取";
var str_internetip = "互联网IP地址";
var str_netip      = "互联网IP地址";
var str_proddnsset = "厂商动态域名设置";
var str_hostname   = "主机名";
var str_3thdnsset  = "第三方动态域名设置";
var str_servprov   = "服务商";
var str_autoupnp   = "UPnP自动端口映射";
var str_wlcheck    = "检查无线设置";
var str_wlsuccess  = "连接成功，无线设置正确。";
var str_applywl    = "请点击“应用”保存无线设置。";
var str_wlfailed   = "连接失败，请检查无线设置。";

//调度
var str_weekmode     = "整周模式";
var str_weekendmode  = "工作日休息日模式";
var str_alltimemode  = "所有时间模式";
var str_week         = "星期";
var str_begintime    = "开始时间";
var str_endtime      = "结束时间";
var str_workday      = "工作日";
var str_freeday      = "休息日";
var str_sunday       = "星期日";
var str_monday       = "星期一";
var str_tuesday      = "星期二";
var str_wednesday    = "星期三";
var str_thursday     = "星期四";
var str_friday       = "星期五";
var str_saturday     = "星期六";

//导航
var str_rtview   = "实时监看";
var str_config   = "参数设置";
var str_avargs   = "音视频参数";
var str_videoa   = "视频参数";
var str_imagea   = "图像参数";
var str_audioa   = "音频参数";
var str_netset   = "网络设置";
var str_wlset    = "无线设置";
var str_ddnsset  = "远程访问设置";
var str_plset    = "平台设置";
var str_onvif    = "ONVIF设置";
var str_p2pset      = "P2P设置";
var str_alarmset = "报警设置";
var str_alarmin  = "外置报警";
var str_mdset    = "移动侦测";
var str_alaction = "报警联动";
var str_altime   = "报警时间";
var str_advset   = "高级设置";
var str_userset  = "用户管理";
var str_timesnap = "定时抓拍";
var str_timerec  = "定时录像";
var str_email    = "电子邮件";
var str_ftpset   = "FTP设置";
var str_ptzset   = "云台设置";
var str_sysset   = "系统设置";
var str_timeset  = "时间设置";
var str_initset  = "初始设置";
var str_devinfo  = "设备信息";
var str_systemlog ="系统日志";
var str_videoshade ="视频遮挡";

//sd操作
var str_sdview   = "浏览SD卡";
var str_sdfat32  = "用FAT32格式化SD卡";
var str_sdstop   = "停止SD卡";

//sd状态
var str_havesd     = "有卡";
var str_nothavesd  = "无卡";
var str_freespace  = "可用空间"
var str_totalspace = "容量" 

//系统备份升级
var str_reboot     = "重新启动系统";
var str_recoverdef = "恢复出厂默认值";
var str_backup     = "备份配置数据";
var str_recoverbak = "恢复配置数据";
var str_upgradesys = "系统升级";

//按钮字符串
var str_btn_reboot     = "&nbsp;重启&nbsp;";
var str_btn_save       = "&nbsp;保存&nbsp;";
var str_btn_confirm    = "&nbsp;确定&nbsp;";
var str_btn_query      = "&nbsp;查询&nbsp;";
var str_btn_advanced   = "&nbsp;高级&nbsp;";
var str_btn_recoverdef = "恢复出厂设置";
var str_btn_apply      = "&nbsp;应&nbsp;用&nbsp;";
var str_btn_cancel     = "&nbsp;取&nbsp;消&nbsp;";
var str_btn_clear      = "&nbsp;清&nbsp;除&nbsp;";
var str_btn_default    = "&nbsp;默&nbsp;认&nbsp;";
var str_btn_search     = "&nbsp;搜&nbsp;索&nbsp;";
var str_btn_check      = "&nbsp;检&nbsp;查&nbsp;";
var str_btn_close      = "&nbsp;关&nbsp;闭&nbsp;";
var str_btn_refresh    = "&nbsp;刷&nbsp;新&nbsp;";
var str_btn_test       = "测试";
var str_btn_cleanlog   = "清除日志";

//提示
var str_note_upgrade       = "设备正在升级，请不要切断电源。";
var str_note_upgradeok     = "系统升级成功！";
var str_note_needreset     = "注意：修改设置后，系统将自动重启！";
var str_note_needreset1    = "注意：修改设置后，请重启设备。";
var str_note_needreset2    = "(注意：修改设置后，请重启设备。)";
var str_note_astreamnote   = "(注意：手机浏览使用此码流)";
var str_note_wlsetting     = "正在检查无线设置，请等待大约30秒。";
var str_note_inputpath     = "请输入文件路径";
var str_note_inputipaddr   = "请输入IP地址";
var str_note_inputsubmask  = "请输入子网掩码";
var str_note_inputgateway  = "请输入网关";
var str_note_inputhostname = "请输入主机名";
var str_note_inputusername = "请输入用户名";
var str_note_inputpassword = "请输入密码";
var str_note_inputport     = "请输入端口";
var str_note_inputpath     = "请输入路径,根路径为./";
var str_note_testtitle     = "请先点击应用按钮，然后再测试。";
var str_note_inputservaddr = "请输入服务器地址";
var str_note_inputservname = "请输入服务器名";
var str_note_inputemail    = "请输入E-mail地址";
var str_note_inputsendaddr = "请输入发件地址";
var str_note_inputasp      = "请输入接入服务器端口";
var str_note_inputasa      = "请输入接入服务器地址";
var str_note_inputfsp      = "请输入转发服务器端口";
var str_note_inputfsa      = "请输入转发服务器地址";
var str_note_inputtimeout  = "请输入超时时间";
var str_note_inputgpsi     = "请输入GPS信息发送间隔时间";
var str_note_noinpublicip  = "设备未接入互联网，无法查询公网IP地址";
var str_note_internetipis  = "互联网IP地址为";
var str_note_vcodequa      = "(值越小，图像质量越好，码流控制幅度越大)";
var str_note_mbsize        = "手机图片分辨率";
var str_note_mdoff         = "当第一码流分辨率为320x176时，移动检测自动关闭。";
var str_note_maxframerate  = "帧率不能大于25";
var str_note_maxbps        = "码率范围是32-6144。";
var str_note_maxbps1        = "码率范围是32-8192。";
var str_note_maxbps2        = "码率范围是32-2048。";
var str_note_maxbps3        = "码率范围是32-512。";
var str_note_maxbps4        = "码率范围是32-256。";
var str_note_atransfer     = "(开启音频传输前，请先进入音视频设置页面，设置次码流音频为开启，AMR格式)";
var str_note_ipportchange  = "IP地址或者端口已经被改变，请重新连接！";
var str_note_rhportsame    = "http端口 和 rtsp端口使用相同的端口";
var str_note_inputdate     = "请输入日期";
var str_note_inputtime     = "请输入时间";
var str_note_routemode     = "(如果有无线路由器，请选择路由模式)";
var str_note_inputascii    = "请输入ASCII码字符(字符数是5 或者 13 )";
var str_note_inputascii2   = "请输入ASCII码字符(字符数是8 至 63 )";
var str_note_inputhex      = "请输入16进制数 (长度为 10 或者 26 )";
var str_note_inputssid     = "请输入SSID";
var str_note_inputkey      = "请输入密钥";
var str_note_inputrekey    = "请输入确认密钥";
var str_note_nosupportp2p  = "WPA/WPA2不支持点对点模式";
var str_note_turnoffmd     = "视频分辨率是320x176，移动检测被关闭";
var str_note_autoreboot    = "将自动重启网络摄像机";
var str_test_success       = "测试......成功。";
var str_test_fail          = "测试......失败。";



//错误提示
var str_err_invaildc   = "包含了无效字符";
var str_err_invaildc2  = "包含了无效字符。(&,=,\",\\\)";
var str_err_username   = "用户名错误";
var str_err_hostname   = "主机名错误";
var str_err_servname   = "服务器错误";
var str_err_password   = "密码错误";
var str_err_port       = "端口错误";
var str_err_userinfo   = "用户信息错误，请重新输入";
var str_err_servbusy   = "服务器忙，请稍候访问";
var str_err_addrcode   = "地址码超出范围";
var str_err_port       = "端口错误"
var str_err_servaddr   = "服务器地址错误";
var str_err_smptserv   = "SMTP服务器输入错误";
var str_err_emailaddr  = "无效的email地址";
var str_err_tooshort   = "长度不够";
var str_err_noat       = "没有包含@字符";
var str_err_addr1      = "发送到地址1错误";
var str_err_addr2      = "发送到地址2错误";
var str_err_addr3      = "发送到地址3错误";
var str_err_sendaddr   = "发件地址错误";
var str_err_subject    = "主题错误";
var str_err_info       = "信息错误";
var str_err_snapint    = "时间间隔范围为5秒至86400秒";
var str_err_recfile    = "时间范围为15秒至900秒";
var str_err_recfile1    = "时间范围为15秒至600秒";
var str_err_pwdconfirm = "确认密码输入错误。";
var str_err_framegap   = "主帧间隔超出范围（2-150），请重新设置";
var str_err_osdname    = "中文名称输入不能超过9个, 英文不能超过18个";
var str_err_noname     = "名称不能为空。";
var str_err_noblank    = "名称不能全为空格。";
var str_err_puid       = "PUID号输入错误";
var str_err_asp        = "接入服务器端口错误";
var str_err_asa        = "接入服务器地址错误";
var str_err_fsp        = "转发服务器端口错误";
var str_err_fsa        = "转发服务器地址错误";
var str_err_username   = "用户名错误";
var str_err_timeout    = "超时时间输入错误";
var str_err_tooutrange = "超时时间超出范围。";
var str_err_devnum     = "设备号错误";
var str_err_servaddr   = "服务器地址错误";
var str_err_input      = " 输入错误！\n\n";
var str_err_addrrange1 = "无效的地址,第一个数的";
var str_err_addrrange2 = "无效的地址,第二个数的";
var str_err_addrrange3 = "无效的地址,第三个数的";
var str_err_addrlast   = "无效的地址,最后一个数的"
var str_err_addr       = "无效的地址";
var str_err_value      = "无效值";
var str_err_pctime     = "您的PC时间不正确，请输入范围在 1970-01-01 至 2037-12-31";
var str_err_dateformat = "无效的日期格式";
var str_err_dfinput    = "应输入 yyyy-mm-dd";
var str_err_reinputd   = "日期无效，请重新输入 ";
var str_err_invaildtmf = "无效的时间格式";
var str_err_timeformat = "时间格式是 时：分：秒";
var str_err_imvaildtm  = "无效时间";
var str_err_key        = "密钥长度错误.16进制为10 或者 26; ASCII码为5 或者 13";
var str_err_ssid       = "SSID错误，请输入有效字符";
var str_err_rekey      = "确认密钥输入不正确";
var str_err_ssid       = "ssid 错误,包含了无效字符";
var str_err_ip2gateway = "ip地址和网关不在同一网段";
var str_err_volume     = "音量超出范围（1-100），请重新设置";   
var str_err_volume16     = "音量超出范围（1-16），请重新设置"; 
var str_err_volume13     = "音量超出范围（1-13），请重新设置";  
var str_err_username       ="用户名不能相同"; 
var str_err_nameerr        ="用户名只能包含字母和数字";
var str_err_nousername     ="用户名不能为空";      
var str_error_none         ="未知错误";
var str_error_server       ="无法连接服务器";
var str_error_namepwd      ="用户名或密码错误";
var str_error_dir          ="路径错误";
var str_error_ssl          ="ssl设置错误";


var str_bps32_2048 = "码率值超出范围（32-2048 kbps)，请重新设置";
var str_bps32_512  = "码率值超出范围（32-512 kbps)，请重新设置";
var str_bps32_256  = "码率值超出范围（32-256 kbps)，请重新设置";

//范围提示
var str_1_65535 = "范围1-65535";
var str_1_223_127 ="范围应是1到223且127为保留值";
var str_0_255   = "范围应是0到255";
var str_1_255   = "范围应是1到255";
var str_0_254   = "范围应是0到254";
var str_1_254   = "范围应是1到254"
var str_80or1024_49151 = "(80 或1024~49151)";
var str_554or1024_49151 = "(554 或1024~49151)";
var str_daterange  = "日期范围是 1971-01-01 至 2037-12-31, 请重新输入 ";
var str_drange  = "(1971-01-01 ~ 2036-12-31)";

//没有插件
var str_noins0 = "警告信息显示如下：";
var str_noins1 = "1. 您的电脑没有安装浏览视频控件。";
var str_noins2 = "2. 您已经安装控件但版本不是最新，请重新安装控件。";
var str_noins3 = "请点击";
var str_noins4 = "下载控件";
var str_noins5 = "然后点击";
var str_noins6 = "运行";
var str_noins7 = "安装控件，重新刷新网页，浏览视频。";

//常用字符串
var str_readonly  = "只读";
var str_rate      = "速度";
var str_auto      = "自动";
var str_view      = "监看";
var str_minute    = "分钟";
var str_stream    = "码流";
var str_1ststream = "第一码流";
var str_2ndstream = "第二码流";
var str_3thstream = "第三码流";
var str_on        = "开启";
var str_off       = "关闭";
var str_online    = "在线";
var str_offline   = "下线";
var str_sec       = "秒";
var str_language  = "Language:";
var str_ch        = "Chinese";
var str_en        = "English";
var str_add       = "加入";
var str_encrypt   = "加密方式";
var str_authen    = "认证";
var str_connetm   = "连接模式";
var str_channel   = "通道";
var str_confirm   = "确定"; 
var str_purview   ="权限"; 



//时区
var str_GMT1='国际日期变更线西12区';
var str_GMT2='中途岛，萨摩亚群岛';
var str_GMT3='夏威夷';
var str_GMT4='阿拉斯加';
var str_GMT5='太平洋时间（美国和加拿大）';
var str_GMT6='奇瓦瓦，拉巴斯，马萨特兰';
var str_GMT7='山地时间（美国和加拿大）';
var str_GMT8='亚利桑那';
var str_GMT9='萨斯喀彻温'
var str_GMT10='瓜达拉哈拉，墨西哥城，蒙特雷';
var str_GMT11='中部时间 (美国和加拿大)';
var str_GMT12='哥斯达黎加';
var str_GMT13='印第安纳州';
var str_GMT14='东部时间 (美国和加拿大)';
var str_GMT15='波哥大，利马，基多';
var str_GMT16='加拉加斯';
var str_GMT17='圣地亚哥';
var str_GMT18='大西洋时间 (加拿大)';
var str_GMT19='纽芬兰';
var str_GMT20='蒙得维的亚';
var str_GMT21='布宜诺斯艾利斯';
var str_GMT22='圣保罗';
var str_GMT23='中大西洋';
var str_GMT24='佛得角群岛';
var str_GMT25='亚速尔群岛';
var str_GMT26='格林威治标准时间：都柏林，伦敦，里斯本';
var str_GMT27='卡萨布兰卡';
var str_GMT28='阿姆斯特丹，巴黎，柏林，罗马，马德里，斯多哥尔摩';
var str_GMT29='贝尔格莱德，布拉迪斯拉发，布达佩斯，卢布尔雅那';
var str_GMT30='布鲁塞尔，哥本哈根，马德里，巴黎';
var str_GMT31='萨拉热窝，斯科普里，华沙，萨格勒布';
var str_GMT32='中非西部';
var str_GMT33='安曼';
var str_GMT34='雅典，布加勒斯特，伊斯坦布尔';
var str_GMT35='开罗';
var str_GMT36='哈拉雷，比勒陀利亚';
var str_GMT37='赫尔辛基，基辅，里加，索菲亚，塔林，维尔纽斯';
var str_GMT38='耶路撒冷';
var str_GMT39='巴格达';
var str_GMT40='科威特，利雅得';
var str_GMT41='莫斯科';
var str_GMT42='内罗毕';
var str_GMT43='德黑兰';
var str_GMT44='阿布扎比，马斯喀特';
var str_GMT45='巴库';
var str_GMT46='喀布尔';
var str_GMT47='叶卡捷琳堡';
var str_GMT48='伊斯兰堡，卡拉奇';
var str_GMT49='加尔各答，孟买，马德拉斯，新德里';
var str_GMT50='加德满都';
var str_GMT51='新西伯利亚';
var str_GMT52='达卡';
var str_GMT53='阿斯塔纳';
var str_GMT54='仰光';
var str_GMT55='曼谷，河内，雅加达';
var str_GMT56='克拉斯诺亚尔斯克';
var str_GMT57='北京，重庆，香港特别行政区，乌鲁木齐';
var str_GMT58='伊尔库兹克';
var str_GMT59='吉隆坡，新加坡';
var str_GMT60='珀斯';
var str_GMT61='台北';
var str_GMT62='大阪，札幌，东京';
var str_GMT63='首尔';
var str_GMT64='雅库兹克';
var str_GMT65='阿德莱德';
var str_GMT66='布里斯班';
var str_GMT67='堪培拉，墨尔本，悉尼';
var str_GMT68='关岛，莫尔兹比港';
var str_GMT69='霍巴特';
var str_GMT70='符拉迪沃斯托克';
var str_GMT71='马加达';
var str_GMT72='奥克兰，惠灵顿';
var str_GMT73='斐济';
var str_GMT74='努库阿洛法';


//询问字符串
var str_ask_sdfat32    = "SD卡将被格式化为FAT32文件系统？";
var str_ask_sdstop     = "SD卡将被停止？";
var str_ask_recoverbak = "系统设置将被恢复？";
var str_ask_syspath    = "请输入升级文件路径";
var str_ask_upgradesys = "系统将开始升级？";
var str_ask_reboot     = "系统将重新启动？";
var str_ask_recoverdef = "系统将恢复到出厂设置？";

// display
var str_adjustneff  = "（夜视效果调节）";
var str_nightmode   = "夜视模式";
var str_adjustnl    = "夜视照度调节";
var str_nlight      = "夜视照度";
var str_brightness  = "亮&nbsp;&nbsp;&nbsp;&nbsp;度";
var str_saturation  = "饱和度";
var str_contrast    = "对比度";
var str_sharpness   = "锐&nbsp;&nbsp;&nbsp;&nbsp;度";
var str_hue         = "色&nbsp;&nbsp;&nbsp;&nbsp;度";
var str_shutter     = "快&nbsp;&nbsp;&nbsp;&nbsp;门";
var str_ae          = "最小曝光";
var str_targety     = "曝光度";
var str_dnt         = "灵敏度";
var str_lumi        = "低照度";
var str_imageset    = "图像设置";
var str_updown      = "上下翻转";
var str_leftright   = "左右镜像";
var str_wdr	    = "宽动态";
var str_onmode      ="当前模式";
var str_mode        ="模式";
var str_black       ="黑白";
var str_color       ="彩色";
var str_aemode      ="曝光模式";
var str_auto        ="自动";
var str_indoor      ="室内";
var str_outdoor     ="室外";
var str_imgmode     ="图像优先模式";
var str_framerate1   ="帧率优先";
var str_inance      ="照度优先";
var str_ircut       ="IRCut切换临界值";
var str_ircutye     ="（1-1024，值越大，切换时间越晚）";
var str_sensitivity = "灵敏度";
var str_wdrmode     = "宽动态模式";
var str_window      = "窗口";
var str_safetype    = "安全类型";
var str_encway      = "加密方法"; 
var str_key         = "密钥";
var str_confirmkey  = "确认密钥";
var str_checkwl     = "检查无线设置";
var str_hwctrl      = "红外灯控制";
var str_noise       = "去噪强度";
var str_noisetye   = "（0-100，低照下起作用）";

// 无线
var str_wlenable    = "启用无线";
var str_conmode     = "连接模式";
var str_route       = "路由";
var str_p2p         = "点对点";

var str_welcome     = "请选择您要进行的操作：";
var str_pcview      = "电脑观看";
var str_mbview      = "手机观看";
var str_setupsoft   = "安装软件（初次使用）";

var str_sd          ="SD卡";
var str_snap        ="抓拍";
var str_record      ="录像";
var str_playback    ="回放";
var str_up          ="上";
var str_down        ="下";
var str_left       ="左";
var str_right        ="右";
var str_center        ="居中";
var str_ud          ="上下巡航";
var str_lr          ="左右巡航";
var str_preset       ="预置位";
var str_zoomin      ="拉近";
var str_zoomout     ="拉远";
var str_posset         ="设置";
var str_poscall        ="调用";
var str_refresh         ="刷新";
//gb28181
var str_err_svrport    ="服务器端口范围应是1到65535。";
var str_gb28181      ="GB28181设置";
var str_gb_gb28181   ="GB28181";
var str_svrid        ="服务器ID";
var str_svrip        ="服务器地址";
var str_svrport      ="服务器端口";
var str_devid        ="设备ID";
var str_devpwd       ="设备登陆密码";
var str_alarmid      ="报警ID";
//多路设置
var str_addport ='多路设置';
var str_addportset ='多路参数设置';
var str_local_host = "本机";
var str_refesh = "刷新";
var str_local_network = "局域网";
var str_first_dev = "第一路设备";
var str_second_dev = "第二路设备";
var str_third_dev = "第三路设备";
var str_fourth_dev = "第四路设备";
var str_fifth_dev = "第五路设备";
var str_sixth_dev = "第六路设备";
var str_seventh_dev = "第七路设备";
var str_eighth_dev = "第八路设备";
var str_ninth_dev = "第九路设备";
var str_add = "添加";
var str_remove = "删除";
var str_set = "设置";
var str_cancel= "取消";
var str_none = '无';
var str_overlay_name='叠加名称：';
var str_ip_address='IP地址：';
var str_http_port='HTTP端口：';
var str_user_name='用户名：';
var str_user_psw='密码：';
var str_anonymous = '';
var str_err_selected ="主机不存在，请重新选择！" 
var str_err_hostnum  ="请选择要操作的主机！"; 
