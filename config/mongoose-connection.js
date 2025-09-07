const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce")
.then(function(){
    console.log("MongoDB connected successfully");
})
.catch(function(err){
    console.log("MongoDB connection failed", err);
})
module.exports = mongoose.connection;