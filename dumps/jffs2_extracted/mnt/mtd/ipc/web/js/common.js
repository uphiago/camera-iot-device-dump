// 计算字符串长度函数
function checkLen(str)   
{   
	var x = 0;  
	
	for (var i = 0; i < str.length; i++)
	{   
		if (str.charCodeAt(i) > 128)
		{   
			x = x + 2;   
		}
		else
		{   
			x = x + 1;   
		}   
	}   
	return x;   
}

function checkProhibitedCharacter(string)
{
	if (string.search(/[^a-zA-Z0-9_\!\"\#\$\%\&\'\(\)\*\+\,\-\.\/\:\;\<\=\>\?\@\[\\\]\^\`\{\|\}\~\s]/) != -1)
	{
		alert(str_err_invaildc);
		return false;
	}
	else if (
			(string.search(/\\/) != -1) || 
			
			(string.search("&") != -1) || 
			(string.search("=") != -1) || 
			
			(string.search("\"") != -1))
	{
		alert(str_err_invaildc2);
		return false;
	}
	else
	{
		return true;
	}
}

function checkProhibitedCharacter2(obj, string)
{
	if(string.search(/[^a-zA-Z0-9_\!\"\#\$\%\&\'\(\)\*\+\,\-\.\/\:\;\<\=\>\?\@\[\\\]\^\`\{\|\}\~\s]/) != -1)
	{
		obj.select();
		alert(str_err_invaildc);
		return false;
	}
        else if ((string.search("\n") == -1)||(string.search("\r") == -1))
        {
		return true;
	}
	else if (
			(string.search(/\\/) != -1) || 
			
			(string.search("&") != -1) || 
			(string.search("=") != -1) || 
			(string.search("\"") != -1))
                        
	{
		obj.select();
		alert(str_err_invaildc2);
		return false;
	}
	else
	{
		return true;
	}
}

function checkProhibitedCharacter3(obj, string)
{
	 if (
			(string.search(/\\/) != -1) || 
			
			(string.search("&") != -1) || 
			(string.search("=") != -1) || 
			(string.search("\"") != -1))
	{
		obj.select();
		alert(str_err_invaildc2);
		return false;
	}
	else
	{
		return true;
	}
}
function checkProhibitedCharacter4(obj, string)
{
	 if ((string.search(/\\/) != -1) || 
			
			(string.search("&") != -1) || 
			(string.search("=") != -1) || 
			(string.search("\"") != -1))
	{
		obj.select();
		alert(str_err_invaildc);
		return false;
	}
	else
	{
		return true;
	}
}

function checkProhibitedCharacterUser(string)
{
	if(string.search("=") != -1)
	{
		alert(str_err_invaildc2);
		return false
	}
	else 
	{
		return checkProhibitedCharacter(string);
	}
}

function hasHankakuKana(str)
{
	var code;
	
	for (var i = 0; i < str.length; ++i) 
	{
		code = str.charCodeAt(i);
		if (code >= 0xff61 && code <= 0xff9f)
 		{
			return true;
		}
	}
	
	return false;
}

function hasZenKaku(str)
{
	var code;
	
	for (var i = 0; i < str.length; ++i) 
	{
		code = str.charCodeAt(i);
		if (code > 256 && (code < 0xff61 || code > 0xff9f))
		{
		return true;
		}
	}
	
	return false;
}

function checkHankakuNoKana(str, cObj, strMsg)
{
	var tmp;
	
	if (hasZenKaku(str) == true || hasHankakuKana(str) == true)
	{
		if (strMsg == null || strMsg == '') 
			alert(str_err_value);
		else 
			alert(strMsg);
		cObj.select();
		return false;
	}
	
	return true;
}

function onlynumber()
{
	if (!(event.keyCode == 46) && !(event.keyCode == 8) && !(event.keyCode == 37) && !(event.keyCode == 39))
		if (!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)))
			event.returnValue = false;
}

var errfound = false;

function error(elem, itemcname, text)  
{
	if (errfound)
		return;
	alert(itemcname + str_err_input + text);
	elem.select();
	elem.focus();
	errfound = true;
}

function ValidIp(itemc,itemcname)  //检查是否合法IP地址
 {
  var i,n,st,j;
  n=0;j=0;
  for (i=0;i<itemc.value.length;i++)
   {
    st=itemc.value.substr(i,1);
    if (st==".") 
     {
      j++;
      if (j==1 && (n<1 || (n>223 || n==127))) error(itemc,itemcname, str_err_addrrange1 + str_1_223_127);
      if (j==2 && (0>n || n>255)) error(itemc,itemcname, str_err_addrrange2 + str_0_255);
      if (j==3 && (0>n || n>255))    error(itemc,itemcname, str_err_addrrange3 + str_0_255);
      n=0;
      }
    else
     {
      if ("0">st || st>"9") error(itemc,itemcname, str_err_invaildc + period);
      n=n*10+parseInt(st);
      }
    }
  if (j!=3) error(itemc,itemcname,str_err_addr);
  if (n<1 || n>254) error(itemc,itemcname, str_err_addrlast + str_1_254);
  }


/*
function ValidIp(itemc,itemcname) 
{
	var i,n,st,j;
	
	n = 0; j = 0;
	
	
	for (i = 0; i < itemc.value.length; i++)
	{
		st=itemc.value.substr(i,1);
		if (st == ".") 
		{
			j++;
			if (j==1 && n==0) 
				error(itemc, itemcname, str_err_addrrange1 + str_1_255);
			if (0 > n || n > 254) 
				error(itemc, itemcname, str_err_addr + comma + str_0_254);
			n = 0;
		}
		else
		{
			if ("0" > st || st > "9") 
				error(itemc, itemcname, str_err_invaildc);
			n = n * 10 + parseInt(st);
		}
	}
	
	if (j != 3) 
		error(itemc, itemcname, str_err_addr);
		
	if (0 > n || n > 254) 
		error(itemc, itemcname, str_err_addr + comma + str_0_254);
	if (n == 0) 
		error(itemc, itemcname, str_err_addrlast + str_1_254);
}
*/
function ValidSubnet(itemc,itemcname)  //检查是否合法子网掩码
{
	var i,n,st,j;
	
	n = 0; j = 0;
	
	for (i = 0; i < itemc.value.length; i++)
	{
		st = itemc.value.substr(i, 1);
		if (st == ".") 
		{
			j++;
			if ((0 > n) || (n > 255)) 
				error(itemc, itemcname, str_err_addr + comma + str_0_255);
			n = 0;
		}
		else
		{
			if ("0" > st || st > "9") 
				error(itemc, itemcname, str_err_invaildc);
			n = n * 10 + parseInt(st);
		}
	}
	if (j != 3) 
		error(itemc, itemcname, str_err_addr);
	if ((0 > n) || (n > 255)) 
		error(itemc, itemcname, str_err_addr + comma + str_0_255);
}


