const mongoose = require('mongoose');

const lateFeeSchema = new mongoose.Schema({
    user_id: String,
    books: [{
        amount: String,
        book_id: String,
        reserved_date: Date,
        paid: Boolean
    }],
});

const lateFee = mongoose.model('users', lateFeeSchema);

module.exports = lateFee;