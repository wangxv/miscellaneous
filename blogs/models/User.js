/**
 * Created by Administrator on 2018/4/15.
 */
var mongoose = require('mongoose');
var userSchema = require('../schemas/user');

module.exports = mongoose.model('User',userSchema);