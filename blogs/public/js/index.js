/**
 * Created by Administrator on 2018/4/16.
 */



$(function(){
    var log_main = $('.log-main');
    var reg_main = $('.reg-main');

    //登录
    var userName = $(".log-username");
    var password = $(".log-password");
    var login = $(".log-login");
    var log_register = $(".log-register");
    var results = $(".result");


   //注册
    var _userName = $(".reg-username");
    var _password = $(".reg-password");
    var _repassword = $(".reg-repassword");
    var _register = $(".reg-register");
    var _reg_login = $(".reg-login")
    var _results = $(".result");


    login.on('click',function(){
        $.ajax({
            url:'/api/user/login',
            type:'post',
            data:{
                username:userName.val(),
                password:password.val()
            },
            dataType:'json',
            success:function(result){
                results.html(result.message);

                results.fadeOut(3000,function(){
                    window.location.reload();
                });

                //

            }
        })
    })
    log_register.on("click",function(){
        log_main.css({
            display:"none"
        })
        reg_main.css({
            display:"block"
        })

    })
        _userName.val('');
        _password.val('');
        _repassword.val('');

   

    _register .on('click',function(){
        $.ajax({
            url:'/api/user/register',
            type:'post',
            data:{
                username:_userName.val(),
                password:_password.val(),
                repassword:_repassword.val()
            },
            dataType:'json',
            success:function(result){
                _results.html(result.message);
                _results.fadeOut(3000)
                if(result.code == 5){
                    log_main.css({
                        display:"block"
                    })
                    reg_main.css({
                        display:"none"
                    })
                }
            }
        })
    })
    _reg_login.on('click',function(){
       log_main.css({
           display:"block"
       })
        reg_main.css({
            display:"none"
        })
       userName.val('');
        password.val('');

    })

   //退出
    var na_exit = $('.na-exit');
    na_exit.on('click',function(){
        $.ajax({
            url:'/api/user/logout',
            success:function(result){
                if(!result.code){
                    window.location.reload();
                }
            }
        })
    })

})

