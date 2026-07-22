// JavaScript Document
function load_form_enable()
{
	var f1 = document.getElementById("form_enable1");
	var f0 = document.getElementById("form_enable0");

	if (obj_enable == "1")
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
			document.getElementById('layer0').style.visibility = "visible";
	}
	else
	{
       		document.getElementById('layer0').style.visibility = "hidden";
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
	
	f.value = obj_uid;
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




