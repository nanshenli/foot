var add = require("../models/add.js");
var sort = require("../models/sort.js");//添加商品分类
var formidable = require("formidable");
var df = require("date-format");
var fs = require("fs");
var path = require("path");
//进入商品分类页面
exports.showIndex = function (req, res) {
    res.render("index.ejs")
};

//进入商品列表页面
exports.showList = function (req, res) {
    res.type('html');
    res.render("list")
};

//进入添加商品页面
exports.showAdd = function (req, res) {
    res.type('html');
    res.render("add")
};

//获取所有商品分类
exports.gainsort = function (req, res) {
    sort.find({},function (err,data) {
        res.json({"result":data})
    })
};

//添加商品分类
exports.addsort = function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        sort.find({"sort": fields.sort}, function (err, data) {
            if (data.length == 0) {
                var json = new sort(fields)
                json.save(function (err) {
                    if (err) {
                        res.json({"result": -1});
                        return;
                    } else {
                        res.json({"result": 1});
                        return;
                    }
                })
            }
            else {
                res.json({"result": -2})
            }
        })
    })
};

//删除商品分类
exports.sortDelete=function (req,res) {
    var id=req.params.id;
    sort.find({"_id":id},function (err,results) {
        if(err || results.length == 0){
            res.json({"result" : -1});
            return;
        }
        results[0].remove(function(err){
            if(err){
                res.json({"result" : -1});
                return;
            }
            res.json({"result" : 1});
        });
    })
};

//修改商品分类
exports.Altercar=function (req,res) {
    var id=req.params.id;
    sort.findOne({"_id":id},function (err,data) {
        if (err){
            res.json({"result":-1});
            return;
        }
        res.json({"result":data});
    })
};

// 修改提交
exports.updatecar=function (req,res) {
    var id=req.params.id;
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        sort.find({"_id":id},function (err,data) {
            if (data.length==0){
                res.json({"result":-1});
            }
            console.log(data[0])
            var result=data[0];
            result.sort=fields.sort;
            result.save(function (err) {
                if (err){
                    res.json({"result":-1})
                    return;
                }
                res.json({"result":1})
            })
        })
    })
};

//添加商品
exports.addList = function (req, res) {
    var form = new formidable.IncomingForm();
    form.uploadDir = "./uploads";
    form.parse(req, function (err, fields, files) {
        var newname = df('yyyyMMddhhmmssSSS', new Date());
        fs.rename(files.tupian.path, "./uploads/" + newname + ".jpg", function (err) {
            if (err) {
                res.end("error");
                return;
            }
            add.create({
                "fenlei" : fields.fenlei ,
                "name" : fields.name ,
                "price" : fields.price ,
                "sort" : fields.sort ,
                "tupian" : newname,
                "neirong" : fields.neirong ,
                "zhuangtai" : fields.zhuangtai,
                "jingpin" : fields.jingpin ,
                "rexiao" : fields.rexiao
            },function (err,data) {
                res.send("<a href='/list'>成功</a>")
                // res.render("list")
                // res.json({"result":1})
            })
        });
    });
};

//获取所有商品分类
exports.gainlist = function (req, res) {
    add.find({}).sort({"sort": -1}).exec(function (err, data) {
        res.json({"result":data})
    })
};

//删除商品
exports.deleteList=function (req,res) {
    var id=req.params.id;
    add.find({"_id":id},function (err,results) {
        if(err || results.length == 0){
            res.json({"result" : -1});
            return;
        }
        results[0].remove(function(err){
            if(err){
                res.json({"result" : -1});
                return;
            }
            res.json({"result" : 1});
        });
    })
};

//修改菜品
exports.Alterlist=function (req,res) {
    var id=req.params.id;
    add.findOne({"_id":id},function (err,data) {
        if (err){
            res.json({"result":-1});
            return;
        }
        res.json({"result":data});
    })
};

// 修改提交
exports.updatelist=function (req,res) {
    var id=req.params.id;
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        add.find({"_id":id},function (err,data) {
            if (data.length==0){
                res.json({"result":-1});
            }
            var result=data[0];
            result.name=fields.name;
            result.price=fields.price;
            result.save(function (err) {
                if (err){
                    res.json({"result":-1})
                    return;
                }
                res.json({"result":1})
            })
        })
    })
};

//搜索菜品
exports.search = function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        add.find({"fenlei": fields.fenlei}, function (err, data) {
            if (data.length == 0) {
                res.json({"result": -1})
                return
            }
            res.json({"result": data})
        })
    });
};