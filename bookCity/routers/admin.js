/**
 * Created by Administrator on 2018/4/23.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Book = require('../models/Book');
var Category = require('../models/Category');
var Article = require('../models/Article');

/**
 * 首页
 */
router.get('/',function(req,res,next){
    res.render('admin/index',{
        userInfo:req.userInfo
    });
})

/**
 *用户管理
 */
router.get('/userMessage',function(req,res,next){

    User.find().then(function(result){
        res.render('admin/userMessage',{
            userInfo:req.userInfo,
            userlists:result
        })
    })

})

/**
 *图书管理
 */
router.get('/book_message',function(req,res,next){
    Book.find().populate(['book_type','author']).then(function(result){
        res.render('admin/book_message',{
            userInfo:req.userInfo,
            booklists:result
        })
    })

})
/**
 * 图书删除
 */
router.get('/book_message/delete',function(req,res,next){
    var id = req.query.id || '';
    Book.remove({
        _id:id
    }).then(function(){
        res.render('admin/success',{
            userInfo:req.userInfo,
            message:'删除成功',
            url:'/admin/book_message'
        });
    })
})

/**
 * 图书编辑
 */
router.get('/book_message/edit',function(req,res){
    //获取要修改的分类的信息，并且用表单的形式展示出来
    var id = req.query.id || '';
    var categories = [];

    Category.find().sort({_id:-1}).then(function(rs){
        categories=rs;
        //获取要修改的分类的信息
        return Book.findOne({
            _id: id
        }).populate('category');
    }).then(function(content){
        if(!content){
            res.render('admin/error',{
                userInfo:req.userInfo,
                message:'指定内容不存在'
            });
            return Promise.reject();
        }else{
            res.render('admin/book_edit',{
                userInfo:req.userInfo,
                content:content,
                categories:categories
            })
        }

    })
})
/**
 * 内容修改保存
 */
router.post('/book_message/edit',function(req,res){
    var id = req.query.id || '';

    if(req.body.category == ''){
        res.render('admin/error',{
            userInfo:req.userInfo,
            message:'图书分类不能为空'
        });
    }

    if(req.body.bookname == ''){
        res.render('admin/error',{
            userInfo:req.userInfo,
            message:'图书名称不能为空'
        });
    }

    Book.update({
        _id:id
    },{
        book_type:req.body.category.toString(),
        bookname:req.body.bookname,
        book_info:req.body.description,
    }).then(function(){
        res.render('admin/success',{
            userInfo:req.userInfo,
            message:'内容保存成功',
            url:'/admin/book_message'
        });
    })
})



/**
 *分类管理
 */
router.get('/category_message',function(req,res){
    Category.find().then(function(result){
        res.render('admin/category_message',{
            userInfo:req.userInfo,
            categories:result
        })
    })
})

/**
 * 分类删除
 */
router.get('/category_message/delete',function(req,res,next){
    var id = req.query.id || '';
    Category.remove({
        _id:id
    }).then(function(){
        res.render('admin/success',{
            userInfo:req.userInfo,
            message:'删除成功',
            url:'/admin/category_message'

        });
    })
})

/**
 *添加分类
 */
router.get('/category_add',function(req,res){
    res.render('admin/category_add',{
        userInfo:req.userInfo
    })
})
/**
 * 分类创建
 */
router.post('/category_add',function(req,res){

    var name =  req.body.name || '' ;
    //console.log(req.body);
    if(name == ''){
        res.render('admin/error',{
            userInfo:req.userInfo,
            message:"名称不能为空"
        });
        return ;
    }

    //数据库中是否存在同名分类名称
    Category.findOne({
        name:name
    }).then(function(rs){
        if(rs){
            //数据库中已经存在该分类了
            res.render('admin/error',{
                userInfo:req.userInfo,
                message:"分类已经存在了"
            })
            return Promise.reject();
        }else{
            //数据库中无分类
            return new Category({
                name:name
            }).save();
        }
    }).then(function(newCategory){
        res.render("admin/success",{
            userInfo:req.userInfo,
            message:'分类保存成功',
            url:'/admin/category_message'

        });
    })
})
/**
 * 分类修改
 */
router.get('/category_message/edit',function(req,res){
    //获取要修改的分类的信息，并且用表单的形式展示出来
    var id = req.query.id || '';

    Category.findOne({
        _id:id
    }).then(function(category){
        if(!category){
            res.render('admin/error',{
                userInfo:req.userInfo,
                message:'分类信息不存在'
            });
            return Promise.reject();
        }else{
            res.render('admin/category_edit',{
                userInfo:req.userInfo,
                category:category
            })
        }

    })
})
/**
 * 分类修改保存
 */
