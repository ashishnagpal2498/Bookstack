const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  username: String,
  bookName: String,
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
