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

// Initial setup page - shows form when no owners exist
router.get('/setup', async function (req, res) {
    try {
        let owners = await ownerModel.find();
        if (owners.length > 0) {
            return res.redirect('/owners/login');
        }

        // Render setup form
        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Initial Admin Setup - TechHub</title>
                <script src="https://cdn.tailwindcss.com"></script>
            </head>
            <body class="bg-gray-100 min-h-screen flex items-center justify-center">
                <div class="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                    <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Initial Admin Setup</h2>
                    <p class="text-gray-600 mb-6 text-center">No admin account found. Create the first admin account.</p>
                    
                    <form action="/owners/setup" method="POST" class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                            <input name="fullname" type="text" required value="Test Admin"
                                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input name="email" type="email" required value="test@test.com"
                                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <input name="password" type="password" required value="test"
                                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        </div>
                        <button type="submit" 
                                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
                            Create Admin Account
                        </button>
                    </form>
                    
                    <div class="mt-4 text-center">
                        <a href="/" class="text-blue-600 hover:text-blue-800 text-sm">← Back to Home</a>
                    </div>
                </div>
            </body>
            </html>
        `);
    } catch (err) {
        res.status(500).send('Error checking admin status: ' + err.message);
    }
});

// Initial setup route - only works when no owners exist
router.post('/setup', async function (req, res) {
    try {
        let owners = await ownerModel.find();
        if (owners.length > 0) {
            return res.send(`
                <div style="text-align: center; padding: 50px; font-family: Arial;">
                    <h2>Setup Not Allowed</h2>
                    <p>Admin already exists.</p>
                    <a href="/owners/login" style="color: blue;">Go to Login</a>
                </div>
            `);
        }

        let { fullname, email, password } = req.body;

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) {
                    return res.status(500).send('Error creating admin: ' + err.message);
                }

                let createdOwner = await ownerModel.create({
                    fullname,
                    email,
                    password: hash
                });

                console.log("✅ Initial admin created:", {
                    id: createdOwner._id,
                    email: createdOwner.email,
                    fullname: createdOwner.fullname
                });

                res.send(`
                    <div style="text-align: center; padding: 50px; font-family: Arial;">
                        <h2 style="color: green;">✅ Admin Created Successfully!</h2>
                        <p><strong>Email:</strong> ${createdOwner.email}</p>
                        <p><strong>Name:</strong> ${createdOwner.fullname}</p>
                        <br>
                        <a href="/owners/login" style="background: blue; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                            Login Now
                        </a>
                    </div>
                `);
            });
        });
    } catch (err) {
        res.status(500).send('Error creating admin: ' + err.message);
    }
});

router.get('/logout', (req, res) => {
    res.cookie('owner-token', '');
    req.flash('success', 'Logged out successfully');
    res.redirect('/owners/login');
});

// Allow owner creation in development OR when no owners exist (for initial setup)
if (process.env.NODE_ENV === 'development' || process.env.ALLOW_OWNER_CREATION === 'true') {
    console.log("Owner creation enabled ✅");
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