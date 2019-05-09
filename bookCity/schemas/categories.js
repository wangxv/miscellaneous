/**
 * Created by Administrator on 2018/4/25.
 */
var mongoose = require('mongoose');

//分类的表结构
module.exports = new mongoose.Schema({
    //分类名
    name:String
});
