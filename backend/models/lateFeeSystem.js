// Author - Abhinav Acharya Tirumala Vinjamuri
const mongoose = require('mongoose');

const lateFeeSchema = new mongoose.Schema({
    user_id: String,
    books: [{
        amount: String,
        book_id: String,
        reserved_date: String,
        paid: Boolean,
        paid_date: String
    }],
});

const lateFee = mongoose.model('latefee', lateFeeSchema, 'latefee');

module.exports = lateFee;