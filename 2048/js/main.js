// 游戏主逻辑

//定义javascript数组
var board = new Array();
var score = 0;
var hasConflicted = new Array(); //记录每个小格子是否已经发生过计算
var rank = 4;

$(function() {
    var content = $("#content");
    var wrap = $("#wrap");

    var button1 = $("#rank4");
    button1.click(function() {
        rank = 4;
        wrap.css("display", "none")
        content.css("display", "block");
        draw();
        newgame();

    });

    var button2 = $("#rank6");
    button2.click(function() {
        rank = 6;
        wrap.css("display", "none")
        content.css("display", "block");
        draw();
        newgame();

    });

    var button3 = $("#rank8");
    button3.click(function() {
        rank = 8;
        wrap.css("display", "none")
        content.css("display", "block");
        draw();
        newgame();

    });
    var button4 = $("#back");
    button4.click(function(){
        wrap.css("display", "block");
        content.css("display", "none");
        var grid = $("#grid-container");
        grid.html("");
       
    })

})

function draw() {
    var grid = $("#grid-container");
    // grid.css({
    //     width: 120 * rank - 20 + "px",
    //     height: 120 * rank - 20 + "px"
    // })
    
    for (var i = 0; i < rank; i++) {
        for (var j = 0; j < rank; j++) {
            grid.append('<div class="grid-cell" id="grid-cell-' + i + '-' + j + '"></div>')
        }
    }
    var gridCell = $(".grid-cell");
    gridCell.css({
        width:(460+20)/rank-20+"px",
        height:(460+20)/rank-20+"px"
    })
    var button = $("#newgamebutton");
    button.click(function() {
        newgame();

    });
}

function newgame() {
    
    //初始化棋盘格
    init();
    //在随机两个格子生成随机数字
    generateOneNumber();
    generateOneNumber();


}


function init() {
    // 创建二维数组
    //i表示4×4的格子中的行
    for (var i = 0; i < rank; i++) {
        board[i] = new Array();
        hasConflicted[i] = new Array();
        //j表示4×4格子中的列
        for (var j = 0; j < rank; j++) {
           
            //通过双重遍历获取每个格子元素
            var gridCell = $("#grid-cell-" + i + "-" + j);
            //通过getPosTop()方法设置每个格子距顶端的距离
            gridCell.css("top", getPosTop(i, j));
            //通过getPosLeft()方法设置每个格子距左端的距离
            gridCell.css("left", getPosLeft(i, j));
             //将每个格子的值初始化为0
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }
    updataBoardView();
    score = 0;
}

function updataBoardView() {
    $(".number-cell").remove();
    for (var i = 0; i < rank; i++) {
        for (var j = 0; j < rank; j++) {
            $("#grid-container").append("<div class='number-cell' id='number-cell-" + i + "-" + j + "'></div>");
            var numberCell = $("#number-cell-" + i + "-" + j);
            //如果棋盘格的值为0的话，设置数字格的高宽都为0
            if (board[i][j] == 0) {
                numberCell.css({
                    "width": "0px",
                    "height": "0px",
                    "top": getPosTop(i, j) + 50 + "px",
                    "left": getPosLeft(i, j) + 50 + "px",
                    "overflow": "hidden",
                    "font-size":((460+20)/rank-20)*3/5+"px",
                    "line-height":(460+20)/rank-20+"px"
                })
            }
            //如果值不为0，则设置背景颜色
            else {
                numberCell.css({
                    "width": (460+20)/rank-20+"px",
                    "height": (460+20)/rank-20+"px",
                    "top": getPosTop(i, j) + "px",
                    "left": getPosLeft(i, j) + "px",
                    "background-color": getNumberBackgroundColor(board[i][j]),
                    "color": getNumberColor(board[i][j]),
                    "font-size":((460+20)/rank-20)*3/5+"px",
                    "line-height":(460+20)/rank-20+"px"
                })
                numberCell.text(board[i][j]);
            }
            hasConflicted[i][j] = false;
        }
    }

}

function generateOneNumber() {
    if (nospace(board)) {
        return false;
    }
    //生成随机位置
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));

    var times = 0;
    //随机生成空格子
    while (times < 50) {
        //如果当前格子的值为0，满足条件
        if (board[randx][randy] == 0) {
            break;
        }
        //否则重新产生一个随机位置
        var randx = parseInt(Math.floor(Math.random() * 4));
        var randy = parseInt(Math.floor(Math.random() * 4));
        times++;
    }

    if (times == 50) {
        for (var i = 0; i < rank; i++) {
            for (var j = 0; j < rank; j++) {
                if (board[i][j] == 0) {
                    randx = i;
                    randy = j;
                }
            }
        }
    }


    //生成随机数字
    var randNumber = Math.random() < 0.5 ? 2 : 4;
    board[randx][randy] = randNumber;
    //在随机位置上显示出随机的数字
    ShowNumberWithAnimation(randx, randy, randNumber);
    return true;
}


