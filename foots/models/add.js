var mongoose = require("mongoose");

var addSchema = mongoose.Schema({
    "fenlei" : String,
    "name" : String,
    "price" : Number,
    "sort" : String,
    "tupian" : String,
    "neirong" : String,
    "zhuangtai" : String,
    "jingpin" : String,
    "rexiao" : String
});


var add = mongoose.model("add",addSchema);
module.exports = add;





