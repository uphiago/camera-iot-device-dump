// JavaScript Document
function load_form_md_email()
{
	var fe  = document.getElementById("form_md_email");
	
		
	if (md_email_switch == "on")
		fe.checked = true;
	else
		fe.checked = false;
	
}


function submit_form_md_email()
{
	var fe  = document.getElementById("form_md_email");
	
	var s   = document.getElementById("form_submit");
	
	s.ids0.value  = "email";
	s.turn0.value = "off";


	if (fe.checked == true)
	{
		
		s.turn0.value = "on";	
		
	}
	

	
}

function load_form_md_record()
{
	var ff = document.getElementById("form_md_ftprec");
	var fr = document.getElementById("form_md_record");
	
	ff.checked = false;
	fr.checked = false;

	if (md_ftprec_switch == "on")
	{
		ff.checked = true;
		fr.checked = true;
	}
	else
	{
		ff.checked = false;
		if (md_record_switch == "on")
	   {
		fr.checked = true;
	   }
	    else
    	{
		fr.checked = false;
	   }
		
	}

	
}

function submit_form_md_record()
{
	var ff = document.getElementById("form_md_ftprec");
	var fr = document.getElementById("form_md_record");
	var s  = document.getElementById("form_submit");

	s.ids3.value  = "ftprec";
	s.turn3.value = "off";
	s.ids5.value  = "record";
	s.turn5.value = "off";
	
	if (ff.checked == true)
	{
		s.turn3.value = "on";
		
	}

	if (fr.checked == true)
	{
		s.turn5.value = "on";
	}

	
}

function load_form_md_relay()
{
	var f = document.getElementById("form_md_relay");
	
	f.checked = false;
	
	if (md_relay_switch == "on")
	{
		f.checked = true;
	}
	else
	{
		f.checked = false;
	}
}

function submit_form_md_relay()
{
	var f = document.getElementById("form_md_relay");
	var s = document.getElementById("form_submit");
	
	s.ids6.value  = "relay";
	s.turn6.value = "off";

	if (f.checked == true)
	{
		s.turn6.value = "on";
	}
	
	
}

function load_form_relaytime()
{
	var f = document.getElementById("form_relaytime");
	
	if (time == "5")
	{
	   f.options[0].selected = true;
	}
	else if (time =="10")
	{
	   f.options[1].selected = true;
	}
	else if (time == "20")
	{
		f.options[2].selected = true;
	}
	else
	{
		f.options[3].selected = true;
	}
}

function submit_form_relaytime()
{
	var f = document.getElementById("form_relaytime");
	var s = document.getElementById("form_submit");

	s.time.value = f[f.selectedIndex].value;
	
}

function load_form_md_snap()
{
	var f = document.getElementById("form_md_snap");

	f.checked = false;
	
	if (md_snap_switch == "on")
	{
		f.checked = true;
	}
	else
	{
		f.checked = false;
	}
}

function submit_form_md_snap()
{
	var f = document.getElementById("form_md_snap");
	var s = document.getElementById("form_submit");	
	
	s.ids4.value  = "snap";
	s.turn4.value = "off";
	
	if (f.checked == true)
	{
		s.turn4.value = "on";
	}

	
}



function load_form_md_ftpsnap()
{
	var f = document.getElementById("form_md_ftppic");
	
	f.checked = false;
	
	if (md_ftpsnap_switch == "on")
	{
		f.checked = true;
	}
        else
	{
		f.checked = false;
	}
        
	
}

function submit_form_md_ftpsnap()
{
	var f = document.getElementById("form_md_ftppic");
	var s = document.getElementById("form_submit");	
	
	s.ids2.value  = "ftpsnap";
	s.turn2.value = "off";
	
	if (f.checked == true)
	{
		s.turn2.value = "on";
	}	


}



function load_form_snap_num()
{
	var f = document.getElementById("form_snapnum");
	
	if (snap_count == "1")
	{
	   f.options[0].selected = true;
	}
	else if (snap_count == "2")
	{
	   f.options[1].selected = true;
	}
	
	else
	{
		f.options[2].selected = true;
	}
}

function submit_form_snap_num()
{
	var f = document.getElementById("form_snapnum");
	var s = document.getElementById("form_submit");

	s.snapnum.value = f[f.selectedIndex].value;
	
}

function load_form_md_preset()
{
	var f = document.getElementById("form_md_preset");
	
	f.checked = false;
	
	if (md_preset_switch == "on")
	{
		f.checked = true;
	}
        else
	{
		f.checked = false;
	}
        
	
}

function submit_form_md_presetindex()
{
	var f = document.getElementById("form_md_preset");
	var s = document.getElementById("form_submit");	
	
	s.ids7.value  = "preset";
	s.turn7.value = "off";
	
	if (f.checked == true)
	{
		s.turn7.value = "on";
	}	


}

function load_form_md_presetindex()
{
	var f = document.getElementById("form_md_presetindex");
	
	
	f.options[alarmpresetindex-1].selected=true;
        
	
}

function submit_form_md_preset()
{
	var f = document.getElementById("form_md_presetindex");
	var s = document.getElementById("form_submit");	
	
	
	s.index.value = f.selectedIndex+1;	


}
