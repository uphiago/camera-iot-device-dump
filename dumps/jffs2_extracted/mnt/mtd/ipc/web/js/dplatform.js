// JavaScript Document
function load_form_enable()
{
	var f1 = document.getElementById("form_enable1");
	var f0 = document.getElementById("form_enable0");
	
	if (dana_enable == "1")
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
		for (i = 0; i <= 2; i++)
		{
       		document.getElementById('layer' + i).style.visibility = "visible";
   		}
	}
	else
	{
		for (i = 0; i <= 2; i++)
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
		s.dana_enable.value = 1;
	else
		s.dana_enable.value = 0;
		
	s.dana_enable.name = "-dana_enable";
}

function load_form_server()
{
	var f = document.getElementById("form_server");
	
	f.value = dana_server;
}

function check_form_server()
{
	var f = document.getElementById("form_server");

	 if (checkProhibitedCharacter3(f,f.value) == false)
	{
		f.select();
		return false;
	}  
	return true;
}

function submit_form_server()
{
	var f = document.getElementById("form_server");
	var s = document.getElementById("form_submit");

	s.dana_server.value = f.value;	
	s.dana_server.name  = "-dana_server";
}


function load_form_port()
{
	var f = document.getElementById("form_port");
	
	f.value = dana_port;	
}

function check_form_port()
{
	var f = document.getElementById("form_port");
	
	if (f.value == "")
	{
		alert(str_note_inputport);
		return false;
	}
	else
	{
		if (checkHankakuNoKana(f.value, f, str_err_port) == false)
			return false;
		if (checkProhibitedCharacter(f.value) == false)
			return false;	
	}	
	
	return true;
}

function submit_form_port()
{
	var f = document.getElementById("form_port");
	var s = document.getElementById("form_submit");

	s.dana_port.value = f.value;	
	s.dana_port.name  = "-dana_port";
}

function load_form_sn()
{
	var f = document.getElementById("form_sn");
	
	f.value = dana_sn;
}


function submit_form_sn()
{
	var f = document.getElementById("form_sn");
	var s = document.getElementById("form_submit");

	s.dana_sn.value = f.value;	
	s.dana_sn.name  = "-dana_sn";
}
