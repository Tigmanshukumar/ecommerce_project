const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generateToken');
const isOwnerLoggedin = require('../middlewares/isOwnerLoggedin');


router.get('/login', (req, res) => {
    let error = req.flash('error');
    res.render("owner-login", { error });
});


router.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body;
        let owner = await ownerModel.findOne({ email: email });

        if (!owner) {
            req.flash('error', 'Email or password is incorrect');
            return res.redirect('/owners/login');
        }

        bcrypt.compare(password, owner.password, (err, result) => {
            if (result) {
                let token = generateToken(owner);
                res.cookie('owner-token', token);
                req.flash('success', 'Welcome Admin!');
                return res.redirect('/owners/admin');
            } else {
                req.flash('error', 'Email or password is incorrect');
                return res.redirect('/owners/login');
            }
        });
    } catch (err) {
        console.log(err.message);
        req.flash('error', 'Something went wrong');
        res.redirect('/owners/login');
    }
});


router.get('/admin', isOwnerLoggedin, async (req, res) => {
    try {
        const productModel = require('../models/product-model');
        let productCount = await productModel.countDocuments();
        let success = req.flash('success');
        let error = req.flash('error');
        res.render("createproducts", { success, error, owner: req.owner, productCount });
    } catch (err) {
        let success = req.flash('success');
        let error = req.flash('error');
        res.render("createproducts", { success, error, owner: req.owner, productCount: 0 });
    }
});


router.get('/products', isOwnerLoggedin, async (req, res) => {
    try {
        const productModel = require('../models/product-model');
        let products = await productModel.find();
        let success = req.flash('success');
        let error = req.flash('error');
        res.render('admin-products', { products, success, error, owner: req.owner });
    } catch (err) {
        console.log('Error fetching products:', err);
        req.flash('error', 'Error loading products');
        res.redirect('/owners/admin');
    }
});


router.post('/products/delete/:id', isOwnerLoggedin, async (req, res) => {
    try {
        const productModel = require('../models/product-model');
        const deletedProduct = await productModel.findByIdAndDelete(req.params.id);
        if (deletedProduct) {
            req.flash('success', `Product "${deletedProduct.name}" deleted successfully`);
        } else {
            req.flash('error', 'Product not found');
        }
        res.redirect('/owners/products');
    } catch (err) {
        console.log('Error deleting product:', err);
        req.flash('error', 'Error deleting product');
        res.redirect('/owners/products');
    }
});


router.post('/products/delete-all', isOwnerLoggedin, async (req, res) => {
    try {
        const productModel = require('../models/product-model');
        const result = await productModel.deleteMany({});
        req.flash('success', `${result.deletedCount} products deleted successfully`);
        res.redirect('/owners/products');
    } catch (err) {
        console.log('Error deleting all products:', err);
        req.flash('error', 'Error deleting products');
        res.redirect('/owners/products');
    }
});


// Check existing owners (debug route)
router.get('/check', async (req, res) => {
    try {
        let owners = await ownerModel.find().select('-password');
        res.json({
            count: owners.length,
            owners: owners,
            message: owners.length > 0 ? "Owners found in database" : "No owners in database"
        });
    } catch (err) {
        res.json({ error: err.message });
    }
});

router.get('/logout', (req, res) => {
    res.cookie('owner-token', '');
    req.flash('success', 'Logged out successfully');
    res.redirect('/owners/login');
});

if (process.env.NODE_ENV === 'development') {
    console.log("Development mode activated ✅");
    router.post("/create", async function (req, res) {
        try {
            let owners = await ownerModel.find();
            if (owners.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: "Owner already exists"
                });
            }

            let { fullname, email, password } = req.body;

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, async (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: "Error creating owner",
                            error: err.message
                        });
                    }

                    let createdOwner = await ownerModel.create({
                        fullname,
                        email,
                        password: hash
                    });

                    console.log("✅ Owner created successfully:", {
                        id: createdOwner._id,
                        email: createdOwner.email,
                        fullname: createdOwner.fullname
                    });

                    res.status(201).json({
                        success: true,
                        message: "Owner has been created successfully",
                        data: {
                            id: createdOwner._id,
                            fullname: createdOwner.fullname,
                            email: createdOwner.email
                        }
                    });
                });
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: "Error creating owner",
                error: err.message
            });
        }
    });
}

module.exports = router;