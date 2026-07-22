// JavaScript Document
function load_form_aeswitch1()
{
	var f0 = document.getElementById("form_aeswitch10");
	var f1 = document.getElementById("form_aeswitch11");
	
	if (aeswitch_1 == "1")
	{
		f1.checked = true;
	}
	else
	{
		f0.checked = true;
	}
}

function change_form_aeswitch1()
{
	var f = document.getElementById("form_aeswitch11");
	
	var i = 0;
	if (f.checked == true)
	{
   		document.getElementById('layer'+i).style.visibility = "visible";
  	}
	else
	{
		document.getElementById('layer'+i).style.visibility = "hidden";
	}
}

function submit_form_aeswitch1()
{
	var f = document.getElementById("form_aeswitch11");
	var s = document.getElementById("form_submit");
	
	if (f.checked == true)
	{
		s.aeswitch_1.value = "1";
	}
	else
	{
		s.aeswitch_1.value = "0";
	}

	
}

function load_form_aeformat1()
{
	var f = document.getElementById("form_aeformat1");
	
	if (aeformat_1 == "g711a")
	{
		f.options[0].selected = true;
	}
	else
	{
		f.options[1].selected = true;
	}
}

function submit_form_aeformat1()
{
	var f = document.getElementById("form_aeformat1");
	var s = document.getElementById("form_submit");
	
	s.aeformat_1.value = f.value;
	
}

function load_form_aeswitch2()
{
	var f0 = document.getElementById("form_aeswitch20");
	var f1 = document.getElementById("form_aeswitch21");
	
	if (aeswitch_2 == "1")
	{
		f1.checked = true;
	}
	else
	{
		f0.checked = true;
	}
}

function change_form_aeswitch2()
{
	var f = document.getElementById("form_aeswitch21");
	
	var i = 1;
	if (f.checked == true)
	{
   		document.getElementById('layer'+i).style.visibility = "visible";
  	}
	else
	{
		document.getElementById('layer'+i).style.visibility = "hidden";
	}
}

function submit_form_aeswitch2()
{
	var f = document.getElementById("form_aeswitch21");
	var s = document.getElementById("form_submit");
	
	if (f.checked == true)
	{
		s.aeswitch_2.value = "1";
	}
	else
	{
		s.aeswitch_2.value = "0";
	}
	
	
}

function load_form_aeformat2()
{
	var f = document.getElementById("form_aeformat2");
	
	if (aeformat_2 == "g711a")
	{
		f.options[0].selected = true;
	}
	else 
	{
		f.options[1].selected = true;
	
	}
}

function submit_form_aeformat2()
{
	var f = document.getElementById("form_aeformat1");
	var s = document.getElementById("form_submit");
	
	s.aeformat_2.value = f.value;
	
		
}








function load_form_aeswitch3()
{
	var f0 = document.getElementById("form_aeswitch30");
	var f1 = document.getElementById("form_aeswitch31");
	
	if (aeswitch_3 == "1")
	{
		f1.checked = true;
	}
	else
	{
		f0.checked = true;
	}
}

function change_form_aeswitch3()
{
	var f = document.getElementById("form_aeswitch31");
	
	var i = 2;
	if (f.checked == true)
	{
   		document.getElementById('layer'+i).style.visibility = "visible";
  	}
	else
	{
		document.getElementById('layer'+i).style.visibility = "hidden";
	}
}

function submit_form_aeswitch3()
{
	var f = document.getElementById("form_aeswitch31");
	var s = document.getElementById("form_submit");
	
	if (f.checked == true)
	{
		s.aeswitch_3.value = "1";
	}
	else
	{
		s.aeswitch_3.value = "0";
	}
	
	
}

function load_form_aeformat3()
{
	var f = document.getElementById("form_aeformat3");
	
	if (aeformat_3 == "g711a")
	{
		f.options[0].selected = true;
	}
	else 
	{
		f.options[1].selected = true;
	
	}
}

function submit_form_aeformat3()
{
	var f = document.getElementById("form_aeformat1");
	var s = document.getElementById("form_submit");
	
	s.aeformat_3.value = f.value;
	
		
}

function load_form_volumein()
{
	var f = document.getElementById("form_volumein");
	
	f.value = volume;	
}

function submit_form_volumein()
{
	var f = document.getElementById("form_volumein");
	var s = document.getElementById("form_submit");

    s.volume.value = f.value;
	
		
	
}

function check_form_volumein()
{
	var f = document.getElementById("form_volumein");
	
	if ((f.value < 1) || (f.value > 16))
	{
		alert(str_err_volume16);
		f.select();
		return false;
	}

	return true;
}

function load_form_volumeout()
{
	var f = document.getElementById("form_volumeout");
	
	f.value = ao_volume;
}

function submit_form_volumeout()
{
	var f = document.getElementById("form_volumeout");
	var s = document.getElementById("form_submit");

       s.ao_volume.value = f.value;
	
		
	
}

function check_form_volumeout()
{
	var f = document.getElementById("form_volumeout");
	
	if ((f.value < 1) || (f.value > 13))
	{
		alert(str_err_volume13);
		f.select();
		return false;
	}

	return true;
}
function load_form_volintype()
{
	var f = document.getElementById("form_volintype");

	if (volin_type == "0")
	{
		f.options[0].selected = true;
	}
     else
        {
		f.options[1].selected = true;
        }
}


function submit_form_volintype()
{
	var f = document.getElementById("form_volintype");
	var s = document.getElementById("form_submit");
	
	s.volin_type.value = f.selectedIndex;
	
	
}
