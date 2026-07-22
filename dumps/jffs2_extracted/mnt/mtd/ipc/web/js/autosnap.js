// JavaScript Document
function load_form_asinterval()
{
	var f = document.getElementById("form_asinterval");

	f.value = as_interval;
}

function check_form_asinterval()
{
	var f = document.getElementById("form_asinterval");

	var j = 0;
	var intervalvalue = f.value;
	
	for (j = 0; j < (intervalvalue.length); j++)
	{
		var ch = intervalvalue.substring(j,j+1);
		
		if ("0" > ch || ch > "9") 
		{
			alert(str_err_invaildc);
			f.select();
			return false;
		}
	}
	
	if ((f.value < 1) || (f.value >86400))
	{
		alert(str_err_snapint);
		f.select();
		return false;
	}
	
	return true;
}

function submit_form_asinterval()
{
	var f = document.getElementById("form_asinterval");
	var s = document.getElementById("form_submit");

	s.as_interval.value = f.value;
	s.as_interval.name  = "-as_interval";
}

function load_form_astype()
{
	var f1 = document.getElementById("form_astype1");
	var f4 = document.getElementById("form_astype4");

	f1.checked = false;
	f4.checked = false;

	if (as_enable == 1)
	{
		if ((as_type == 1)||(as_type == 5))
		{
			f1.checked = true;
		}
		if ((as_type == 4)||(as_type == 5))
		{
			f4.checked = true;
		}
	}
}

function submit_form_astype()
{
	var f1 = document.getElementById("form_astype1");
	var f4 = document.getElementById("form_astype4");
	var s  = document.getElementById("form_submit");

	var i = 0;
	
	if (f1.checked == true)
	{
		i = i + 1;
	}
	if (f4.checked == true)
	{
		i = i + 4;
	}
	if (i == 0)
	{
		s.as_type.value   = 5;
		s.as_enable.value = 0;
	}
	else
	{
		s.as_type.value   = i;
		s.as_enable.value = 1;
	}
	
	s.as_enable.name = "-as_enable";
	s.as_type.name   = "-as_type";
}

