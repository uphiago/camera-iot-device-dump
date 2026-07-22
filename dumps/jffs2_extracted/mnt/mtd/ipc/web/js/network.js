// JavaScript Document
function load_form_dhcpflag()
{
	var f = document.getElementById("form_dhcpflag");
	
	if (dhcpflag == "on")
	{
		f.options[1].selected = true;
	}
	else
	{
		f.options[0].selected = true;
	}
}

function change_form_dhcpflag()
{
	var f = document.getElementById("form_dhcpflag");
	var i;
	
	if (f.selectedIndex == 0)
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
	
	change_form_dnsstat();
}

function check_form_dhcpflag()
{
	var f = document.getElementById("form_dhcpflag");
	
	if (f.selectedIndex == 1)
		return true;

	if (!check_form_ipaddr())
		return false;
		
	if (!check_form_netmask())
		return false;
		
	if (!check_form_gateway())
		return false;
		
	return true;
}

function submit_form_dhcpflag()
{
	var f = document.getElementById("form_dhcpflag");
	var s = document.getElementById("form_submit");
	
	if (f.selectedIndex == 1)
	{
		s.dhcp.value = "on";
	}
	else
	{
		s.dhcp.value = "off";
	}

	
}

function load_form_ipaddr()
{
	var f = document.getElementById("form_ipaddr");
	
	f.value = ip;
}

function check_form_ipaddr()
{
	var f = document.getElementById("form_ipaddr");
	
	errfound = false;
	
	if (f.value == "")
	{
		alert(str_note_inputipaddr);
		f.select();
		return false;
	}
	
	if (f.value != "")
	{
		ValidIp(f, "ip");
	}

	if (errfound)
	{
		return false;
	}

	return true;
}

function submit_form_ipaddr()
{
	var f = document.getElementById("form_ipaddr");
	var d = document.getElementById("form_dhcpflag");
	var s = document.getElementById("form_submit");

	if (d.selectedIndex != 1)
		s.ipaddr.value = f.value;
	
}

function load_form_netmask()
{
	var f = document.getElementById("form_netmask");
	
	f.value = netmask;
}

function check_form_netmask()
{
	var f = document.getElementById("form_netmask");
	
	errfound = false;
	
	if (f.value == "")
	{
		alert(str_note_inputsubmask);
		f.select();
		return false;
	}
	
	if (f.value != "")
	{
		ValidSubnet(f, "net mask");
	}

	if (errfound)
	{
		return false;
	}

	return true;
}

function submit_form_netmask()
{
	var f = document.getElementById("form_netmask");
	var d = document.getElementById("form_dhcpflag");
	var s = document.getElementById("form_submit");
	
	if (d.selectedIndex != 1)
		s.netmask.value = f.value;
	
}

function load_form_gateway()
{
	var f = document.getElementById("form_gateway");
	
	if (gateway == "0.0.0.0")
	{
		f.value = "";
	}
	else
	{
		f.value = gateway;
	}
}

function check_form_gateway()
{
	var f = document.getElementById("form_gateway");
	
	errfound = false;

	if (f.value == "")
	{
		alert(str_note_inputgateway);
		f.select();
		return false;
	}
	
	if (f.value != "")
	{
		ValidIp(f, "gateway");
	}
	
	if (errfound)
	{
		return false;
	}
	
	return true;
}

function submit_form_gateway()
{
	var f = document.getElementById("form_gateway");
	var d = document.getElementById("form_dhcpflag");
	var s = document.getElementById("form_submit");
	
	if (d.selectedIndex != 1)
	{
		if (f.value == "")
		{
			s.gateway.value = "\"\"";
		}
		else
		{
			s.gateway.value = f.value;
		}
	}
	
	
}

function load_form_dnsstat()
{
	var f = document.getElementById("form_dnsstat");
	
	f.selectedIndex = dnsstat;
}


function change_form_dnsstat()
{
	var f = document.getElementById("form_dnsstat");
	var d = document.getElementById("form_dhcpflag");

	if (d.selectedIndex == 0)
	{ 
		f.selectedIndex = 0;
	}
	
	if (f.selectedIndex == 0)
	{
		for (i = 3; i <= 4; i++)
		{
			document.getElementById('layer' + i).style.visibility = "visible";
		}
	}
	else
	{
		for (i = 3; i <= 4; i++)
		{
			document.getElementById('layer' + i).style.visibility = "hidden";
		}
	}
}


function check_form_dnsstat()
{
	var f = document.getElementById("form_dnsstat");
	
	if (f.selectedIndex == 1)
		return true;

	if (!check_form_fdnsip())
		return false;
		
	if (!check_form_sdnsip())
		return false;
	
	return true;
}

