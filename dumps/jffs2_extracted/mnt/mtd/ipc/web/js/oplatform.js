// JavaScript Document
function load_form_openable()
{
	var f1 = document.getElementById("form_openable1");
	var f0 = document.getElementById("form_openable0");
	
	if (op_enable == "1")
		f1.checked = true;
	else
		f0.checked = true;
}

function change_form_openable()
{
	var f = document.getElementById("form_openable1");
	var i;
	
	if(f.checked == true)
	{
		for (i = 0; i <= 5; i++)
		{
       		document.getElementById('layer' + i).style.visibility = "visible";
   		}
	}
	else
	{
		for (i = 0; i <= 5; i++)
		{
       		document.getElementById('layer' + i).style.visibility = "hidden";
   		}
	}
}

function submit_form_openable()
{
	var f = document.getElementById("form_openable1");
	var s = document.getElementById("form_submit");
	
	if (f.checked == true)
		s.op_enable.value = 1;
	else
		s.op_enable.value = 0;
		
	
}

function load_form_opuname()
{
	var f = document.getElementById("form_opuname");
	
	f.value = op_uname;
}

function check_form_opuname()
{
	var f = document.getElementById("form_opuname");

	/*if (f.value == "")
	{
		alert(str_note_inputusername);
		return false;
	}
	else
	{
		if (checkHankakuNoKana(f.value, f, str_err_username + comma + str_err_invaildc) == false)
			return false;
		if (checkProhibitedCharacter(f.value) == false)
			return false;	
	}*/
	if(checkProhibitedCharacter2(f,f.value)==false)return false;
	
	return true;
}

function submit_form_opuname()
{
	var f = document.getElementById("form_opuname");
	var s = document.getElementById("form_submit");

	s.op_uname.value = f.value;	
	
}

function load_form_oppasswd()
{
	var f = document.getElementById("form_oppasswd");

	f.value = op_passwd;
}

function check_form_oppasswd()
{
	var f = document.getElementById("form_oppasswd");

	/*if (f.value == "")
	{
		alert(str_note_inputpassword);
		return false;
	}
	else
	{
		if (checkHankakuNoKana(f.value, f, str_err_password + comma + str_err_invaildc) == false)
			return false;
		if (checkProhibitedCharacter(f.value) == false)
			return false;	
	}*/
	if(checkProhibitedCharacter2(f,f.value)==false)return false;
	
	return true;
}

function submit_form_oppasswd()
{
	var f = document.getElementById("form_oppasswd");
	var s = document.getElementById("form_submit");
	
	s.op_passwd.value = f.value;
	
}

function load_form_opport()
{
	var f = document.getElementById("form_opport");
	
	f.value = op_port;	
}

function check_form_opport()
{
	var f = document.getElementById("form_opport");
	
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

function submit_form_opport()
{
	var f = document.getElementById("form_opport");
	var s = document.getElementById("form_submit");

	s.op_port.value = f.value;	
	
}

function load_form_opserver()
{
	var f = document.getElementById("form_opserver");

	f.value = op_server;
}

function check_form_opserver()
{
	var f = document.getElementById("form_opserver");

/*	if (f.value == "")
	{
		alert(str_note_inputservaddr);
		f.focus();
		return false;
	}									
	else
	{
		if (checkProhibitedCharacterUser(f.value) == false)
		{
			f.focus();
			return false;
		}
		
		if (checkHankakuNoKana(f.value, f, str_err_servaddr + comma + str_err_invaildc)==false)
		{
			f.focus();
			return false;
		}
			
	}*/
	if(checkProhibitedCharacter2(f,f.value)==false)return false;

	return true;
}

function submit_form_opserver()
{
	var f = document.getElementById("form_opserver");
	var s = document.getElementById("form_submit");
	
	s.op_server.value = f.value;
	
}

function load_form_optimeout()
{
	var f = document.getElementById("form_optimeout");
	
	f.value = op_timeout;
}

function check_form_optimeout()
{
	var f = document.getElementById("form_optimeout");
	
/*	if (f.value == "")
	{
		alert(str_note_inputtimeout);
		f.focus();
		return false;
	}
	else
	{
		if (checkHankakuNoKana(f.value, f, str_err_timeout + comma + str_err_invaildc) == false)
			return false;
		if (checkProhibitedCharacter(f.value) == false)
			return false;	
		if ((f.value < 1) || (f.value > 600))
		{
			alert(str_err_tooutrange);
			f.focus();
			return false;			
		}		
	}	*/
		
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
        if ((f.value < 1) || (f.value > 600))
		{
			alert(str_err_tooutrange);
			f.focus();
			return false;			
		}	
		
		
	return true;
}

function submit_form_optimeout()
{
	var f = document.getElementById("form_optimeout");
	var s = document.getElementById("form_submit");

	s.op_timeout.value = f.value;	
	
}

function load_form_opstate()
{
	var f = document.getElementById("form_opstate");
	
	if (op_state == "1")		
		f.value = str_online;
	else
		f.value = str_offline;
}
