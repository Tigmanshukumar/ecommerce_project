const mongoose = require('mongoose');
const dbgr = require("debug")("development:mongoose-connection");
const config = require("config");

mongoose.connect(`${config.get("MONGODB_URI")}/ecommerce`)
.then(function(){
    console.log("✅ MongoDB connected successfully to:", `${config.get("MONGODB_URI")}/ecommerce`);
    dbgr("MongoDB connected successfully");
})
.catch(function(err){
    console.error("❌ MongoDB connection failed:", err.message);
    dbgr("MongoDB connection failed", err);
})
module.exports = mongoose.connection;