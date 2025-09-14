const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generateToken} = require('../utils/generateToken');

module.exports.registerUser = async (req, res) => {
    try {
        let {fullname, email, password} = req.body;
        let user = await userModel.findOne({email});
        if(user) {
            req.flash('error', 'User already exists');
            return res.redirect('/');
        }
        
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if(err) {
                    req.flash('error', err.message);
                    return res.redirect('/');
                }
                else {
                    let user = await userModel.create({fullname, email, password: hash});
                    let token = generateToken(user);
                    res.cookie('token', token);
                    res.redirect('/shop');
                }
            });
        });

    } catch(err) {
        console.log(err.message);
        req.flash('error', 'Something went wrong');
        res.redirect('/');
    }
};

module.exports.loginUser = async (req, res) => { 
    try {
        let {email, password} = req.body;
        let user = await userModel.findOne({email: email}); 
        if(!user) {
            req.flash('error', 'Email or password is incorrect');
            return res.redirect('/');
        }
        
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                let token = generateToken(user);
                res.cookie('token', token);
                return res.redirect('/shop');
            }
            else {
                req.flash('error', 'Email or password is incorrect');
                return res.redirect('/');
            }
        });
    } catch(err) {
        console.log(err.message);
        req.flash('error', 'Something went wrong');
        res.redirect('/');
    }
};
