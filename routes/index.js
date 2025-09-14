const express = require('express');
const router = express.Router();
const isloggedin = require('../middlewares/isLoggedin');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');

router.get('/', (req, res) => {
    let error = req.flash('error');
    res.render("index", { error });
});

router.get("/shop", isloggedin, async (req, res) => {
    try {
        let query = {};
        let sortOption = {};
        
        
        if (req.query.search) {
            query.name = { $regex: req.query.search, $options: 'i' };
        }
        
        
        if (req.query.category) {
            query.category = req.query.category;
        }
        
        
        switch (req.query.sortby) {
            case 'price-low':
                sortOption = { price: 1 };
                break;
            case 'price-high':
                sortOption = { price: -1 };
                break;
            case 'newest':
                sortOption = { createdAt: -1 };
                break;
            default:
                sortOption = { createdAt: -1 };
        }
        
        let products = await productModel.find(query).sort(sortOption);
        let success = req.flash('success');
        let error = req.flash('error');
        
        res.render("shop", { 
            products, 
            success, 
            error,
            user: req.user,
            searchQuery: req.query.search || '',
            currentCategory: req.query.category || '',
            currentSort: req.query.sortby || 'newest'
        });
    } catch (err) {
        console.log('Shop error:', err);
        req.flash('error', 'Error loading products');
        res.redirect('/');
    }
});

router.get("/cart", isloggedin, async (req, res) => {
    try {
        console.log('Loading cart for user:', req.user.email);
        let user = await userModel.findOne({email: req.user.email}).populate('cart');
        console.log('User cart items:', user.cart.length);
        
        let bill = 0; 
        if(user.cart && user.cart.length > 0) {
            
            bill = user.cart.reduce((total, product) => {
                if (product && product.price) {
                    return total + (Number(product.price) - Number(product.discount || 0));
                }
                return total;
            }, 0) + 200;
        }

        let success = req.flash('success');
        let error = req.flash('error');

        console.log('Rendering cart with bill:', bill);
        res.render("cart-simple", { user, bill, success, error });
    } catch (err) {
        console.log('Cart error:', err);
        req.flash('error', 'Error loading cart: ' + err.message);
        res.redirect('/shop');
    }
});

router.get("/addtocart/:productid", isloggedin, async (req, res) => {
    try {
        let user = await userModel.findOne({email: req.user.email});
        
        
        if (user.cart.includes(req.params.productid)) {
            req.flash('error', 'Product already in cart');
            return res.redirect('/shop');
        }
        
        user.cart.push(req.params.productid);
        await user.save();
        req.flash('success', 'Product added to cart successfully');
        res.redirect('/shop');
    } catch (err) {
        console.log('Add to cart error:', err);
        req.flash('error', 'Error adding product to cart');
        res.redirect('/shop');
    }
});


router.post("/removefromcart/:productid", isloggedin, async (req, res) => {
    try {
        let user = await userModel.findOne({email: req.user.email});
        user.cart = user.cart.filter(item => item.toString() !== req.params.productid);
        await user.save();
        req.flash('success', 'Product removed from cart');
        res.redirect('/cart');
    } catch (err) {
        console.log('Remove from cart error:', err);
        req.flash('error', 'Error removing product from cart');
        res.redirect('/cart');
    }
});


router.get("/cart-debug", isloggedin, async (req, res) => {
    try {
        let user = await userModel.findOne({email: req.user.email}).populate('cart');
        res.json({
            userEmail: req.user.email,
            cartLength: user.cart.length,
            cartItems: user.cart.map(item => ({
                id: item._id,
                name: item.name,
                price: item.price,
                hasImage: !!item.image
            }))
        });
    } catch (err) {
        res.json({ error: err.message });
    }
});

router.get("/logout", isloggedin, (req, res) => {
    res.cookie('token', '');
    res.redirect('/');
});

module.exports = router;