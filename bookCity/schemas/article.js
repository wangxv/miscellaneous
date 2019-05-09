/**
 * Created by Administrator on 2018/4/24.
 */

var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    //文章名
    articlename:String,
    //作者
    author:{
        //类型
        type:mongoose.Schema.Types.ObjectId,
        //引用
        ref:'User'
    },
    //时间
    article_time:{
        type:Date,
        default:new Date()
    },
    bookcategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Book'
    },
    //内容
    articleinfo:String
});

