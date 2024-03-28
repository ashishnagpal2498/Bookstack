// Import models
const Author = require('./author.js');
const Genre = require('./genre.js');
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    book_name: String,
    description: String,
    content_link: String,
    publisherDate: String,
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    genresId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre'
    }],
    image_url: String,
    price: Number
});

const Book = mongoose.model('Book', bookSchema, 'books');

module.exports = Book;
