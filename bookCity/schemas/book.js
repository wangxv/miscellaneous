/**
 * Created by Administrator on 2018/4/24.
 */
var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    //书名
    bookname:String,
    //作者
    author:{
        //类型
        type:mongoose.Schema.Types.ObjectId,
        //引用
        ref:'User'

    },
    //时间
    book_time:{
        type:Date,
        default:new Date()
    },
    //简介
    book_info:String,

    //书类型
    book_type:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    //书内容
    book_content:{
        type:Array,
        default:[]
    },
    book_imgurl:{
        type:String,
        default:'/public/imgs/book1.jpg'
    }

})