function submit_form_dnsstat()
{
	var f = document.getElementById("form_dnsstat");
	var s = document.getElementById("form_submit");


	if (f.selectedIndex == 1)
	{
		s.dnsstat.value = 1;
	}
	else
	{
		s.dnsstat.value = 0;
	}
	
	
}

function load_form_fdnsip()
{
	var f = document.getElementById("form_fdnsip");
	
	f.value = fdnsip;
}

function check_form_fdnsip()
{
	var f = document.getElementById("form_fdnsip");
	
	errfound = false;
	
	if (f.value != "")
	{
		ValidIp(f, "primary dns");
	}
	
	if (errfound)
	{
		return false;
	}
	
	return true;
}

function submit_form_fdnsip()
{
	var f = document.getElementById("form_fdnsip");
	var s = document.getElementById("form_submit");

	if (f.value == "")
		s.fdnsip.value = s.gateway.value;
	else
		s.fdnsip.value = f.value;

	
}

function load_form_sdnsip()
{
	var f = document.getElementById("form_sdnsip");
	
	f.value = sdnsip;
}

function check_form_sdnsip()
{
	var f = document.getElementById("form_sdnsip");
	
	errfound = false;
	
	if (f.value != "")
	{
		ValidIp(f, "second dns");
	}
	
	if (errfound)
	{
		return false;
	}
	
	return true;
}

function submit_form_sdnsip()
{
	var f = document.getElementById("form_sdnsip");
	var s = document.getElementById("form_submit");

	if(f.value == "")
		s.sdnsip.value = "\"\"";
	else
		s.sdnsip.value = f.value;
		
	
}

function load_form_httpport()
{
	var f = document.getElementById("form_httpport");
	
	f.value = httpport;
}

function check_form_httpport()
{
	var f = document.getElementById("form_httpport");

	var j;
	var httpportvalue = f.value;
	
	for (j = 0; j < (httpportvalue.length); j++)
	{
		var ch = httpportvalue.substring(j, j + 1);
		if ("0" > ch || ch > "9") 
		{
			alert(str_err_invaildc);
			f.select();
			return false;
		}
	}
	
	if (((f.value != 80) && (f.value < 1024)) || (f.value > 49151))
	{
		alert(str_err_port);
		f.select();
		return false;
	}

	return true;
}

function submit_form_httpport()
{
	var f = document.getElementById("form_httpport");
	var s = document.getElementById("form_submit");
	
	s.httpport.value = f.value;
	
}

function load_form_rtspport()
{
	var f = document.getElementById("form_rtspport");
	
	f.value = rtspport;
}

function check_form_rtspport()
{
	var f = document.getElementById("form_rtspport");
	
	var rtspportvalue = f.value;
	
	for (j = 0; j < (rtspportvalue.length); j++)
	{
		var ch = rtspportvalue.substring(j, j + 1);
		if ("0" > ch || ch > "9") 
		{
			alert(str_err_invaildc);
			f.select();
			return false;
		}
	}
	
	if (((f.value != 554) && (f.value < 1024)) || (f.value > 49151))
	{
		alert(str_err_port);
		f.select();
		return false;
	}

	return true;
}

function submit_form_rtspport()
{
	var f = document.getElementById("form_rtspport");
	var s = document.getElementById("form_submit");

    s.rtspport.value = f.value; 
	
}


function load_form_rtmpport()
{
	var f = document.getElementById("form_rtmpport");
	
	f.value = rtmpport;
}


function submit_form_rtmpport()
{
	var f = document.getElementById("form_rtmpport");
	var s = document.getElementById("form_submit");

    s.rtmpport.value = f.value; 
	
}



function load_form_rtsp_aenable()
{
	var f1 = document.getElementById("form_rtsp_aenable1");
	var f0 = document.getElementById("form_rtsp_aenable0");

	if (rtsp_aenable == 1)
		f1.checked = true;
	else
		f0.checked = true;		
}

function submit_form_rtsp_aenable()
{
	var f = document.getElementById("form_rtsp_aenable1");
	var s = document.getElementById("form_submit");
	
	if (f.checked == true)
		s.rtsp_aenable.value = 1;
	else
		s.rtsp_aenable.value = 0; 
		
	
}

//判断IP和网关是否在同一网段
function check_form_ip2gateway()
{
    var a = document.getElementById("form_ipaddr").value;
    var b = document.getElementById("form_gateway").value;
    var c = document.getElementById("form_gateway");

         var num ; 
         var nup ;
         a = a.split(".");   
         b = b.split("."); 
         num = Number(a[0]) * 256 * 256 * 256 + Number(a[1]) * 256 * 256 + Number(a[2]) * 256 ;  
         nup = Number(b[0]) * 256 * 256 * 256 + Number(b[1]) * 256 * 256 + Number(b[2]) * 256 ;   

if(num!=nup)
{
alert(str_err_ip2gateway);
c.select();
return false;
}
return true;
}