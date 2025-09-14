const express = require('express');
const router = express.Router();
const upload = require('../config/multer-config');
const productModel = require('../models/product-model');

router.post('/create', upload.single("image"), async (req, res) => {
    try { 
        let { name, price, discount, category, description, bgcolor, panelcolor, textcolor } = req.body;

        if (!req.file) {
            req.flash('error', 'Please select an image file');
            return res.redirect('/owners/admin');
        }

        let product = await productModel.create({
            image: req.file.buffer,
            name,
            price: Number(price),
            discount: Number(discount) || 0,
            category: category || 'other',
            description: description || '',
            bgcolor: bgcolor || '#f3f4f6',
            panelcolor: panelcolor || '#ffffff',
            textcolor: textcolor || '#1f2937'
        });  
        
        req.flash('success', `${product.name} created successfully!`);
        res.redirect('/owners/products');
    } catch (err) {
        console.log('Product creation error:', err);
        req.flash('error', 'Error creating product. Please try again.');
        res.redirect('/owners/admin'); 
    }
});

module.exports = router;