const mongoose = require('mongoose');
const dbgr = require("debug")("development:mongoose-connection");

// Get MongoDB URI from environment variable or config
let mongoURI;
try {
    // Try to get from environment variable first (for production)
    mongoURI = process.env.MONGODB_URI;

    // If not in env, try config (for development)
    if (!mongoURI) {
        const config = require("config");
        mongoURI = config.get("MONGODB_URI");
    }
} catch (err) {
    // Fallback to default local MongoDB
    mongoURI = "mongodb://127.0.0.1:27017";
    console.warn("⚠️ Using default MongoDB URI:", mongoURI);
}

// Add database name if not included
const fullMongoURI = mongoURI.includes('/ecommerce') ? mongoURI : `${mongoURI}/ecommerce`;

mongoose.connect(fullMongoURI)
    .then(function () {
        console.log("✅ MongoDB connected successfully to:", fullMongoURI);
        dbgr("MongoDB connected successfully");
    })
    .catch(function (err) {
        console.error("❌ MongoDB connection failed:", err.message);
        dbgr("MongoDB connection failed", err);
    })

module.exports = mongoose.connection;