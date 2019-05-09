function sortName(arr,DATA) {
    //将联系人按首字母分类存储
    var alObj = {
        "A": [],
        "B": [],
        "C": [],
        "D": [],
        "E": [],
        "F": [],
        "G": [],
        "H": [],
        "I": [],
        "J": [],
        "K": [],
        "L": [],
        "M": [],
        "N": [],
        "O": [],
        "P": [],
        "Q": [],
        "R": [],
        "S": [],
        "T": [],
        "U": [],
        "V": [],
        "W": [],
        "X": [],
        "Y": [],
        "Z": []
    };

    // 循环联系人名单
    for (var i = 0; i < arr.length; i++) {
        //传入联系人姓名返回联系人姓的首字母
        var alphbet = sortName1(arr[i].name, DATA);

        //将联系人按首字母分类
        switch (alphbet) {
            case 'A':
                arr[i].alphbet = alphbet;
                alObj.A.push(arr[i]);
                continue;
            case 'B':
            arr[i].alphbet = alphbet;
                alObj.B.push(arr[i]);
                continue;
            case 'C':
            arr[i].alphbet = alphbet;
                alObj.C.push(arr[i]);
                continue;
            case 'D':
            arr[i].alphbet = alphbet;
                alObj.D.push(arr[i]);
                continue;
            case 'E':
            arr[i].alphbet = alphbet;
                alObj.E.push(arr[i]);
                continue;
            case 'F':
            arr[i].alphbet = alphbet;
                alObj.F.push(arr[i]);
                continue;
            case 'G':
            arr[i].alphbet = alphbet;
                alObj.G.push(arr[i]);
                continue;
            case 'H':
            arr[i].alphbet = alphbet;
                alObj.H.push(arr[i]);
                continue;
            case 'I':
            arr[i].alphbet = alphbet;
                alObj.I.push(arr[i]);
                continue;
            case 'J':
            arr[i].alphbet = alphbet;
                alObj.J.push(arr[i]);
                continue;
            case 'K':
            arr[i].alphbet = alphbet;
                alObj.K.push(arr[i]);
                continue;
            case 'L':
            arr[i].alphbet = alphbet;
                alObj.L.push(arr[i]);
                continue;
            case 'M':
            arr[i].alphbet = alphbet;
                alObj.M.push(arr[i]);
                continue;
            case 'N':
            arr[i].alphbet = alphbet;
                alObj.N.push(arr[i]);
                continue;
            case 'O':
            arr[i].alphbet = alphbet;
                alObj.O.push(arr[i]);
                continue;
            case 'P':
            arr[i].alphbet = alphbet;
                alObj.P.push(arr[i]);
                continue;
            case 'Q':
            arr[i].alphbet = alphbet;
                alObj.Q.push(arr[i]);
                continue;
            case 'R':
            arr[i].alphbet = alphbet;
                alObj.R.push(arr[i]);
                continue;
            case 'S':
            arr[i].alphbet = alphbet;
                alObj.S.push(arr[i]);
                continue;
            case 'T':
            arr[i].alphbet = alphbet;
                alObj.T.push(arr[i]);
                continue;
            case 'U':
            arr[i].alphbet = alphbet;
                alObj.U.push(arr[i]);
                continue;
            case 'V':
            arr[i].alphbet = alphbet;
                alObj.V.push(arr[i]);
                continue;
            case 'W':
            arr[i].alphbet = alphbet;
                alObj.W.push(arr[i]);
                continue;
            case 'X':
            arr[i].alphbet = alphbet;
                alObj.X.push(arr[i]);
                continue;
            case 'Y':
            arr[i].alphbet = alphbet;
                alObj.Y.push(arr[i]);
                continue;
            case 'Z':
            arr[i].alphbet = alphbet;
                alObj.Z.push(arr[i]);
                continue;
        }
    }

    return alObj;

}

//将姓名和字母姓名表传入返回姓名首字母
function sortName1(name, obj) {
    var alName = name.charAt(0);
    return obj[alName];
}