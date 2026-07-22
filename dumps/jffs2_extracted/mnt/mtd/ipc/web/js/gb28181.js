// JavaScript Document
function load_form_enable()
{
	var f1 = document.getElementById("form_enable1");
	var f0 = document.getElementById("form_enable0");

	if (gb_enable == "1")
		f1.checked = true;
	else
		f0.checked = true;
}

function change_form_enable()
{
	var f = document.getElementById("form_enable1");
	var i;
	
	if (f.checked == true)
	{
		for(i=0;i<=5;i++)
		{
       		document.getElementById('layer' + i).style.visibility = "visible";
   		}
	}
	else
	{
		for(i=0;i<=5;i++)
		{
       		document.getElementById('layer' + i).style.visibility = "hidden";
   		}
	}
}

function submit_form_enable()
{
	var f = document.getElementById("form_enable1");
	var s = document.getElementById("form_submit");
	
	if (f.checked == true)
		s.enable.value = 1;
	else
		s.enable.value = 0;
		
	
}

function load_form_svrid()
{
	var f = document.getElementById("form_svrid");
	
	f.value = gb_svrid;
}

function check_form_svrid()
{
	var f = document.getElementById("form_svrid");

	if(checkProhibitedCharacter2(f,f.value)==false)return false;
	
	return true;
       
}

function submit_form_svrid()
{
	var f = document.getElementById("form_svrid");
	var s = document.getElementById("form_submit");

	
       s.svrid.value = f.value;	
       
}


function load_form_svrip()
{
	var f = document.getElementById("form_svrip");

	f.value = gb_svrip;	
}

function check_form_svrip()
{
	var f = document.getElementById("form_svrip");

	if(checkProhibitedCharacter2(f,f.value)==false)return false;
	
	return true;
       
}
function submit_form_svrip()
{
	var f = document.getElementById("form_svrip");
	var s = document.getElementById("form_submit");
	
	s.svrip.value = f.value;
	
}


function load_form_svrport()
{
	var f = document.getElementById("form_svrport");

	f.value = gb_svrport;	
}

function check_form_svrport()
{
      var f = document.getElementById("form_svrport");
	
	if ((f.value < 1) || (f.value > 65535))
	{
		alert(str_err_svrport);
		f.select();
		return false;
	}

	return true;
}


function submit_form_svrport()
{
	var f = document.getElementById("form_svrport");
	var s = document.getElementById("form_submit");
	
	s.svrport.value = f.value;
	
}


function load_form_devid()
{
	var f = document.getElementById("form_devid");

	f.value = gb_devid;	
}

function check_form_devid()
{
	var f = document.getElementById("form_devid");

	if(checkProhibitedCharacter2(f,f.value)==false)return false;
	
	return true;
       
}
function submit_form_devid()
{
	var f = document.getElementById("form_devid");
	var s = document.getElementById("form_submit");
	
	s.devid.value = f.value;
	
}


function load_form_devpwd()
{
	var f = document.getElementById("form_devpwd");

	f.value = gb_devpwd;	
}

function check_form_devpwd()
{
	var f = document.getElementById("form_devpwd");

	if(checkProhibitedCharacter2(f,f.value)==false)return false;
	
	return true;
       
}

function submit_form_devpwd()
{
	var f = document.getElementById("form_devpwd");
	var s = document.getElementById("form_submit");
	
	s.devpwd.value = f.value;
	
}

function load_form_alarmid()
{
	var f = document.getElementById("form_alarmid");

	f.value = gb_alarmid;	
}

function check_form_alarmid()
{
	var f = document.getElementById("form_alarmid");

	if(checkProhibitedCharacter2(f,f.value)==false)return false;
	
	return true;
       
}

function submit_form_alarmid()
{
	var f = document.getElementById("form_alarmid");
	var s = document.getElementById("form_submit");
	
	s.alarmid.value = f.value;
	
}