/**
 * Created by wangxu on 2017/7/5.
 */

window.onload=function(){
var music=document.getElementById("music");
var audio=document.getElementsByTagName("audio")[0];

 var page1=document.getElementById("page1");
 var page2=document.getElementById("page2");
 var page3=document.getElementById("page3");


//�����ֲ���ֹͣʱ���Զ�ֹͣ������תЧ��
audio.addEventListener("ended",function(){
   music.setAttribute("class","");
   // music.style.animationPlayState="paused";
},false);


//�������ͼ�꣬�������ֲ���Ч��
/*music.onclick=function(){
    if(audio.paused){
        audio.play();
        //this.style.animationPlayState="running";
 this.setAttribute("class","play");

    }else{
        audio.pause();
        //this.style.animationPlayState="paused";
 this.setAttribute("class","");

    }

 };*/

    music.addEventListener("touchstart",function(event){
        if(audio.paused){
            audio.play();
            //this.style.animationPlayState="running";
            this.setAttribute("class","play");

        }else{
            audio.pause();
            //this.style.animationPlayState="paused";
            this.setAttribute("class","");
        }
    },false);

    //��ҳЧ��

    page1.addEventListener("touchstart",function(event){
        page1.style.display="none";
        page2.style.display="block";
        page3.style.display="block";
        page3.style.top="100%";
        setTimeout(function(){
            page2.setAttribute("class","page fadeOut");
            page3.setAttribute("class","page fadeIn");
        },5500);
    },false);

};