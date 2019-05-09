/**
 * Created by Administrator on 2018/4/24.
 */

$(function(){
    //图片3D旋转效果
    $(".box-3d").on("mouseenter mouseleave",function(e) {
        spin(e,this,".box-3d-content");
    });



})
