function load_form_sdstatus()
{
	var f = document.getElementById("form_sdstatus");
	
	if(sdstatus == "out")
	{
		f.value = str_nothavesd;
	}
	else 
	{
		sdfreespace = parseInt(sdfreespace / 1024);
		sdtotalspace = parseInt(sdtotalspace / 1024);
		
		if (sdstatus == "Readonly")
			f.value = str_readonly + period + str_freespace + colon + sdfreespace  + "MB" + " " + str_totalspace + colon+ sdtotalspace + "MB";
		else
			f.value = str_havesd + period + str_freespace + colon + sdfreespace + "MB" + " " +str_totalspace + colon + sdtotalspace + "MB";
	}
}

function load_form_starttime()
{
	var f = document.getElementById("form_starttime");
	
	f.value = startdate;	
}

function load_form_sdns()
{
	var f = document.getElementById("form_sdns");
	
	f.value = sdnsip;
}

function load_form_pdns()
{
	var f = document.getElementById("form_pdns");
	
	f.value = fdnsip;
}

function load_form_router()
{
	var f = document.getElementById("form_router");
	
    if( gateway == "0.0.0.0")
	{
		f.value = "";
	}
    else
	{
	    f.value = gateway;
    }
}

function load_form_submask()
{
	var f = document.getElementById("form_submask");
	
	f.value = netmask;	
}

function load_form_ipaddr()
{
	var f = document.getElementById("form_ipaddr");

	f.value = ip;	
}

function load_form_macaddress()
{
	var f = document.getElementById("form_macaddress");

	f.value = macaddress;
}

function load_form_firmware()
{
	var f = document.getElementById("form_firmware");
	
	f.value = softVersion;
}

function load_form_webversion()
{
	var f = document.getElementById("form_webversion");
	
	f.value = webVersion;
}

function load_form_usernum()
{
	var f = document.getElementById("form_usernum");
	
	f.value = stream_num;
}

function load_form_networktype()
{
	var f = document.getElementById("form_networktype");

	if (networktype == "LAN")
		f.value = str_connwired;
	else 
		f.value = str_connwireless;
}

function load_form_devtype()
{
	var f = document.getElementById("form_devtype");
	
	f.value = devtype;
}

function load_form_cameraname()
{
	var f = document.getElementById("form_cameraname");
	
	f.value = name;
}

function do_formatsd()
{
	var s = document.getElementById("form_submit");

	if (confirm(str_ask_sdfat32) == true)
	{
		s.action = "cgi-bin/hi3510/sdfrmt.cgi";
		s.submit();
	}
	else
	{
		return false;
	}
}

function do_stopsd()
{
	var s = document.getElementById("form_submit");

    if (confirm(str_ask_sdstop) == true)
    {
        s.action = "cgi-bin/hi3510/sdstop.cgi";
        s.submit();
    }
    else
    {
		return false;
    } 
}


function load_form_upnpstatus()
{
       var f = document.getElementById("form_upnpstatus");

      if(upnpstatus == "ok")
     {
	     f.value = success;
	 }	
	 else if(upnpstatus == "off")
     {
	     f.value = unenable;
	 }	
	 else
	 {
	     f.value = fail;
	 }

}


function load_form_facddnsstatus()
{
     var f = document.getElementById("form_facddnsstatus");

     if(facddnsstatus == "ok")
     {
	     f.value = success;
	 }	
	 else if(facddnsstatus == "off")
     {
	     f.value = unenable;
	 }	
	 else
	 {
	     f.value = fail;
	 }
}



function load_form_th3ddnsstatus()
{
     var f = document.getElementById("form_th3ddnsstatus");
     
     var th3ddnsname;
	 if(d3th_service == 0)
	 {th3ddnsname = "Dyndns";}
	 else if(d3th_service == 1)
	 {th3ddnsname = "3322";}
	 else if(d3th_service == 2)
	 {th3ddnsname = "Dynddns";}
	  else if(d3th_service == 3)
	 {th3ddnsname = "No-ip";}
	 
	 
	 if(th3ddnsstatus == "ok")
     {
	    f.value = th3ddnsname + " " + success + " " + "http://" +d3th_domain ;
	 }	
	 else if(th3ddnsstatus == "off")
     {
	     f.value = unenable;
	 }	
	 else if(th3ddnsstatus == "failed")
	 {
	    f.value = th3ddnsname + " " + fail + " " + "http://" + d3th_domain ;
	 }	

}





