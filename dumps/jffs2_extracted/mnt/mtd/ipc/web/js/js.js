// JavaScript Document
/*
$(function(){

	var ifr = document.getElementById("iframeConfig");
	if (!ifr.oldsrc)
		ifr.oldsrc="";
	//focus left first list
	$("#left_monitoring").click(function(){
		$(this).addClass("left_focus");
		$("#left_settings").removeClass("left_focus");
		$(".left_settings").hide();
		$(".left_monitoring").show();
		$("#DHiMPlayer").show();
		$("#iframeConfig").hide();
		ifr.oldsrc = ifr.src;
		ifr.src = "";
	})
	$("#left_settings").click(function(){
		$(this).addClass("left_focus");
		$("#left_monitoring").removeClass("left_focus");
		$(".left_monitoring").hide();
		$(".left_settings").show();
		$("#DHiMPlayer").hide();
		$("#iframeConfig").show();
		ifr.src = ifr.oldsrc;
	})
	//focus left second list
	var list_a=$("#left2>ul>li>h4");
	var gvar={};
	gvar.click_row=list_a.eq(0);
	list_a.click(function(){
		if($(this).parent().hasClass("left_settings_focus")){
			$(this).parent().removeClass("left_settings_focus");
		}else{
			$(this).parent().addClass("left_settings_focus");
		}
		if(gvar.click_row && gvar.click_row.get(0)!=this){
			gvar.click_row.parent().removeClass("left_settings_focus");
		}
		gvar.click_row=$(this);		
	})
})

function set_iframe(src)
{
	var ifr = document.getElementById("iframeConfig");
	ifr.src = src;
}
*/
function newImage(arg) {
if (document.images) {
rslt = new Image();
rslt.src = arg;
return rslt;
}
}
function changeImages() {
if (document.images && (preloadFlag == true)) {
for (var i=0; i<changeImages.arguments.length; i+=2) {
document[changeImages.arguments[i]].src = changeImages.arguments[i+1];
}
}
}
var preloadFlag = false;
function preloadImages() {
if (document.images) {
index_08_Over = newImage("images/index_08-Over.gif");
index_09_Over = newImage("images/index_09-Over.gif");
index_11_Over = newImage("images/index_11-Over.gif");
index_12_Over = newImage("images/index_12-Over.gif");
index_13_Over = newImage("images/index_13-Over.gif");
index_39_Over = newImage("images/index_39-Over.gif");
index_39_Down = newImage("images/index_39-Down.gif");
preloadFlag = true;
}
}
// -->
function MM_findObj(n, d) { //v4.01
var p,i,x; if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
if(!x && d.getElementById) x=d.getElementById(n); return x;
}
//-->
var w;
var h;
var rtsp;

var img2345 = new Image();

function update()
{
	var imgObj;
	
	imgObj = document.getElementById('rimg12');
	
	imgObj.src = img2345.src;
	img2345.src = "/tmpfs/auto.jpg?" + (new Date()).getTime();
}

function takeError()
{
	img2345.src = "/tmpfs/auto.jpg?" + (new Date()).getTime();
}

function startonload()
{
	img2345.src = "/tmpfs/auto.jpg?" + (new Date()).getTime();
	img2345.onerror=takeError;
	img2345.onload=update;
}

function ptzout()
{
	MM_swapImgRestore();
//	ptzcmdSubmit('stop');
}

function load1()
{
var ip=document.location.host;
//var url="rtsp://"+ip;
var url = "http://"+ip;

if ((navigator.appVersion.indexOf("iPod")!=-1) || (navigator.appVersion.indexOf("iPhone")!=-1))
{
	data="<img src='/tmpfs/auto.jpg' id='rimg12'>";
	document.getElementById('mydisplay').innerHTML=data;
}
else
{
if (navigator.appName.indexOf("Microsoft Internet Explorer") != -1)
{
var streamnum = DHiMPlayer.GetStreamNum();

if (streamnum == 11)
{
	w=parseInt(width_1);
	h=parseInt(height_1);
	document.form1.streamselect[0].selected=true;
}
else
{
	w=parseInt(width_2);
	h=parseInt(height_2);
	document.form1.streamselect[1].selected=true;	
}
}
else
{
	w=parseInt(width_1);
	h=parseInt(height_1);
	rtsp=url+"/"+"iphone/11"+"?"+name0+":"+password0+"&";
	h=h+14;
	data='<embed src='+rtsp+' width='+w+' height='+h+' autoplay="true" controller="true" ShowStatusBar="false" type="video/quicktime"';
	data=data+' pluginspage="http://www.apple.com/quicktime/download/index.html"> </embed>';
	document.getElementById('mydisplay').innerHTML=data;
}
}

if ((navigator.appVersion.indexOf("iPod")!=-1) || (navigator.appVersion.indexOf("iPhone")!=-1))
{
	startonload();
}
else
{
if (navigator.appName.indexOf("Microsoft Internet Explorer") != -1) {
DHiMPlayer.SetUrl(url,80,streamnum,name0,password0);
DHiMPlayer.SetWndPos(0, 0, w, h);
DHiMPlayer.Play();
document.form1.sizeselect[3].selected=true;
}
//else
//{
//	startonload();
//}
}
//DHiMPlayer1.OpenMDSetPage(1);
// startflag=1;
}
function flush()
{
DHiMPlayer.InvalidateWnd();
MM_swapImage('Image100','','images/botton/capture.jpg',1);
}
function sizechange()
{
var form=document.form1;
if(form.sizeselect[0].selected==true)
{
if ((h == 576) || (h == 288) || (h == 144))
	DHiMPlayer.SetWndPos(0, 0, 704, 576);
else
	DHiMPlayer.SetWndPos(0, 0, 704, 480);
}
else if(form.sizeselect[1].selected==true)
{
if ((h == 576) || (h == 288) || (h == 144))
	DHiMPlayer.SetWndPos(0, 0, 352, 288);
else
	DHiMPlayer.SetWndPos(0, 0, 352, 240);	
}
else if(form.sizeselect[2].selected==true)
{
if ((h == 576) || (h == 288) || (h == 144))
	DHiMPlayer.SetWndPos(0, 0, 176, 144);
else
	DHiMPlayer.SetWndPos(0, 0, 176, 120);
}
else
{
DHiMPlayer.SetWndPos(0, 0, w, h);
}
}

function streamchange()
{
	var form=document.form1;

	if (form.streamselect[0].selected==true)
	{
		DHiMPlayer.SetStreamNum(11);
		location.reload();
	}
	else
	if (form.streamselect[1].selected==true)
	{
		DHiMPlayer.SetStreamNum(12);
		location.reload();
	}	
}

function snap()
{
DHiMPlayer.Snapshot();
}
function record()
{
DHiMPlayer.Record(0);
}
function playback()
{
DHiMPlayer.PlayBack();
}
function ptzcmdSubmit(casename)
{
	var speed1 = document.getElementById('speedslct').value;
	parent.retframe.location.href='cgi-bin/hi3510/ptzctrl.cgi?-step=0&-act=' + casename+'&-speed='+speed1;
}
function ptzctrlpresetSubmit(casenum)
{
	parent.retframe.location.href='cgi-bin/hi3510/preset.cgi?-act=goto&-number=' + casenum;
}
function ptzsetpresetSubmit(casenum)
{
	parent.retframe.location.href='cgi-bin/hi3510/preset.cgi?-act=set&-status=1&-number=' + casenum;
}
function MM_preloadImages() { //v3.0
var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}
function MM_swapImgRestore() { //v3.0
var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
function MM_swapImage() { //v3.0
var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
//-->