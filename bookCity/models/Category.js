/**
 * Created by Administrator on 2018/4/25.
 */

var mongoose = require('mongoose');
var categoriesSchema = require('../schemas/categories');

module.exports = mongoose.model('Category',categoriesSchema);


