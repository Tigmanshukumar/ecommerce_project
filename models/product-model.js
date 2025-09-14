const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image: Buffer,
    name: String,
    price: Number,
    discount: {type: Number, default: 0},
    category: {
        type: String,
        enum: [ 'prebuiltpc','cpu', 'gpu', 'ram', 'storage', 'motherboard', 'psu', 'case', 'cooling', 'other'],
        default: 'other'
    },
    bgcolor: String,
    panelcolor: String,
    textcolor: String,
    description: String,
    inStock: {type: Boolean, default: true},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Product', productSchema);