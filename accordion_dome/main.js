window.onload=function ()
{
	createAccordion('show');
};

//创建手风琴
function createAccordion(id)
{
	var oDiv=document.getElementById(id);
	var iMinWidth=9999999;
	
	var aLi=oDiv.getElementsByTagName('li');
	var aSpan=oDiv.getElementsByTagName('span');
	
	var i=0;
	
	oDiv.timer=null;
	
	for(i=0;i<aSpan.length;i++)
	{
		aSpan[i].index=i;
		aSpan[i].onmouseover=function ()
		{
			gotoImg(oDiv, this.index, iMinWidth);
		};
		
		
		iMinWidth=Math.min(iMinWidth, aLi[i].offsetWidth);
	}
};


function gotoImg(oDiv, iIndex, iMinWidth)
{
	//如果定时器存在则清除定时器
	if(oDiv.timer)
	{
		clearInterval(oDiv.timer);
	}
	//加定时器
	oDiv.timer=setInterval
	(
		function ()
		{
			changeWidthInner(oDiv, iIndex, iMinWidth);
		}, 30
	);
}


function changeWidthInner(oDiv, iIndex, iMinWidth)
{
	var aLi=oDiv.getElementsByTagName('li');
	var aSpan=oDiv.getElementsByTagName('span');
	var iWidth=oDiv.offsetWidth;//最外面容器的宽度
	var w=0;
	var bEnd=true;
	var i=0;
	
	for(i=0;i<aLi.length;i++)
	{
		
		if(i==iIndex)
		{
			continue;
		}
		//如果你是非当前点击li，就减去你span的宽度
		if(iMinWidth==aLi[i].offsetWidth)
		{
			iWidth-=iMinWidth;
			continue;
		}
		
		bEnd=false;
		//
		console.log(aLi[i].offsetWidth);
		console.log(iMinWidth);
		
		speed=Math.ceil((aLi[i].offsetWidth-iMinWidth)/10);
		
		w=aLi[i].offsetWidth-speed;
		//如果运动到了相应位置，就停止
		if(w<=iMinWidth)
		{
			w=iMinWidth;
		}
		
		aLi[i].style.width=w+'px';
		
		iWidth-=w;
	}
	
	aLi[iIndex].style.width=iWidth+'px';
	
	if(bEnd)
	{
		clearInterval(oDiv.timer);
		oDiv.timer=null;
	}
}