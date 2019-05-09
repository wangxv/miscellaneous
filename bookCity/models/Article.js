/**
 * Created by Administrator on 2018/4/24.
 */

var mongoose = require('mongoose');
var articleSchema = require('../schemas/article');

module.exports = mongoose.model('Article',articleSchema);

