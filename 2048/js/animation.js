// 游戏动画逻辑
function ShowNumberWithAnimation(i, j, randNumber) {
    //获取当前数字格
    var numberCell = $("#number-cell-" + i + "-" + j);
    //设置当前的数字的背景色和数字值
    numberCell.css({
        "background-color": getNumberBackgroundColor(randNumber),
        "color": getNumberColor(randNumber),
        "font-size":((460+20)/rank-20)*3/5+"px",
        "line-height":(460+20)/rank-20+"px"

    })
    numberCell.text(randNumber);
    //设置当前的数字格的显示动画
    numberCell.animate({
        width: (460+20)/rank-20+"px",
        height: (460+20)/rank-20+"px",
        top: getPosTop(i, j),
        left: getPosLeft(i, j)
    }, 50)
}

function showMoveAnimation(fromx, fromy, tox, toy) {
    var numberCell = $('#number-cell-' + fromx + '-' + fromy);
    numberCell.animate({
        top: getPosTop(tox, toy),
        left: getPosLeft(tox, toy)
    }, 200);
}

function updateScore(score) {
    $("#score").text(score);
}