//form_ss sizeselect streamselect
function load_form_ss()
{
	load_form_sizeselect();	
	load_form_streamselect();
}

function load_form_sizeselect()
{
	var f = document.getElementById("form_sizeselect");
	
	f.selectedIndex = 4;	
}

function load_form_streamselect()
{
	var f = document.getElementById("form_streamselect");
	
	var streamnum = DHiMPlayer.GetStreamNum();

}

function change_form_sizeselect()
{
	var f = document.getElementById("form_sizeselect");
	
	switch (f.selectedIndex)
	{
		case 0:
			DHiMPlayer.SetWndPos(0, 0, 1280, 720);
			break;
		case 1:
			DHiMPlayer.SetWndPos(0, 0, 960, 540);
			break;
		case 2:
			DHiMPlayer.SetWndPos(0, 0, 640, 360);
			break;
		case 3:
			DHiMPlayer.SetWndPos(0, 0, 320, 180);
			break;
		default:
			if (form.streamselect[0].selected)
				DHiMPlayer.SetWndPos(0, 0, 1280, 720);
			else
				DHiMPlayer.SetWndPos(0, 0, 320, 240);
			break;
	}
	
	
if(form.sizeselect[0].selected==true)
{
DHiMPlayer.SetWndPos(0, 0, 1280, 720);
}
else if(form.sizeselect[1].selected==true)
{
DHiMPlayer.SetWndPos(0, 0, 960, 540);
}
else if(form.sizeselect[2].selected==true)
{
DHiMPlayer.SetWndPos(0, 0, 640, 360);
}
else if(form.sizeselect[3].selected==true)
{
DHiMPlayer.SetWndPos(0, 0, 320, 180);
}
else
{
	if (form.streamselect[0].selected)
		DHiMPlayer.SetWndPos(0, 0, 1280, 720);
	else
	    DHiMPlayer.SetWndPos(0, 0, 320, 240);
}

}






			