//基于玩家响应的游戏循环
$(document).keydown(function(event) {
    switch (event.keyCode) {
        case 37:
            if (moveLeft()) { //判断是否可以向左移
                setTimeout("generateOneNumber()", 210); //生成一个新数
                setTimeout("isgameover()", 300); //判断游戏是否结束
            }
            break; //左
        case 38:
            if (moveTop()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            }

            break; //上
        case 39:
            if (moveRight()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
            break; //右
        case 40:
            if (moveBottom()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
            break; //下

        default:
            break;
    }
})

//判断游戏是否结束
function isgameover() {
    //棋盘格没有空格而且无法移动
    if (nospace(board) && nomove(board)) {
        gameover();
    }
}

function gameover() {
    alert("gameover");
}

function moveLeft() {

    if (!canMoveLeft(board)) {
        return false;
    }

    //moveLeft
    //落脚位置是否为空
    //落脚位置数字和待判定元素数字相等
    //移动路径中是否有障碍物
    for (var i = 0; i < rank; i++) {
        for (var j = 1; j < rank; j++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < j; k++) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && hasConflicted[i][k] == false) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updataBoardView()", 200);
    return true;
}


function moveTop() {
    if (!canMoveTop(board)) {
        return false;
    }

    //moveTop
for (var j = 0; j < rank; j++) {
    for (var i = 1; i < rank; i++) {
        
            if (board[i][j] != 0) {
                for (var k = 0; k < i; k++) {
                    if (board[k][j] == 0 && noBlockVertical(j, k, i, board)) {
                        //move
                        showMoveAnimation(i, j, k, j);

                        board[k][j] = board[i][j];
                        board[i][j] = 0;

                        continue;
                    } else if (board[k][j] == board[i][j] && noBlockVertical(j, k, i, board) && hasConflicted[k][j] == false) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        updateScore(score);
                        hasConflicted[k][j] = true;
                    }
                }
            }
        }
    }

    setTimeout("updataBoardView()", 200);
    return true;
}


function moveRight() {

    if (!canMoveRight(board)) {
        return false;
    }


    for (var i = 0; i < rank; i++) {
        for (var j = rank - 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                for (var k = rank - 1; k > j; k--) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && hasConflicted[i][k] == false) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updataBoardView()", 200);
    return true;
}


function moveBottom() {
    if (!canMoveBottom(board)) {
        return false;
    }

    //moveBottom
 for (var j = 0; j < rank; j++) {
    for (var i = rank - 2; i >= 0; i--) {
       
            if (board[i][j] != 0) {
                for (var k = rank - 1; k > i; k--) {
                    if (board[k][j] == 0 && noBlockVertical(j, i, k, board)) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[k][j] == board[i][j] && noBlockVertical(j, i, k, board) && hasConflicted[k][j] == false) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        updateScore(score);
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updataBoardView()", 200);
    return true;
}