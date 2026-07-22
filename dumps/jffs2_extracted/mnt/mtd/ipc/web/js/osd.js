
function load_form_region0()
{
	var f1 = document.getElementById("form_region0_on");
	var f0 = document.getElementById("form_region0_off");
        var e1 = document.getElementById("form_region0_top");
	var e0 = document.getElementById("form_region0_down");
	

		if(show_0 == 1)
		{
			f1.checked=true;
		}
		else
		{
			f0.checked=true;
		}

                if(place_0 == 1)
		{
			e0.checked=true;
		}
		else
		{
			e1.checked=true;
		}
	
}

function submit_form_region0()
{
	var f = document.getElementById("form_region0_on");
        var e = document.getElementById("form_region0_top");
	var s = document.getElementById("form_submit");

	if(f.checked == true)
	{
		s.show0.value=1;
	}
	else
	{
		s.show0.value=0;
	}
       
        if(e.checked == true)
	{
		s.place0.value=0;
	}
	else
	{
		s.place0.value=1;
	}

	s.region0.value = 0;
	
	s.region0.name  = "-region";
	s.show0.name    = "-show";
        s.place0.name   = "-place";
}

function load_form_region1()
{
	var f1 = document.getElementById("form_region1_on");
	var f0 = document.getElementById("form_region1_off");
        var e1 = document.getElementById("form_region1_top");
	var e0 = document.getElementById("form_region1_down");
	var fn = document.getElementById("form_region1_name");
	
				
		if(show_1==1)
		{
			f1.checked=true;
		}
		else
		{
			f0.checked=true;
		}

                  if(place_1 == 1)
		{
			e0.checked=true;
		}
		else
		{
			e1.checked=true;
		}
	
	
	fn.value = name_1;
}

function check_form_region1()
{
	var f = document.getElementById("form_region1_name");

	if (f.value == "")
	{
		alert(str_err_noname);
		f.select();
		return false;
	}

    
     if (checkProhibitedCharacter3(f,f.value) == false)
	{
		f.select();
		return false;
	}       

	/*var clen = checkLen(f.value);
	if (clen > 18)
	{
		alert(str_err_osdname);
		f.select();
		return false;
	}*/

	return true;
}

function submit_form_region1()
{
	var f = document.getElementById("form_region1_on");
        var e = document.getElementById("form_region1_top");
	var n = document.getElementById("form_region1_name");
	var s = document.getElementById("form_submit");
		
	if(f.checked == true)
	{
		s.show1.value = 1;
	}
	else
	{
		s.show1.value = 0;
	}

         if(e.checked == true)
	{
		s.place1.value=0;
	}
	else
	{
		s.place1.value=1;
	}
	
	s.name1.value = n.value;
	s.region1.value = 1;
	
	s.region1.name="-region";
	s.show1.name="-show";
	s.name1.name = "-name";
        s.place1.name = "-place";
}