/**
 * Created by wangxu on 2017/7/16.
 */

var canvasWidth = Math.min(800,$(window).width()-40);//�������Ϊ800
var canvasHeight = canvasWidth;
var isMouseDown = false;
var lastLoc = {x:0,y:0};
//��ʱ����ķ�ʽ������һ������
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
        context.clearRect(0,0,canvasWidth,canvasHeight);//�ڸ����ľ��������ָ��������
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
function beginStroke(point){//��ʼ����
    isMouseDown=true;
    lastLoc=windowToCanvas(point.x,point.y);
    //��ǰʱ���
    lastTimestamp = new Date().getTime();
}
function endStroke(){//��������
    isMouseDown=false;
}
function moveStroke(point){//���ƹ���
    var curLoc = windowToCanvas(point.x, point.y);
    //��¼����ʱ��
    var curTimestamp = new Date().getTime();
    //����֮��ľ���
    var s=calcDistance(curLoc,lastLoc);
    //ʱ����
    var t=curTimestamp - lastTimestamp;
    var lineWidth=calcLinWidth(t,s);

    context.beginPath();
    context.moveTo(lastLoc.x,lastLoc.y);//��һ�ο�ʼ�������
    context.lineTo(curLoc.x,curLoc.y);//�˴ο�ʼ�������

    context.strokeStyle=strokeColor;
    context.lineWidth=lineWidth;
    context.lineCap="round";
    context.lineJoin="round";
    context.stroke();

    lastLoc = curLoc;
    //����ʱ���
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






//������Ⱥ��˱��ٶȵ�����
var maxLineWidth = 30;
var minLineWidth = 1;
var maxStrokeV =10;
var minStrokeV =0.1;

//�����ߵĿ�� ����ʱ��;���
function calcLinWidth(t,s){
    var v = s/t;
    var resultLineWidth;

    //���ٶ�С���ٶ���Сֵʱ�����������Ϊ���
    if( v <= minStrokeV){
        resultLineWidth=maxLineWidth;
        //���ٶȴ�������ٶ�ʱ�����������Ϊ��С
    }else if(v >= maxStrokeV){
        resultLineWidth=minLineWidth;
        //���ٶ�������ٶȺ���С�ٶ�֮��ʱ�������-������ƽ���ٶ�-��С�ٶȣ�/������ٶ�-��С�ٶȣ�*�������-��С��ȣ���
        //������ȼ�ȥ��ƽ���ٶ�����С�ٶȵĲ�ֵռ����ٶ�����С�ٶȲ�ֵ�ı���Ȼ��������������С��ȵĲ�ֵ
    }else{
        resultLineWidth = maxLineWidth-(v-minStrokeV)/(maxStrokeV-minStrokeV)*(maxLineWidth-minLineWidth);
    }

    if(lastLineWidth == -1){
        return resultLineWidth;
    }
    //�ϴε�������ȵ�2/3�ͼ������������ȵ�1/3
    return lastLineWidth*2/3+resultLineWidth*1/3;
}
//�������������֮��ľ���
function calcDistance(loc1,loc2){
    //x1-x2��ƽ��+y1-y2��ƽ���ٿ���
    return Math.sqrt((loc1.x-loc2.x)*(loc1.x-loc2.x)+(loc1.y-loc2.y)*(loc1.y-loc2.y));
}

function windowToCanvas(x,y){
    var bbox = canvas.getBoundingClientRect();
    return {x:Math.round(x-bbox.left),y:Math.round(y-bbox.top)};
}

//�������ָ�
function drawGrid(){
    context.save();//���浱ǰ������״̬
    context.strokeStyle = "rgb(230,11,9)";

    context.beginPath();//��ʼһ��·���������õ�ǰ·��
    context.moveTo(3,3);//��·���ƶ��������е�ָ���㣬����������
    context.lineTo(canvasHeight-3,3);//���һ���µ㣬Ȼ���ٻ����д����Ӹĵ㵽���ָ���������
    context.lineTo(canvasWidth-3,canvasHeight-3);
    context.lineTo(3,canvasHeight-3);
    context.closePath();//�����ӵ�ǰ��ص���ʼ���·��

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
    context.restore();//����֮ǰ�������·��״̬������
}