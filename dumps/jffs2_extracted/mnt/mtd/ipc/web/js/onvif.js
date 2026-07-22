// JavaScript Document
function load_form_enable()
{
	var f1 = document.getElementById("form_enable1");
	var f0 = document.getElementById("form_enable0");
	
	if (ov_enable == "1")
		f1.checked = true;
	else
		f0.checked = true;
}

function change_form_enable()
{
	var f = document.getElementById("form_enable1");
	var i;
	
	if(f.checked == true)
	{
		for (i = 0; i <= 4; i++)
		{
       		document.getElementById('layer' + i).style.visibility = "visible";
   		}
	}
	else
	{
		for (i = 0; i <= 4; i++)
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

function load_form_port()
{
	var f = document.getElementById("form_port");
	
	f.value = ov_port;	
}

function check_form_port()
{
	var f = document.getElementById("form_port");
	
	if (f.value == "")
	{
		alert(str_note_inputport);
		f.select();
		return false;
	}
	
	var j;
	var portvalue = f.value;
	
	for (j = 0; j < (portvalue.length); j++)
	{
		var ch = portvalue.substring(j, j + 1);
		if ("0" > ch || ch > "9") 
		{
			alert(str_err_invaildc + period);
			f.select();
			return false;
		}
	}

	if ((f.value < 1 ) || (f.value > 65535))
	{
		alert(str_err_port + comma + str_1_65535);
		f.select();
		return false;
	}
	
	return true;
}

function submit_form_port()
{
	var f = document.getElementById("form_port");
	var s = document.getElementById("form_submit");

	s.port.value = f.value;	
	
}

function load_form_authflag()
{
	var f1 = document.getElementById("form_authflag1");
	var f0 = document.getElementById("form_authflag0");
	if (ov_authflag == "1")
		f1.checked = true;
	else
		f0.checked = true;
}
function submit_form_authflag()
{
	var f = document.getElementById("form_authflag1");
	var s = document.getElementById("form_submit");
	
	if (f.checked == true)
		s.authflag.value = 1;
	else
		s.authflag.value = 0;
		
	
}


function load_form_forbitset()
{	
	var f1 = document.getElementById("form_timecheck1");
	var f0 = document.getElementById("form_timecheck0");
    var s1 = document.getElementById("form_videocheck1");
	var s0 = document.getElementById("form_videocheck0");

	if(ov_forbitset & 0x1)
	{f1.checked = true;}
	else
	{f0.checked = true;}
    if(ov_forbitset & 0x2)
	{s1.checked = true;}
	else
	{s0.checked = true;}

}

function submit_form_forbitset()
{
	var f1 = document.getElementById("form_timecheck1");
	var f0 = document.getElementById("form_timecheck0");
    var s1 = document.getElementById("form_videocheck1");
	var s0 = document.getElementById("form_videocheck0");
    var s = document.getElementById("form_submit");
	var str=0;
	if(f1.checked == true)
    {str=(str |= 0x1);}
    if(s1.checked == true)
    {s.forbitset.value = (str |= 0x2);}
    else
     {s.forbitset.value = str;}

		
}


function load_form_onvifchn()
{
        var f = document.getElementById("form_onvifchn");
	
	if (ov_subchn == "12")
	{
		f.options[0].selected = true;
	}
        else
	{
		f.options[1].selected = true;
	}
}

function submit_form_onvifchn()
{
    var f = document.getElementById("form_onvifchn");
	var s = document.getElementById("form_submit");
    s.subchn.value = f.value;
	
}


function load_form_onvifsnap()
{
        var f = document.getElementById("form_onvifsnap");
	
	if (ov_snapchn == "11")
	{
		f.options[0].selected = true;
	}
        else if (ov_snapchn == "12")
	{
		f.options[1].selected = true;
	}
        else
	{
		f.options[2].selected = true;
	}
}

function submit_form_onvifsnap()
{
    var f = document.getElementById("form_onvifsnap");
	var s = document.getElementById("form_submit");
    s.snapchn.value = f.value;
	
}

function load_form_onvifnvctype()
{
  var f = document.getElementById("form_onvifnvctype");
	
	if (ov_nvctype == "1")
	{
		f.options[1].selected = true;
	}
  else
	{
		f.options[0].selected = true;
	}
}

function submit_form_onvifnvctype()
{
    var f = document.getElementById("form_onvifnvctype");
	  var s = document.getElementById("form_submit");
    s.nvctype.value = f.value;
}