const jwt = require('jsonwebtoken');
const ownerModel = require('../models/owner-model');

module.exports = async (req, res, next) => {
    if (!req.cookies['owner-token']) {
        req.flash('error', 'Access denied. Admin login required');
        return res.redirect("/owners/login");
    }
    try {
        let decoded = jwt.verify(req.cookies['owner-token'], process.env.JWT_KEY);
        let owner = await ownerModel
        .findOne({email: decoded.email})
        .select("-password");

        if (!owner) {
            req.flash('error', 'Owner not found');
            return res.redirect("/owners/login");
        }

        req.owner = owner;
        next();
    } catch (err) {
        console.log('Owner JWT Error:', err.message);
        req.flash('error', 'Session expired. Login again');
        res.redirect("/owners/login");
    }
};