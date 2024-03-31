// Ashish Nagpal
const Author = require('../models/author');
const Book = require('../models/books');
const Genre = require('../models/genre');

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().populate('authorIds').populate({ path: 'genreIds', model: 'Genre' });;

        console.log("Bookksss return", books);
        return res.status(200).json({
            message: "Books fetched successfully",
            data: books,
            status: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            status: false
        });
    }
};

exports.getAllGenres = async (req, res) => {
    try {
        const genres = await Genre.find();

        console.log("Bookksss return", genres);
        return res.status(200).json({
            message: "Genres successfully",
            data: genres,
            status: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            status: false
        });
    }
}

exports.getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.find();

        console.log("Authors for Filter", authors);
        return res.status(200).json({
            message: "Authors successfully",
            data: authors,
            status: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            status: false
        });
    }
}