var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
//ÿ�����־��뻭�����ϱ߾�
var MARGIN_TOP = 60;
//��һ�����־��뻭������߾�
var MARGIN_LEFT = 30;
//���õ���ʱʱ��
var endTime = new Date();
endTime.setTime(endTime.getTime()+3600*1000);
var curShowTimeSeconds = 0;
//���С�������
var balls = [];
//��ɫ
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]

window.onload = function(){
//����Ӧ��Ļ���
    WINDOW_WIDTH = document.body.clientWidth;
    WINDOW_HEIGHT = document.body.clientHeight;
    console.log(WINDOW_WIDTH);
    console.log(WINDOW_HEIGHT);
    MARGIN_LEFT = Math.round(WINDOW_WIDTH /10);
    RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108)-1;
    MARGIN_TOP = Math.round(WINDOW_HEIGHT /5);

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext("2d");

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    curShowTimeSeconds = getCurrentShowTimeSeconds();
    setInterval(
        function(){
            render( context );
            update();
        }
        ,
        100
    );
};

//��ǰ����һ��
function getCurrentShowTimeSeconds() {
    var curTime = new Date();
    var ret = endTime.getTime() - curTime.getTime();
    ret = Math.round( ret/1000 );

    return ret >= 0 ? ret : 0;
}
//ʱ���ˢ�� С��Ļ��ƣ�С���˶��ĸ���
function update(){

    var nextShowTimeSeconds = getCurrentShowTimeSeconds();

    //������һ���ʱ����
    var nextHours = parseInt( nextShowTimeSeconds / 3600);
    var nextMinutes = parseInt( (nextShowTimeSeconds - nextHours * 3600)/60 );
    var nextSeconds = nextShowTimeSeconds % 60;

    //��ǰ��ʱ����
    var curHours = parseInt( curShowTimeSeconds / 3600);
    var curMinutes = parseInt( (curShowTimeSeconds - curHours * 3600)/60 );
    var curSeconds = curShowTimeSeconds % 60

    //�жϸı���ʱ�����Щ����
    if( nextSeconds != curSeconds ){
        //��ǰСʱ��ʮλ����������һ��Ҫ��ʾ��Сʱ��ʮλ�����ͻ������������Ӧ��С��
        if( parseInt(curHours/10) != parseInt(nextHours/10) ){
            addBalls( MARGIN_LEFT + 0 , MARGIN_TOP , parseInt(curHours%10) );
        }
        if( parseInt(curHours%10) != parseInt(nextHours%10) ){
            addBalls( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(curHours/10) );
        }

        if( parseInt(curMinutes/10) != parseInt(nextMinutes/10) ){
            addBalls( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(curMinutes/10) );
        }
        if( parseInt(curMinutes%10) != parseInt(nextMinutes%10) ){
            addBalls( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(curMinutes%10) );
        }

        if( parseInt(curSeconds/10) != parseInt(nextSeconds/10) ){
            addBalls( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(curSeconds/10) );
        }
        if( parseInt(curSeconds%10) != parseInt(nextSeconds%10) ){
            addBalls( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(nextSeconds%10) );
        }

        curShowTimeSeconds = nextShowTimeSeconds;
    }

    updateBalls();
}
//����С��״̬����
function updateBalls(){

    for( var i = 0 ; i < balls.length ; i ++ ){

        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        //�Եײ�������ײ���
        //С��y�����������Ļ�ĸ߶ȼ�ȥС��İ뾶
        if( balls[i].y >= WINDOW_HEIGHT-RADIUS ){
            balls[i].y = WINDOW_HEIGHT-RADIUS;//y��λ��ȡ�ذ��λ��
            balls[i].vy = - balls[i].vy*0.75;//�ٶ�ȡ�෴��λ�ã���һ��������Ч��
        }
    }

    //�����Ż�1 ��С��ĸ����ﵽһ���ĸ���ʱ�����������С��ɾ��
    //�ж�С���Ƿ��ڻ�����
    var cnt = 0;
    for( var i = 0 ; i < balls.length ; i ++ )
        if( balls[i].x + RADIUS > 0 && balls[i].x -RADIUS < WINDOW_WIDTH )
           //��0-cnt-1��С�������ڻ����еģ������Ϲ����С��ǰ�ƣ�
            balls[cnt++] = balls[i];

    while( balls.length >Math.min(300,cnt) ){
        balls.pop();
    }
}
//���С��
//����Ĳ���ΪС���λ�ü����ı��������ֵ�λ�ã������������
function addBalls( x , y , num ){

    //������Ӧ��С��
    for( var i = 0  ; i < digit[num].length ; i ++ )
        for( var j = 0  ; j < digit[num][i].length ; j ++ )
            if( digit[num][i][j] == 1 ){
                var aBall = {
                    x:x+j*2*(RADIUS+1)+(RADIUS+1),//����λ��
                    y:y+i*2*(RADIUS+1)+(RADIUS+1),
                    g:1.5+Math.random(),//���ٶ�
                    vx:Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4,//С���˶���صĲ���
                    vy:-5,//�������׵�Ч��
                    color: colors[ Math.floor( Math.random()*colors.length ) ]//��ɫ
                };

                balls.push( aBall )
            }
}

function render( cxt ){

    cxt.clearRect(0,0,WINDOW_WIDTH, WINDOW_HEIGHT);

    var hours = parseInt( curShowTimeSeconds / 3600);
    var minutes = parseInt( (curShowTimeSeconds - hours * 3600)/60 );
    var seconds = curShowTimeSeconds % 60;

    //������ʱ�����ֻ��Ƴ���
    //Сʱ��ʮλ����
    renderDigit( MARGIN_LEFT , MARGIN_TOP , parseInt(hours/10) , cxt );
    //��������7*10�ľ�����ɣ�Ϊ�˺��ұ���һ�����루7*2=14 14+1=15��ÿ�������ڻ�����ռ�Ŀ����15*(RADIUS+1)
    //Сʱ�ĸ�λ����
    //cxt��ͼ�����Ļ���
    renderDigit( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(hours%10) , cxt );
    renderDigit( MARGIN_LEFT + 30*(RADIUS + 1) , MARGIN_TOP , 10 , cxt );
    renderDigit( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(minutes/10) , cxt);
    renderDigit( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(minutes%10) , cxt);
    renderDigit( MARGIN_LEFT + 69*(RADIUS+1) , MARGIN_TOP , 10 , cxt);
    renderDigit( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(seconds/10) , cxt);
    renderDigit( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(seconds%10) , cxt);

    for( var i = 0 ; i < balls.length ; i ++ ){
        cxt.fillStyle=balls[i].color;

        cxt.beginPath();
        cxt.arc( balls[i].x , balls[i].y , RADIUS , 0 , 2*Math.PI , true );
        cxt.closePath();

        cxt.fill();
    }
}

//��Ⱦ���֣���������
function renderDigit( x , y , num , cxt ){

    cxt.fillStyle = "rgb(0,102,153)";

    for( var i = 0 ; i < digit[num].length ; i ++ )
        for(var j = 0 ; j < digit[num][i].length ; j ++ )
            if( digit[num][i][j] == 1 ){
                //����С��
                cxt.beginPath();
                cxt.arc( x+j*2*(RADIUS+1)+(RADIUS+1) , y+i*2*(RADIUS+1)+(RADIUS+1) , RADIUS , 0 , 2*Math.PI );//��Բ
                cxt.closePath();

                cxt.fill()
            }
}

