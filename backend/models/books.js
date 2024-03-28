const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    content_link: {
        type: String,
        required: true
    },
    publisherDate: {
        type: Date,
        required: true
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    genresId: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }],
    book_name: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('books', BookSchema, 'books');