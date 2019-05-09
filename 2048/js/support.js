// 游戏基础逻辑
// 

function getPosTop(i, j) {
    return 20 + i * ((460 + 20) / rank);

}

function getPosLeft(i, j) {
    return 20 + j * ((460 + 20) / rank);
}

function getNumberBackgroundColor(number) {
    switch (number) {
        case 2:
            return "#eee4da";
            break;
        case 4:
            return "#ede0c8";
            break;
        case 8:
            return "#f2b179";
            break;
        case 16:
            return "#f59563";
            break;
        case 32:
            return "#f67c5f";
            break;
        case 64:
            return "#f65e3b";
            break;
        case 128:
            return "#edcf72";
            break;
        case 256:
            return "#edcc61";
            break;
        case 512:
            return "#9c0";
            break;
        case 1024:
            return "#33b5e5";
            break;
        case 2048:
            return "#09c";
            break;
        case 4096:
            return "#a6c";
            break;
        case 8192:
            return "#93c";
            break;
    }
}

function getNumberColor(number) {
    if (number <= 4) {
        return "#776e65";
    }
    return "white";
}

//判断棋盘格是否还有空间
function nospace(board) {
    for (var i = 0; i < rank; i++) {
        for (var j = 0; j < rank; j++) {
            if (board[i][j] == 0) {
                return false;
            }
        }
    }
    return true;
}
//判断棋盘格是否可以移动  无法移动返回true
function nomove(board) {
    if (canMoveLeft(board) || canMoveTop(board) || canMoveRight(board) || canMoveBottom(board)) {
        return false;
    }
    return true;
}


//是否能向左移动
//左边是否没有数字？
//左边数字是否和自己相同
function canMoveLeft(board) {
    for (var i = 0; i < rank; i++) {
        for (var j = 1; j < rank; j++) {
            if (board[i][j] != 0) {
                if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveTop(board) {
    for (var j = 0; j < rank; j++) {
        for (var i = 1; i < rank; i++) {

            if (board[i][j] != 0) {
                if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveRight(board) {
    for (var i = 0; i < rank; i++) {
        for (var j = rank - 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}


function canMoveBottom(board) {
    for (var j = 0; j < rank; j++) {
        for (var i = rank - 2; i >= 0; i--) {

            if (board[i][j] != 0) {
                if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}
//判断第row行，从col1到col2，看是否board是否不为0
function noBlockHorizontal(row, col1, col2, board) {
    for (var m = col1 + 1; m < col2; m++) {
        if (board[row][m] != 0) {
            return false;
        }
    }
    return true;
}
//判断第col列，从row1到row2，判断board的值是否不为0
function noBlockVertical(col, row1, row2, board) {
    for (var m = row1 + 1; m < row2; m++) {
        if (board[m][col] != 0) {
            return false;
        }
    }
    return true;
}