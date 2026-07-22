var user;
var pwd;
var language=getcookie('language0');
    
function getcookie(name)
{
	var strCookie=document.cookie;
    var arrCookie=strCookie.split('; ');
    for (var i=0;i<arrCookie.length;i++)
    {
		var arr=arrCookie[i].split('=');
        if (arr[0]==name)
			return unescape(arr[1]);
    }
    return '';
}
function setcookie(name,value,expirehours)
{
	var cookieString=name+'='+escape(value);
    if (expirehours>0)
    {
		var date=new Date();
        date.setTime(date.getTime()+expirehours*3600*1000);
        cookieString=cookieString+'; expires='+date.toGMTString();
	}
    document.cookie=cookieString;
}




if (language=='1')
    document.write('<script src="/web/english/language.js"><\/script>');
else
    document.write('<script src="/web/chinese/language.js"><\/script>');