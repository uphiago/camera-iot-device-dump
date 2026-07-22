// JavaScript Document
function getwebip()
{
	window.open("interip.html", str_internetip, "height=120,width=350,top=200,left=300,toolbar=no,menubar=no,scrollbars=no,location=no,status=no");
}

function load_form_ourenable()
{
	var f1 = document.getElementById("form_ourenable1");
	var f0 = document.getElementById("form_ourenable0");

	if (our_enable == "1")
		f1.checked = true;
	else
		f0.checked = true;
}

function change_form_ourenable()
{
	var f = document.getElementById("form_ourenable1");

	var i;
	
	if (f.checked == true)
	{
		for (i = 6; i <= 10; i++)
		{
			document.getElementById('layer' + i).style.visibility = "visible";
		}
	}
	else
	{
		for (i = 6; i <= 10; i++)
		{
			document.getElementById('layer' + i).style.visibility = "hidden";
		}
	}
}

function submit_form_ourenable()
{
	var f = document.getElementById("form_ourenable1");
	var s = document.getElementById("form_submit");
	
	if (f.checked == true)
		s.our_enable.value = 1;
	else
		s.our_enable.value = 0;

	s.our_enable.name = "-our_enable";
}

function load_form_ourserver()
{
	var f = document.getElementById("form_ourserver");

	f.value = our_server;	
}

function check_form_ourserver()
{
	var f = document.getElementById("form_ourserver");
	
	if (f.value == "")
	{
		alert(str_note_inputhostname);
		f.select();
		return false;
	}
	
	if (checkProhibitedCharacterUser(f.value) == false)
	{
		f.select();
		return false;
	}
	
	if (checkHankakuNoKana(f.value, f, str_err_servname + comma + str_err_invaildc + period) == false)
	{
		f.select();
		return false;
	}			

	return true;
}

function submit_form_ourserver()
{
	var f = document.getElementById("form_ourserver");
	var s = document.getElementById("form_submit");
	
	s.our_server.value = f.value;	
	s.our_server.name  = "-our_server";	
}

function load_form_ourport()
{
	var f = document.getElementById("form_ourport");
	
	f.value = our_port;
}


function submit_form_ourport()
{
	var f = document.getElementById("form_ourport");
	var s = document.getElementById("form_submit");

	s.our_port.value = f.value;
	s.our_port.name  = "-our_port";	
}

function load_form_ouruname()
{
	var f = document.getElementById("form_ouruname");
	
	f.value = our_uname;
}

function check_form_ouruname()
{
	var f = document.getElementById("form_ouruname");

	/*if (f.value == "")
	{
		alert(str_note_inputusername);
		f.select();
		return false;
	}
	
	if (checkProhibitedCharacterUser(f.value) == false)
	{
		f.select();
		return false;
	}
	
	if (checkHankakuNoKana(f.value, f, str_err_username + comma + str_err_invaildc + period) == false)
	{
		return false;
	}*/
	if(checkProhibitedCharacter2(f,f.value)==false)return false;
	
	return true;
}

function submit_form_ouruname()
{
	var f = document.getElementById("form_ouruname");
	var s = document.getElementById("form_submit");
	
	s.our_uname.value = f.value;
	s.our_uname.name  = "-our_uname";
}

function load_form_ourpasswd()
{
	var f = document.getElementById("form_ourpasswd");
	
	f.value = our_passwd;
}

function check_form_ourpasswd()
{
	var f = document.getElementById("form_ourpasswd");
	
	/*if (f.value == "")
	{
		alert(str_note_inputpassword);
		f.select();
		return false;
	}
	if (checkProhibitedCharacter(f.value) == false)
	{
		f.select();
		return false;
	}*/
	if(checkProhibitedCharacter2(f,f.value)==false)return false;

	return true;
}

function submit_form_ourpasswd()
{
	var f = document.getElementById("form_ourpasswd");
	var s = document.getElementById("form_submit");

	s.our_passwd.value = f.value;
	s.our_passwd.name  = "-our_passwd";
}

function load_form_ourdomain()
{
	var f = document.getElementById("form_ourdomain");
	
	f.value = our_domain;
}

function submit_form_ourdomain()
{
	var f = document.getElementById("form_ourdomain");
	var s = document.getElementById("form_submit");

	s.our_domain.value = f.value;
	s.our_domain.name  = "-our_domain";
}

function load_form_d3thenable()
{
	var f1 = document.getElementById("form_d3thenable1");
	var f0 = document.getElementById("form_d3thenable0");

	if (d3th_enable == "1")
	{
		f1.checked = true;
	}
	else
	{
		f0.checked = true;
	}
}

