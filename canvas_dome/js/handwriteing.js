/**
 * Created by wangxu on 2017/7/16.
 */

var canvasWidth = Math.min(800,$(window).width()-40);//画布最大为800
var canvasHeight = canvasWidth;
var isMouseDown = false;
var lastLoc = {x:0,y:0};
//用时间戳的方式，定义一个变量
var lastTimestamp = 0;
var lastLineWidth = -1;
var strokeColor = "black";

var canvas=document.getElementById("canvas");
var context=canvas.getContext("2d");

canvas.width = canvasWidth;
canvas.height = canvasHeight;

$("#controller").css("width",canvasWidth+"px");
drawGrid();

$("#clear_btn").click(
    function(e){
        context.clearRect(0,0,canvasWidth,canvasHeight);//在给定的矩形内清除指定的像素
        drawGrid();
    }
);
$(".color_btn").click(
    function(e){
        $(".color_btn").removeClass("color_btn_selected");
        $(this).addClass("color_btn_selected");
        strokeColor = $(this).css("background-color");
    }
);
function beginStroke(point){//开始绘制
    isMouseDown=true;
    lastLoc=windowToCanvas(point.x,point.y);
    //当前时间戳
    lastTimestamp = new Date().getTime();
}
function endStroke(){//结束绘制
    isMouseDown=false;
}
function moveStroke(point){//绘制过程
    var curLoc = windowToCanvas(point.x, point.y);
    //记录当期时间
    var curTimestamp = new Date().getTime();
    //两点之间的距离
    var s=calcDistance(curLoc,lastLoc);
    //时间间距
    var t=curTimestamp - lastTimestamp;
    var lineWidth=calcLinWidth(t,s);

    context.beginPath();
    context.moveTo(lastLoc.x,lastLoc.y);//上一次开始的坐标点
    context.lineTo(curLoc.x,curLoc.y);//此次开始的坐标点

    context.strokeStyle=strokeColor;
    context.lineWidth=lineWidth;
    context.lineCap="round";
    context.lineJoin="round";
    context.stroke();

    lastLoc = curLoc;
    //更新时间戳
    lastTimestamp=curTimestamp;
    lastLineWidth=lineWidth;
}

canvas.onmousedown=function(e){
    e.preventDefault();
    beginStroke({x : e.clientX,y : e.clientY});
};
canvas.onmouseup=function(e){
    e.preventDefault();
    endStroke()
};
canvas.onmouseout=function(e){
    e.preventDefault();
    endStroke()
};
canvas.onmousemove=function(e){
    e.preventDefault();
    if(isMouseDown){
       moveStroke({x: e.clientX,y: e.clientY});
    }
};
canvas.addEventListener('touchstart',function(e){
    e.preventDefault();
    var touch= e.touches[0];
    beginStroke({x : touch.pageX,y : touch.pageY});
});
canvas.addEventListener('touchmove',function(e){
    e.preventDefault();
    if(isMouseDown){
        var touch= e.touches[0];
        moveStroke({x : touch.pageX,y : touch.pageY});
    }


});
canvas.addEventListener('touchend',function(e){
    e.preventDefault();
    endStroke();
});






//线条宽度和运笔速度的设置
var maxLineWidth = 30;
var minLineWidth = 1;
var maxStrokeV =10;
var minStrokeV =0.1;

//计算线的宽度 传出时间和距离
function calcLinWidth(t,s){
    var v = s/t;
    var resultLineWidth;

    //当速度小于速度最小值时将线条宽度设为最大
    if( v <= minStrokeV){
        resultLineWidth=maxLineWidth;
        //当速度大于最大速度时将线条宽度设为最小
    }else if(v >= maxStrokeV){
        resultLineWidth=minLineWidth;
        //当速度在最大速度和最小速度之间时（最大宽度-（线条平均速度-最小速度）/（最大速度-最小速度）*（最大宽度-最小宽度））
        //用最大宽度减去，平均速度与最小速度的差值占最大速度与最小速度差值的比例然后乘以最大宽度与最小宽度的差值
    }else{
        resultLineWidth = maxLineWidth-(v-minStrokeV)/(maxStrokeV-minStrokeV)*(maxLineWidth-minLineWidth);
    }

    if(lastLineWidth == -1){
        return resultLineWidth;
    }
    //上次的线条宽度的2/3和计算出的线条宽度的1/3
    return lastLineWidth*2/3+resultLineWidth*1/3;
}
//计算两个坐标点之间的距离
function calcDistance(loc1,loc2){
    //x1-x2的平方+y1-y2的平方再开方
    return Math.sqrt((loc1.x-loc2.x)*(loc1.x-loc2.x)+(loc1.y-loc2.y)*(loc1.y-loc2.y));
}

function windowToCanvas(x,y){
    var bbox = canvas.getBoundingClientRect();
    return {x:Math.round(x-bbox.left),y:Math.round(y-bbox.top)};
}

//绘制田字格
function drawGrid(){
    context.save();//保存当前环境的状态
    context.strokeStyle = "rgb(230,11,9)";

    context.beginPath();//起始一条路径，或重置当前路径
    context.moveTo(3,3);//把路径移动到画布中的指定点，不创建线条
    context.lineTo(canvasHeight-3,3);//添加一个新点，然后再画布中创建从改点到最后指定点的线条
    context.lineTo(canvasWidth-3,canvasHeight-3);
    context.lineTo(3,canvasHeight-3);
    context.closePath();//创建从当前点回到起始点的路径

    context.lineWidth = 6;
    context.stroke();

    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(canvasWidth,canvasHeight);

    context.moveTo(canvasWidth,0);
    context.lineTo(0,canvasHeight);

    context.moveTo(canvasWidth/2,0);
    context.lineTo(canvasWidth/2,canvasHeight);

    context.moveTo(0,canvasHeight/2);
    context.lineTo(canvasWidth,canvasHeight/2);

    context.lineWidth=1;
    context.stroke();
    context.restore();//返回之前保存过的路径状态和属性
}