var initLength = 1;
var speed = 2;
var intval = 1000;
var maxLength = 1000;
var maxTimes = 0;
var maxMilliSeconds = 250000;
var intID;
var currentLength = initLength;
var currentTimes = 0;
var currentMilliSeconds = 0;
	
function addMore() 
{
	currentLength += speed;
	currentTimes ++;
	currentMilliSeconds += intval;
	
	if (maxLength > 0 && currentLength > maxLength)
		currentLength = initLength;
	document.getElementById("tb").width  = currentLength;
	if (maxTimes > 0 && currentTimes>= maxTimes )
		stopIt();
	if (maxMilliSeconds > 0 && currentMilliSeconds > maxMilliSeconds ) 
		stopIt();
}

function startIt() 
{		
	document.getElementById("upgrdwait").style.display = "block";
	document.getElementById("upgrdinfo").style.display = "block";
	document.getElementById("content").style.display = "none";
	 
	intID = window.setInterval(addMore, intval);
}

function stopIt() 
{
	window.clearInterval(intID);
	alert(str_note_upgradeok);
	window.location="http://"+window.location.host;
}


function do_reboot() 
{
	var s = document.getElementById("form_submit1");

    if (confirm(str_ask_reboot) == true) 
	{
        s.action= "cgi-bin/hi3510/param.cgi";
        s.submit();
    }
    else
	{
        return false;
    }
}

function do_reset()
{
	var s = document.getElementById("form_submit2");

    if (confirm(str_ask_recoverdef) == true)
	{
        s.action = "cgi-bin/hi3510/param.cgi";
        s.submit();
    }
    else 
	{
        return false;
    }
}

function do_savetofile() 
{
    parent.retframe.location.href = "cgi-bin/hi3510/backup.cgi";
}

function do_upload() 
{
	var f = document.getElementById("form_bakfile");

	if (f.value == "") 
	{
	    alert(str_note_inputpath);
	    return false;
	}
	if (confirm(str_ask_recoverbak) == true) 
	{
	    return true;
	}
	else 
	{
	    return false;
	}
}

function do_upgrade() 
{
	var f = document.getElementById("form_sysfile");
	var s = document.getElementById("form_upgrade");

	var filename;

	if (f.value == "") 
	{
	    alert(str_ask_syspath);
	    return false;
	}

	filename = f.value;
	filename = filename.substr(filename.lastIndexOf('\\') + 1);

	if (confirm(str_ask_upgradesys) == true) 
	{
	    s.action = "cgi-bin/hi3510/upgrade.cgi?-filename=" + filename;
	    setTimeout("startIt()", 500);
	    return true;
	}
	else 
	{
	    return false;
	}
}

function load_form_language()
{
	var f = document.getElementById("form_language");
	
	f.selectedIndex = lancode;
}

function submit_form_language()
{
	var f = document.getElementById("form_language");
	var s = document.getElementById("form_submitlng");
	
	s.lancode.value = f.selectedIndex;
	s.lancode.name  = "-lancode";
	
	s.cururl.value = document.URL;
	
	s.action = "cgi-bin/hi3510/param.cgi";
        s.submit();
	

}

