function load_form_ioenable()
{
	var f = document.getElementById("form_ioenable");
	
   	if (io_enable == "1")
   		f.checked = true;
}

function submit_form_ioenable()
{
	var f = document.getElementById("form_ioenable");
	var s = document.getElementById("form_submit");
	
	if (f.checked)
		s.io_enable.value="1";
	else
		s.io_enable.value="0";

	s.io_enable.name = "-io_enable";
}

function load_form_ioflag()
{
	var f0 = document.getElementById("form_ioflag0");
	var f1 = document.getElementById("form_ioflag1");
	
   	if (io_flag == "1")
   		f1.checked=true;
   	else
   		f0.checked=true;
}

function submit_form_ioflag()
{
	var f = document.getElementById("form_ioflag1");
	var s = document.getElementById("form_submit");
	
	if (f.checked == true)
		s.io_flag.value = "1";
	else
		s.io_flag.value = "0";
		
	s.io_flag.name = "-io_flag";
}
