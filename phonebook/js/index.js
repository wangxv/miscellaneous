    $(document).ready(function() {
        var PERSONDATA = {};

        //获取屏幕宽高
        var height = $(window).height();
        var width = $(window).width();


        var phonebook = $("#phonebook");
        var sidebar = $(".sidebar");
        var addperson = $(".addperson");
        var list_ul = $("#list");
        var detail = $("#detail");
        var phonebook = $("#phonebook");
        var detailBtn = $(".detail-btn");
        var detailChange = $("#detail-change");
        var detailMessage = $(".detail-message");
        var name = $(".name");
        var addperson = $(".addperson");
        var addpop = $(".addpop");
        var save = $(".save");
        var exit = $(".exit");


        var sideHeight = sidebar.css("height");
        var addWeight = addperson.css("width");
        var phoneWeight = phonebook.css("width");

        var msTop = (height - parseInt(sideHeight)) / 2;
        var maLeft = (width - parseInt(addWeight)) / 2;


        sidebar.css({
            "margin-top": msTop + "px"
        })
        addperson.css({
            "margin-left": maLeft + "px"
        })
        list_ul.css({
            "margin-top": msTop + "px"
        });
        name.css({
            "width": (width - 150) + "px"
        })
        addpop.css({
            "width":width+"px",
            "height":height+"px"
        })


        // 添加联系人
        addperson.click(function(){
             addpop.css({
                "display":"block"
             });
             phonebook.css({
                "display":"none"
             });

        })

        // 保存
        save.click(function(){

          var name = $("#name").val();
          var telephone =$("#telephone").val();
          var address = $("#address").val();
          var intro = $("#intro").val();

          var addMessage={
            "name":name,
            "telephone":telephone,
            "address":address,
            "intro":intro
          };

          $.ajax({
            url:"ctrl/add.php",
            type:"POST",
            data:addMessage,
            dataType:"json",
            success:function(data){
               //console.log(data);
              getPerson();
               
            }
          })

        addpop.css({
                "display":"none"
             });
             phonebook.css({
                "display":"block"
             });
        })
        // 退出
        exit.click(function(){
           addpop.css({
                "display":"none"
             });
             phonebook.css({
                "display":"block"
             });
        })

        // 联系人列表
        detailBtn.click(function() {
            detail.css({
                "display": "none"
            });
            phonebook.css({
                "display": "block"
            })
        })
        // 修改联系人信息
        detailChange.click(function(){
            var id = $(".id").attr("id");
            var detailName = $(".detail-name input").val();
            var detailTele = $(".detail-tenumber input").val();
            var detailAddress = $(".detail-address input").val();
            var detailIntro = $(".detail-intro textarea").val();



            var changeMessage={
            "id":id,
            "name":detailName,
            "telephone":detailTele,
            "address":detailAddress,
            "intro":detailIntro
          };

          $.ajax({
            url:"ctrl/change.php",
            type:"POST",
            data:changeMessage,
            dataType:"json",
            success:function(data){
               //console.log(data);
              getPerson();
               
            }
          })


        })
        
        list_ul.click(function(event) {
            var _target = event.target;

            var id = $(_target).attr("id") || "";

            if (id) {
                var data = PERSONDATA[id];
                var tem = ` <div  class="id" id="`+id+`"></div>
                            <div class="detail-name ">姓名：<input class="detail-input" type="text" value="` + data.name + `" />
                            </div>
                            <div class="detail-tenumber">
                                电话：<input class="detail-input" type="text" value="` + data.tele_number + `" />
                            </div>
                            <div class="detail-address ">
                               地址：<input class="detail-input" type="text" value=" ` + data.address + `" />
                            </div>
                            <div class="detail-intro ">
                               备注：<br/><textarea class="detail-textarea" cols="40"  rows="50" > ` + data.intro + `"</textarea>
                            </div>
                          `;

                detailMessage.html(tem);
                detail.css({
                    "display": "block"
                });
                phonebook.css({
                    "display": "none"
                })

            }
        })
       getPerson();
        //从后台请求回来联系人列表
      function getPerson(){
        $.getJSON("ctrl/index.php", "", function(json) {

            var list = sortName(json);
             var templet ="";
            for (i in list) {
               
                if (list[i].length > 0) {

                    templet += `<li class="group clearfix">
                                       <div class="group-name">` + i + `</div>
                                       <ul class="group-person">
                                   `;

                    for (var j = 0; j < list[i].length; j++) {
                        templet += ` 
                                     <li class="person clearfix" >
                                        <img src="imgs/user.png" alt="" class="img">
                                        <span class="name" id="` + list[i][j].id + `">` + list[i][j].name + `</span>
                                     </li>
                                    
                                   `;
                        //将id和联系人信息联接
                        PERSONDATA[list[i][j].id] = list[i][j];
                    }

                    templet += '</ul></li>';
                    
                }
               

            }
             list_ul.html(templet);
        })
      }
        


        function sortName(arr) {
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
                        alObj.A.push(arr[i]);
                        continue;
                    case 'B':
                        alObj.B.push(arr[i]);
                        continue;
                    case 'C':
                        alObj.C.push(arr[i]);
                        continue;
                    case 'D':
                        alObj.D.push(arr[i]);
                        continue;
                    case 'E':
                        alObj.E.push(arr[i]);
                        continue;
                    case 'F':
                        alObj.F.push(arr[i]);
                        continue;
                    case 'G':
                        alObj.G.push(arr[i]);
                        continue;
                    case 'H':
                        alObj.H.push(arr[i]);
                        continue;
                    case 'I':
                        alObj.I.push(arr[i]);
                        continue;
                    case 'J':
                        alObj.J.push(arr[i]);
                        continue;
                    case 'K':
                        alObj.K.push(arr[i]);
                        continue;
                    case 'L':
                        alObj.L.push(arr[i]);
                        continue;
                    case 'M':
                        alObj.M.push(arr[i]);
                        continue;
                    case 'N':
                        alObj.N.push(arr[i]);
                        continue;
                    case 'O':
                        alObj.O.push(arr[i]);
                        continue;
                    case 'P':
                        alObj.P.push(arr[i]);
                        continue;
                    case 'Q':
                        alObj.Q.push(arr[i]);
                        continue;
                    case 'R':
                        alObj.R.push(arr[i]);
                        continue;
                    case 'S':
                        alObj.S.push(arr[i]);
                        continue;
                    case 'T':
                        alObj.T.push(arr[i]);
                        continue;
                    case 'U':
                        alObj.U.push(arr[i]);
                        continue;
                    case 'V':
                        alObj.V.push(arr[i]);
                        continue;
                    case 'W':
                        alObj.W.push(arr[i]);
                        continue;
                    case 'X':
                        alObj.X.push(arr[i]);
                        continue;
                    case 'Y':
                        alObj.Y.push(arr[i]);
                        continue;
                    case 'Z':
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
    })