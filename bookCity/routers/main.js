/**
 * Created by Administrator on 2018/4/23.
 */
/**
 * Created by Administrator on 2018/4/23.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Book = require('../models/Book');
var Category = require('../models/Category');
var Article = require('../models/Article');

router.get('/',function(req,res,next){

    Category.find().then(function(result){
        Book.find().populate(['book_type','author']).then(function(result1){
            res.render('main/index',{
                userInfo:req.userInfo,
                categories:result,
                books:result1
            });
        })

    })
})
//进行分类展示
router.get('/category',function(req,res){

})



module.exports = router;