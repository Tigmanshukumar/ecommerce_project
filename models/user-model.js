const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 100,
        required: true
},
    email: String,
    password: String,
cart: [{type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'   
}],
    orders: {type: Array, default: []   },
    contact: Number,
    picture: String
});

module.exports = mongoose.model('User', userSchema);