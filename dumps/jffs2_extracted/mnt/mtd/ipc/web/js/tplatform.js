// JavaScript Document
function load_form_enable()
{
	var f1 = document.getElementById("form_enable1");
	var f0 = document.getElementById("form_enable0");

	if (p2p_enable == "1")
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
		for(i=0;i<=4;i++)
		{
       		document.getElementById('layer' + i).style.visibility = "visible";
   		}
	}
	else
	{
		for(i=0;i<=4;i++)
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

function load_form_uid()
{
	var f = document.getElementById("form_uid");
	
	f.value = p2p_uid;
}

function check_form_uid()
{
	var f = document.getElementById("form_uid");

	if(checkProhibitedCharacter2(f,f.value)==false)return false;
	
	return true;
}


function submit_form_uid()
{
	var f = document.getElementById("form_uid");
	var s = document.getElementById("form_submit");

	
       s.uid.value = f.value;	
       
}


function load_form_server1()
{
	var f = document.getElementById("form_server1");

	f.value = p2p_server1;	
}

function check_form_server1()
{
	var f = document.getElementById("form_server1");

	/*if (f.value == "")
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
		
		if (checkHankakuNoKana(f.value, f, str_err_servaddr + comma + str_err_invaildc) == false)
		{
			return false;
		}
	
		ValidIp(f, str_serveraddr);
	}
	
	if (errfound)
	{
		return false;
	}	*/
	if(checkProhibitedCharacter2(f,f.value)==false)return false;
	
	return true;
}

function submit_form_server1()
{
	var f = document.getElementById("form_server1");
	var s = document.getElementById("form_submit");
	
	s.server1.value = f.value;
	
}



function load_form_server2()
{
	var f = document.getElementById("form_server2");

	f.value = p2p_server2;	
}

function check_form_server2()
{
	var f = document.getElementById("form_server2");

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
		
		if (checkHankakuNoKana(f.value, f, str_err_servaddr + comma + str_err_invaildc) == false)
		{
			return false;
		}
	
		ValidIp(f, str_serveraddr);
	}
	
	if (errfound)
	{
		return false;
	}	*/
	if(checkProhibitedCharacter2(f,f.value)==false)return false;
	
	return true;
}

function submit_form_server2()
{
	var f = document.getElementById("form_server2");
	var s = document.getElementById("form_submit");
	
	s.server2.value = f.value;
	
}


function load_form_server3()
{
	var f = document.getElementById("form_server3");

	f.value = p2p_server3;	
}

function check_form_server3()
{
	var f = document.getElementById("form_server3");

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
		
		if (checkHankakuNoKana(f.value, f, str_err_servaddr + comma + str_err_invaildc) == false)
		{
			return false;
		}
	
		ValidIp(f, str_serveraddr);
	}
	
	if (errfound)
	{
		return false;
	}	*/
	if(checkProhibitedCharacter2(f,f.value)==false)return false;
	
	return true;
}

function submit_form_server3()
{
	var f = document.getElementById("form_server3");
	var s = document.getElementById("form_submit");
	
	s.server3.value = f.value;
	
}


function load_form_server4()
{
	var f = document.getElementById("form_server4");

	f.value = p2p_server4;	
}

function check_form_server4()
{
	var f = document.getElementById("form_server4");

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
		
		if (checkHankakuNoKana(f.value, f, str_err_servaddr + comma + str_err_invaildc) == false)
		{
			return false;
		}
	
		ValidIp(f, str_serveraddr);
	}
	
	if (errfound)
	{
		return false;
	}	*/
	if(checkProhibitedCharacter2(f,f.value)==false)return false;
	
	return true;
}

function submit_form_server4()
{
	var f = document.getElementById("form_server4");
	var s = document.getElementById("form_submit");
	
	s.server4.value = f.value;
	
}