// Ashish Nagpal
const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    bestSeller: String
});

const Author = mongoose.model('Author', authorSchema, 'author');

module.exports = Author;
