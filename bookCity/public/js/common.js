/**
 * Created by Administrator on 2018/4/24.
 */


function spin(e,obj,content) {
    var sTop = getScrollTop();
    var w = obj.offsetWidth;
    var h = obj.offsetHeight;
    var x = e.pageX - obj.getBoundingClientRect().left - w/2;
    var y = e.pageY - obj.getBoundingClientRect().top - sTop - h/2;
    var direction = Math.round((((Math.atan2(y, x) * 180 / Math.PI) + 180) / 90) + 3) % 4; //direction的值为“0,1,2,3”分别对应着“上，右，下，左”
    var eventType = e.type;
    var box3D = $(obj).find(content);
    if(eventType == 'mouseenter'){
        switch (direction){
            case 0:
                box3D.css("transform","translateZ(-85px) rotateY(0deg) rotateX(-90deg)");
                break;
            case 1:
                box3D.css("transform","translateZ(-85px) rotateY(-90deg) rotateX(0deg)");
                break;
            case 2:
                box3D.css("transform","translateZ(-85px) rotateY(0deg) rotateX(90deg)");
                break;
            case 3:
                box3D.css("transform","translateZ(-85px) rotateY(90deg) rotateX(0deg)");
                break;
        }
    }else{
        box3D.css("transform","translateZ(-85px) rotateY(0deg) rotateX(0deg)");
    }
}

//获取滚动条高度
function getScrollTop(){
    var scrollTop=0;
    if(document.documentElement&&document.documentElement.scrollTop)
    {
        scrollTop=document.documentElement.scrollTop;
    }
    else if(document.body)
    {
        scrollTop=document.body.scrollTop;
    }
    return scrollTop;
}