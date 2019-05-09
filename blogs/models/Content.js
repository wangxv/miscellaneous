/**
 * Created by Administrator on 2018/4/19.
 */
var mongoose = require('mongoose');
var contentsSchema = require('../schemas/contents');

module.exports = mongoose.model('Content',contentsSchema);