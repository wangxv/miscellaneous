/**
 * Created by Administrator on 2018/4/24.
 */
var mongoose = require('mongoose');
var bookSchema = require('../schemas/book');

module.exports = mongoose.model('Book',bookSchema);

