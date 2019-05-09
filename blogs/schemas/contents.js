/**
 * Created by Administrator on 2018/4/19.
 */

var mongoose = require('mongoose');

//内容的表结构
module.exports = new mongoose.Schema({
    //关联字段-内容分类的id
    category:{
      //类型
        type:mongoose.Schema.Types.ObjectId,
        //引用
        ref:'Category'

    },
    //分类标题
    title:String,
    //用户
    user:{
        //类型
        type:mongoose.Schema.Types.ObjectId,
        //引用
        ref:'User'

    },
    //时间
    addTime:{
        //类型
       type:Date,
        default:new Date()

    },
    //阅读量
    views:{
        type:Number,
        default:0
    },
    //简介
    discription:{
        type:String,
        default:''
    },
    //内容
    content:{
        type:String,
        default:''
    },
    //评论
    comments:{
        type:Array,
        default:[]
    }
});