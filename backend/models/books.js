// book model
const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({
    id: Number,
    book_description: String,
    book_name: String,
    image_url: String,
    poster_url: String,
    price: Number
});

const books = mongoose.model('books', booksSchema);

module.exports = books;