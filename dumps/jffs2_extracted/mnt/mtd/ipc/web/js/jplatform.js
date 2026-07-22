// JavaScript Document
function load_form_enable()
{
	var f1 = document.getElementById("form_enable1");
	var f0 = document.getElementById("form_enable0");

	if (enable == "1")
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

function load_form_devid()
{
	var f = document.getElementById("form_devid");
	
	f.value = devid;
}

function check_form_devid()
{
	var f = document.getElementById("form_devid");

	/*if (f.value != "")
	{
		if (checkHankakuNoKana(f.value, f, str_err_puid + comma + str_err_invaildc) == false)
			return false;	
		if (checkProhibitedCharacter(f.value) == false)
			return false;
	}*/
	if(checkProhibitedCharacter2(f,f.value)==false)return false;
	
	return true;
}

function submit_form_devid()
{
	var f = document.getElementById("form_devid");
	var s = document.getElementById("form_submit");

	if (f.value == "")
		s.devid.value = 0;
	else
		s.devid.value = f.value;	

	
}

function load_form_jport()
{
	var f = document.getElementById("form_jport");
	
	f.value = jport;
}

function check_form_jport()
{
	var f = document.getElementById("form_jport");

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

function submit_form_jport()
{
	var f = document.getElementById("form_jport");
	var s = document.getElementById("form_submit");
	
	s.jport.value = f.value;
	
}

function load_form_jserver()
{
	var f = document.getElementById("form_jserver");
	
	f.value = jserver;	
}

function check_form_jserver()
{
	var f = document.getElementById("form_jserver");
	
/*	if (f.value == "")
	{
		alert(str_note_inputasa);
		f.focus();
		return false;
	}									
	if (checkProhibitedCharacterUser(f.value) == false)
	{
		f.focus();
		return false;
	}
	if (checkHankakuNoKana(f.value, f, str_err_asa + comma + str_err_invaildc) == false)
	{
		f.focus();
		return false;
	}*/
	if(checkProhibitedCharacter2(f,f.value)==false)return false;
	
	return true;
}

function submit_form_jserver()
{
	var f = document.getElementById("form_jserver");
	var s = document.getElementById("form_submit");
	
	s.jserver.value = f.value;	
	
}

function load_form_zport()
{
	var f = document.getElementById("form_zport");

	f.value = zport;
}

function check_form_zport()
{
	var f = document.getElementById("form_zport");
	
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


function submit_form_zport()
{
	var f = document.getElementById("form_zport");
	var s = document.getElementById("form_submit");

	s.zport.value = f.value;
	
}

function load_form_zserver()
{
	var f = document.getElementById("form_zserver");

	f.value = zserver;
}

function check_form_zserver()
{
	var f = document.getElementById("form_zserver");
	
/*	if (f.value == "")
	{
		alert(str_note_inputfsa);
		f.focus();
		return false;
	}									
	if(checkProhibitedCharacterUser(f.value) == false )
	{
		f.focus();
		return false;
	}
	if(checkHankakuNoKana(f.value, f, str_err_fsa + comma + str_err_invaildc) == false)
	{
		f.focus();
		return false;
	}*/
	if(checkProhibitedCharacter2(f,f.value)==false)return false;

	return true;
}

function submit_form_zserver()
{
	var f = document.getElementById("form_zserver");
	var s = document.getElementById("form_submit");
	
	s.zserver.value = f.value;		
	
}

function load_form_jinterval()
{
	var f = document.getElementById("form_jinterval");
	
	f.value = jinterval;
}

function check_form_jinterval()
{
	var f = document.getElementById("form_jinterval");
	
	if (f.value == "")
	{
		alert(str_note_inputgpsi);
		f.focus();
		return false;
	}	
	
	if (f.value < 1000 )
	{
		alert(str_err_imvaildtm);
		f.select();
		return false;
	}

	return true;
}

function submit_form_jinterval()
{
	var f = document.getElementById("form_jinterval");
	var s = document.getElementById("form_submit");
	
	s.jinterval.value = f.value;
		
}