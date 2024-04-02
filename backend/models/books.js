// Authors - [Abhinav Acharya Tirumala Vinjamuri, Ashish Nagpal, Arihant Dugar, Jinal Dave]
// Import models
const Author = require("./author.js");
const Genre = require("./genre.js");
const mongoose = require("mongoose");

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
    // Mapping with Author Collection
    authorIds: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
    }],
    // Mapping with Genre Collection
    genreIds: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Genre'
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
    },
    availability : {
        type: Boolean,
        required: true
    },
    rating: [
      {
        noOfStars: Number,
        description: String,
        time: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
    book_contributors: String,
    book_targetAudience: String,
    book_classification: String,
});

module.exports = mongoose.model("books", BookSchema, "books");
