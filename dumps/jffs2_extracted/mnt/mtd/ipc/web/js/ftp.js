// FTP服务器地址
function load_form_ftserver()
{
	var f = document.getElementById("form_ftserver");
	
	f.value = ft_server;
}

function check_form_ftserver()
{
	var f = document.getElementById("form_ftserver");

	/*if (f.value == "")
	{
		alert(str_note_inputservaddr);
		f.select();
		return false;
	}
	
	if (checkProhibitedCharacterUser(f.value) == false)
	{
		f.select();
		return false;
	}
	
	if (checkHankakuNoKana(f.value, f, str_err_servaddr + comma + str_err_invaildc) == false)
	{
		return false;
	}*/
	if(checkProhibitedCharacter2(f,f.value)==false)return false;

	return true;
}

function submit_form_ftserver()
{
	var f = document.getElementById("form_ftserver");
	var s = document.getElementById("form_submit");
	
	s.ft_server.value = f.value;
	s.ft_server.name  = "-ft_server";
}

// FTP 端口
function load_form_ftport()
{
	var f = document.getElementById("form_ftport");

	f.value = ft_port;
}

function check_form_ftport()
{
	var f = document.getElementById("form_ftport");
	
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

function submit_form_ftport()
{
	var f = document.getElementById("form_ftport");
	var s = document.getElementById("form_submit");
	
	s.ft_port.value = f.value;
	s.ft_port.name  = "-ft_port";
}

// FTP 用户名
function load_form_ftusername()
{
	var f = document.getElementById("form_ftusername");
	
	f.value = ft_username;
}

function check_form_ftusername()
{
	var f = document.getElementById("form_ftusername");
	
/*	if (f.value == "")
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
	
	if (checkHankakuNoKana(f.value, f, str_err_username + comma + str_err_invaildc) == false)
	{
		return false;
	}*/
	if(checkProhibitedCharacter2(f,f.value)==false)return false;

	return true;
}

function submit_form_ftusername()
{
	var f = document.getElementById("form_ftusername");
	var s = document.getElementById("form_submit");
	
	s.ft_username.value = f.value;
	s.ft_username.name  = "-ft_username";
}

// FTP 密码
function load_form_ftpassword()
{
	var f = document.getElementById("form_ftpassword");
	
	f.value = ft_password;
}

function check_form_ftpassword()
{
	var f = document.getElementById("form_ftpassword");
	
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

function submit_form_ftpassword()
{
	var f = document.getElementById("form_ftpassword");
	var s = document.getElementById("form_submit");
	
	s.ft_password.value = f.value;
	s.ft_password.name  = "-ft_password";
}

// FTP 模式
function load_form_ftmode()
{
	var f1 = document.getElementById("form_ftmode1");
	var f0 = document.getElementById("form_ftmode0");
	
	if (ft_mode == 1)
	{
		f1.checked = true;
	}
	else
	{
		f0.checked = true;
	}
}

function submit_form_ftmode()
{
	var f = document.getElementById("form_ftmode1");
	var s = document.getElementById("form_submit");
	
	if (f.checked == true)
	{
		s.ft_mode.value = 1;
	}
	else
	{
		s.ft_mode.value = 0;
	}
	
	s.ft_mode.name = "-ft_mode";
}
//FTP路径
function load_form_ftpath()
{
	var f = document.getElementById("form_ftpath");
	
	f.value = ft_dirname;
}

function check_form_ftpath()
{
	var f = document.getElementById("form_ftpath");

	/*if (f.value == "")
	{
		alert(str_note_inputpath);
		f.select();
		return false;
	}*/
	if(checkProhibitedCharacter4(f,f.value)==false)return false;

	return true;
}

function submit_form_ftpath()
{
	var f = document.getElementById("form_ftpath");
	var s = document.getElementById("form_submit");
	
	s.ft_dirname.value = f.value;
	s.ft_dirname.name  = "-ft_dirname";
}

function load_form_autocreatedir()
{
	var f1 = document.getElementById("form_autocreatedir1");
	var f0 = document.getElementById("form_autocreatedir0");
	
	if (ft_autocreatedir == 1)
	{
		f1.checked = true;
	}
	else
	{
		f0.checked = true;
	}
}

function submit_form_autocreatedir()
{
	var f = document.getElementById("form_autocreatedir1");
	var s = document.getElementById("form_submit");
	
	if (f.checked == true)
	{
		s.ft_autocreatedir.value = 1;
	}
	else
	{
		s.ft_autocreatedir.value = 0;
	}
	
	s.ft_autocreatedir.name = "-ft_autocreatedir";
}