router.post('/category_message/edit',function(req,res){
    var id = req.query.id || '';
    var name =req.body.name || '';
    Category.findOne({
        _id:id
    }).then(function(category){
        if(!category){
            res.render('admin/error',{
                userInfo:req.userInfo,
                message:'分类信息不存在'
            });
            return Promise.reject();
        }else{
            //当用户没有做任何的修改提交的时候
            if(name == category.name){
                res.render('admin/error',{
                    userInfo:req.userInfo,
                    message:'修改成功',
                    url:'/admin/category_message'
                });
                return Promise.reject();
            }else{
                //要修改的分类名称是否已经在数据库中存在
                return Category.findOne({
                    _id:{$ne:id},
                    name:name
                })
            }
        }

    }).then(function(sameCategory){
        if(sameCategory){
            res.render('admin/success',{
                userInfo:req.userInfo,
                message:'数据库中已存在同名分类'
            });
            return Promise.reject();
        }else{
            return  Category.update({
                _id:id
            },{
                name:name
            })
        }
    }).then(function(){
        res.render('admin/success',{
            userInfo:req.userInfo,
            message:'修改成功',
            url:'/admin/category_message'
        });
    })
})

/**
 *添加图书
 */
router.get('/book_message/book_add',function(req,res){
    Category.find().sort({_id:-1}).then(function(categories) {
        res.render('admin/book_add', {
            userInfo: req.userInfo,
            categories:categories
        })
    })
})
/**
 * 图书保存
 */
router.post('/book_message/book_add',function(req,res){

    var category = req.body.category;
    var bookname = req.body.bookname;
    var description = req.body.description;

    if(category == ''){
        res.render('admin/error',{
            userInfo:req.userInfo,
            message:'内容分类不能为空',
            url:'/admin/book_add'
        })
        return;
    }
    if(bookname==''){
        res.render('admin/error',{
            userInfo:req.userInfo,
            message:'内容标题不能为空',
            url:'/admin/book_add'
        })
        return;
    }
    //保存数据到数据库
    new Book({
        book_type:category,
        bookname:bookname,
        book_info:description,
        author:req.userInfo._id.toString()

    }).save().then(function(rs){
            res.render('admin/success',{
                userInfo:req.userInfo,
                message:'内容保存成功',
                url:'/admin/book_message'
            })
        });

})

/**
 * 文章管理
 */

router.get('/article_message',function(req,res,next){
    Article.find().populate(['bookcategory','author']).then(function(result){
           //  console.log(result);
        res.render('admin/article_message',{
            userInfo:req.userInfo,
            articlelists:result
        })
    })

})

/**
 * 文章删除
 */
router.get('/article_message/delete',function(req,res){

    var id = req.query.id || '';
    Article.remove({
        _id:id
    }).then(function(){
        res.render('admin/success',{
            userInfo:req.userInfo,
            message:'删除成功',
            url:'/admin/article_message'
        });
    })
})


/**
 * 添加文章
 */

router.get('/article_message/add',function(req,res){
    Book.find().sort({_id:-1}).then(function(categories) {
        res.render('admin/article_add', {
            userInfo: req.userInfo,
            bookcategories:categories
        })
    })
})

/**
 * 提交文章
 */
router.post('/article_message/add',function(req,res){

    var articlename = req.body.articlename;
    var bookcategory = req.body.bookcategory;
    var articleinfo = req.body.articleinfo;

    if(articlename == ''){
        res.render('admin/error',{
            userInfo:req.userInfo,
            message:'内容分类不能为空',
            url:'/admin/article_add'
        })
        return;
    }
    if(bookcategory==''){
        res.render('admin/error',{
            userInfo:req.userInfo,
            message:'内容标题不能为空',
            url:'/admin/article_add'
        })
        return;
    }

    //保存数据到数据库
    new Article({
        articlename:articlename,
        bookcategory:bookcategory,
        articleinfo:articleinfo,
        author:req.userInfo._id.toString()

    },false).save().then(function(rs){
            res.render('admin/success',{
                userInfo:req.userInfo,
                message:'内容保存成功',
                url:'/admin/article_message'
            })
        });
})

/**
 * 文章编辑
 */
router.get('/article_message/edit',function(req,res){
    //获取要修改的分类的信息，并且用表单的形式展示出来
    var id = req.query.id || '';
    var books = [];


    Book.find().sort({_id:-1}).then(function(rs){
        books=rs;
        return Article.findOne({
            _id: id
        });
    }).then(function(content){

        if(!content){
            res.render('admin/error',{
                userInfo:req.userInfo,
                message:'指定内容不存在'
            });
            return Promise.reject();
        }else{
            res.render('admin/article_edit',{
                userInfo:req.userInfo,
                content:content,
                books:books
            })
        }

    })
})
/**
 * 文章修改保存
 */
router.post('/article_message/edit',function(req,res){

    var id = req.query.id || '';


    if(req.body.articlename == ''){
        res.render('admin/error',{
            userInfo:req.userInfo,
            message:'文章名称不能为空'
        });
    }

    Article.update({
        _id:id
    },{
        articlename:req.body.articlename,
        bookcategory:req.body.book,
        articleinfo:req.body.articleinfo
    }).then(function(){
        res.render('admin/success',{
            userInfo:req.userInfo,
            message:'内容保存成功',
            url:'/admin/article_message'
        });
    })
})




module.exports = router;