function change_form_d3thenable()
{
	var f = document.getElementById("form_d3thenable1");
	
	var i;
	if (f.checked == true)
	{
		for (i = 0; i <= 3; i++)
		{
			document.getElementById('layer' + i).style.visibility = "visible";
		}
	}
	else
	{
		for (i = 0; i <= 3; i++)
		{
			document.getElementById('layer' + i).style.visibility = "hidden";
		}
	}		
}

function submit_form_d3thenable()
{
	var f = document.getElementById("form_d3thenable1");
	var s = document.getElementById("form_submit");
	
	if (f.checked == true)
	{
		s.d3th_enable.value = 1;
	}
	else
	{
		s.d3th_enable.value = 0;
	}

	s.d3th_enable.name = "-d3th_enable";
}

function load_form_d3thservice()
{
	var f = document.getElementById("form_d3thservice");
	
	if (d3th_service == "0")
	{
		f.options[0].selected = true;
	}
 	else if (d3th_service == "1")
	{
		f.options[1].selected = true;
	}
 	else if (d3th_service == "2")
 	{
		f.options[2].selected = true;
	}
        else if (d3th_service == "3")
 	{
		f.options[3].selected = true;
	}		

}

function submit_form_d3thservice()
{
	var f = document.getElementById("form_d3thservice");
	var s = document.getElementById("form_submit");
	
	s.d3th_service.value = f.value;
  	s.d3th_service.name  = "-d3th_service";
}

function load_form_d3thuname()
{
	var f = document.getElementById("form_d3thuname");

	f.value = d3th_uname;
}

function check_form_d3thuname()
{
	var f = document.getElementById("form_d3thuname");

/*	if (f.value == "")
	{
		alert(str_note_inputusername);
		f.select();
		return false;
	}
	
	if (checkProhibitedCharacterUser(f.value) == false )
	{
		f.select();
		return false;
	}
	if (checkHankakuNoKana(f.value, f, str_err_username + comma + str_err_invaildc + period) == false)
	{
		return false;
	}*/
	if(checkProhibitedCharacter2(f,f.value)==false)return false;

	return true;
}

function submit_form_d3thuname()
{
	var f = document.getElementById("form_d3thuname");
	var s = document.getElementById("form_submit");
	
	s.d3th_uname.value = f.value;
	s.d3th_uname.name  = "-d3th_uname";
}

function load_form_d3thpasswd()
{
	var f = document.getElementById("form_d3thpasswd");

	f.value = d3th_passwd;
}

function check_form_d3thpasswd()
{
	var f = document.getElementById("form_d3thpasswd");

/*	if (f.value == "")
	{
		alert(str_note_inputpassword);
		f.select();
		return false;
	}
	
	if (checkProhibitedCharacter(f.value) == false)
	{
		f.select();
		return false;
	}*/
	if(checkProhibitedCharacter2(f,f.value)==false)return false;
	
	return true;
}

function submit_form_d3thpasswd()
{
	var f = document.getElementById("form_d3thpasswd");
	var s = document.getElementById("form_submit");
	
	s.d3th_passwd.value = f.value;
	s.d3th_passwd.name  = "-d3th_passwd";
}

function load_form_d3thdomain()
{
	var f = document.getElementById("form_d3thdomain");
	
	f.value = d3th_domain;
}

function check_form_d3thdomain()
{
	var f = document.getElementById("form_d3thdomain");
	
	/*if (f.value == "")
	{
		alert(str_note_inputhostname);
		f.select();
		return false;
	}
	if (checkProhibitedCharacterUser(f.value) == false)
	{
		f.select();
		return false;
	}	
	if (checkHankakuNoKana(f.value, f, str_err_hostname + comma + str_err_invaildc + period) == false)
	{
		return false;
	} */
	if(checkProhibitedCharacter2(f,f.value)==false)return false;
	
	return true;
}

function submit_form_d3thdomain()
{
	var f = document.getElementById("form_d3thdomain");
	var s = document.getElementById("form_submit");

	s.d3th_domain.value = f.value;
	s.d3th_domain.name  = "-d3th_domain";
}

function load_form_upmenable()
{
	var f1 = document.getElementById("form_upmenable1");
	var f0 = document.getElementById("form_upmenable0");

	if (upm_enable == "1")
	{
		f1.checked = true;
	}
	else
	{
		f0.checked = true;
	}
}

function submit_form_upmenable()
{
	var f = document.getElementById("form_upmenable1");
	var s = document.getElementById("form_submit");
	
	if (f.checked == true)
	{
		s.upm_enable.value = "1";
	}
	else
	{
		s.upm_enable.value = "0";
	}
	
	s.upm_enable.name = "-upm_enable";
}