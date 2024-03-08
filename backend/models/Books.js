const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({
    id: Number,
    book_description: String,
    book_name: String,
    image_url: String,
    poster_url: String,
});

const books = mongoose.model('books', booksSchema);

module.exports = books;