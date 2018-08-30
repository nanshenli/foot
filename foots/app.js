var express = require("express");
var app = express();
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/meishi');

var router = require("./router/index.js");
app.set("view engine","ejs");
app.use(express.static("static"));
app.use("/list",express.static("uploads"));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


app.get("/",router.showIndex); //显示首页 （进入菜品分类页面）
app.get("/gainsort",router.gainsort);//获取所有菜品分类
app.post("/addsort",router.addsort);//添加菜品分类
app.delete("/sortDelete/:id",router.sortDelete);//删除菜品分类
app.get("/Altercar/:id",router.Altercar);//修改菜品分类
app.post("/updatecar/:id",router.updatecar);//修改提交


app.get("/list",router.showList);//进入菜品列表页面

app.get("/add",router.showAdd);//进入添加菜品页面
app.post("/addList",router.addList);//添加菜品
app.get("/gainlist",router.gainlist);//获取所有菜品
app.delete("/deleteList/:id",router.deleteList);//删除菜品
app.get("/Alterlist/:id",router.Alterlist);//修改菜品分类
app.post("/updatelist/:id",router.updatelist);//修改提交
app.post("/search",router.search);//搜索商品






app.listen(3000);
console.log("服务器已运行，请在3000端口打开");
