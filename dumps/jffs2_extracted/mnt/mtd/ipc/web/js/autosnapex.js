// JavaScript Document
function load_form_asinterval()
{
	var f1 = document.getElementById("form_asinterval1");
        var f2 = document.getElementById("form_asinterval2");
        var f3 = document.getElementById("form_asinterval3");

	f1.value = as_snap_interval;
        f2.value = as_email_interval;
        f3.value = as_ftp_interval;
}

function check_form_asinterval1()
{
	var f = document.getElementById("form_asinterval1");

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
	
	if ((f.value < 5) || (f.value >86400))
	{
		alert(str_err_snapint);
		f.select();
		return false;
	}
	
	return true;
}

function check_form_asinterval2()
{
	var f = document.getElementById("form_asinterval2");

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
	
	if ((f.value < 5) || (f.value >86400))
	{
		alert(str_err_snapint);
		f.select();
		return false;
	}
	
	return true;
}

function check_form_asinterval3()
{
	var f = document.getElementById("form_asinterval3");

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
	
	if ((f.value < 5) || (f.value >86400))
	{
		alert(str_err_snapint);
		f.select();
		return false;
	}
	
	return true;
}

function submit_form_asinterval()
{
	var f1 = document.getElementById("form_asinterval1");
	var f2 = document.getElementById("form_asinterval2");
	var f3 = document.getElementById("form_asinterval3");
	var s = document.getElementById("form_submit");

	s.as_snap_interval.value = f1.value;
        s.as_email_interval.value = f2.value;
        s.as_ftp_interval.value = f3.value;

	s.as_snap_interval.name  = "-as_interval";
	s.as_email_interval.name  = "-as_interval";
	s.as_ftp_interval.name  = "-as_interval";
}

function load_form_astype()
{
	var f1 = document.getElementById("form_astype1");
	var f2 = document.getElementById("form_astype2");
        var f3 = document.getElementById("form_astype3");

	f1.checked = false;
	f2.checked = false;
        f3.checked = false;

	if (as_snap_enable == 1)
	{
			f1.checked = true;
	}
        if (as_email_enable == 1)
	{
			f2.checked = true;
	}
	if (as_ftp_enable == 1)
	{
			f3.checked = true;
	}
        
	
}

function submit_form_astype()
{
	var f1 = document.getElementById("form_astype1");
	var f2 = document.getElementById("form_astype2");
        var f3 = document.getElementById("form_astype3");
	var s  = document.getElementById("form_submit");

	s.as_snap.value  = "snap";
        s.as_email.value  = "email";
        s.as_ftp.value  = "ftp";
	
	if (f1.checked == true)
	{
	s.as_snap_enable.value = 1;
	}
       else
       {
        s.as_snap_enable.value = 0;
       }

	if (f2.checked == true)
	{
	s.as_email_enable.value = 1;
	}
        else
       {
       s.as_email_enable.value = 0;
       }

      if (f3.checked == true)
	{
	s.as_ftp_enable.value = 1;	
	}
       else
      {
      s.as_ftp_enable.value = 0;
      }




        s.as_snap.name  = "-as_type";
        s.as_email.name  = "-as_type";
        s.as_ftp.name  = "-as_type";

	s.as_snap_enable.name  = "-as_enable";
	s.as_email_enable.name = "-as_enable";
	s.as_ftp_enable.name   = "-as_enable";
}

