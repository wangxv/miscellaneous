/**
 * Created by Administrator on 2018/4/24.
 */

$(function(){
    //图片3D旋转效果
    $(".admin-3d").on("mouseenter mouseleave",function(e) {
        spin(e,this,".admin-3dcontent");
    });

   $(".admin-nav ul li").on('click',function(event){
       if($(this).children().hasClass("popup")){
           $(this).children($('.popup')).css({
               display:"block"
           })
       }
   })


})