var mongoose = require("mongoose");
var sortSchema = new mongoose.Schema({
    "sort" : String
});

var sort = mongoose.model("sort",sortSchema);
module.exports=sort;