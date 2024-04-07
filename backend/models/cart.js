const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    email: String,
    reservations: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'books'
    }]
});

const Cart = mongoose.model('Cart', cartSchema, 'cart');

module.exports = Cart;