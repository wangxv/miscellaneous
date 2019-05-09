window.onload=function ()
{
	createAccordion('show');
};

//�����ַ���
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
	//�����ʱ�������������ʱ��
	if(oDiv.timer)
	{
		clearInterval(oDiv.timer);
	}
	//�Ӷ�ʱ��
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
	var iWidth=oDiv.offsetWidth;//�����������Ŀ��
	var w=0;
	var bEnd=true;
	var i=0;
	
	for(i=0;i<aLi.length;i++)
	{
		
		if(i==iIndex)
		{
			continue;
		}
		//������Ƿǵ�ǰ���li���ͼ�ȥ��span�Ŀ��
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
		//����˶�������Ӧλ�ã���ֹͣ
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