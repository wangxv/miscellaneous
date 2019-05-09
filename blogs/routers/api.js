/**
 * Created by Administrator on 2018/4/15.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Content = require('../models/Content');

//统一返回格式
var responseData;


router.use(function(req,res,next){
    responseData = {
        code:0,
        message:''
    }
    next();

})


/**
 * 登录
 * 如果用户名不存在，提醒用户注册
 * 如果用户密码错误，提示密码错误
 * 如果用户名密码正确，登录成功
 */
router.post('/user/login',function(req,res,next){

    var username = req.body.username;
    var password = req.body.password;

    if(username == '' || password==''){
        responseData.code = 1;
        responseData.message = '用户名或密码不能为空';
        res.json(responseData);
        return;
    }

    User.findOne({
        username:username,
        password:password
    }).then(function(userInfo){
        if(!userInfo){
            responseData.code = 2;
            responseData.message = '用户名或密码错误';
            res.json(responseData);
            return;
        }
        responseData.message = '登录成功';
        responseData.userInfo = {
            _id:userInfo._id,
            username:userInfo.username
        }
        req.cookies.set('userInfo',JSON.stringify({
            _id:userInfo._id,
            username:userInfo.username
        }));
        res.json(responseData);
        return;
    })


})






/**
 * 用户注册
 *
 * 1.用户名不能为空
 * 2.密码不能为空
 * 3.两次输入密码必须一致
 *
 * 1.用户是否已经被注册
 *     数据库查询
 */
router.post('/user/register',function(req,res,next){
    var _username = req.body.username;
    var _password = req.body.password;
    var _repassword = req.body.repassword;
    //用户名是否为空
    if(_username == ''){
        responseData.code = 1;
        responseData.message = '用户名不能为空';
        res.json(responseData);
        return;
    }
    //密码是否为空
    if(_password == ''){
        responseData.code = 2;
        responseData.message = '密码不能为空';
        res.json(responseData);
        return;
    }
    //两次输入密码不一致
    if(_password != _repassword){
        responseData.code = 3;
        responseData.message = '两次输入密码必须一致';
        res.json(responseData);
        return;
    }

    //用户名是否已经被注册，如果数据库中已经存在和我们要注册的用户名同名的数据表示已经注册
    User.findOne({
        username:_username
    }).then(function(userInfo){
        //console.log(userInfo);
        //如果存在表示数据库中有该记录
        if(userInfo){
            responseData.code = 4;
            responseData.message = '用户名已经被注册';
            res.json(responseData);
            return ;
        }
        //用户名没有被注册 保持用户注册信息到数据库中
        var user = new User({
            username:_username,
            password:_password
        });
        user.save();//将数据保存到数据库
    }).then(function(newUserInfo){

        responseData.code = 5;
        responseData.message = '注册成功';
        res.json(responseData);
    })


})

/**
 *  退出
 */
router.get('/user/logout',function(req,res){
    req.cookies.set('userInfo',null);
    responseData.message = '退出成功';
    res.json(responseData);
})


/**
 * 获取指定文章的所有评论
 */
router.get('/comment',function(req,res){
    var contentId = req.query.contentid || '';

    Content.findOne({
        _id:contentId
    }).then(function(content){
        responseData.data = content.comments;
        res.json(responseData);
    })
})


/**
 * 评论提交
 */
router.post('/comment/post',function(req,res){

    //内容的id
    var contentId = req.body.contentid || '';
    var postData = {
        username:req.userInfo.username,
        postTime:new Date(),
        content:req.body.content
    }

    //查询当前这篇内容的信息
    Content.findOne({
        _id:contentId
    }).then(function(content){
        content.comments.push(postData);
        return content.save();
    }).then(function(newContent){
        responseData.message = '评论成功';
        responseData.data = newContent;
        res.json(responseData)
    })
})




module.exports = router;