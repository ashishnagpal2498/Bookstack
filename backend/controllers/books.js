// Authors : [ Ashish Nagpal, Arihant Dugar, Jinal Dave ]
const Author = require('../models/author');
const Book = require('../models/books');
const Genre = require('../models/genre');
const mongoose = require('mongoose');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find()
      .populate("authorIds")
      .populate({ path: "genreIds", model: "Genre" });

    console.log("Bookksss return", books);
    return res.status(200).json({
      message: "Books fetched successfully",
      data: books,
      status: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      status: false,
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
      status: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      status: false,
    });
  }
};

exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();

    console.log("Authors for Filter", authors);
    return res.status(200).json({
      message: "Authors successfully",
      data: authors,
      status: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      status: false,
    });
  }
};

exports.addBook = async (req, res) => {
  try {
    const {
      description,
      content_link,
      authorIds,
      genreIds,
      book_name,
      image_url,
      price,
      availability,
    } = req.body;

    const newBook = new Book({
      description,
      content_link,
      publisherDate: new Date(),
      authorIds: [authorIds],
      genreIds: [genreIds],
      book_name,
      image_url,
      price,
      availability,
    });

    const savedBook = await newBook.save();
    res.status(200).json(savedBook);
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ error: "Failed to add book " + error });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const bookId = req.query.id;
    if (!bookId) {
      return res.status(400).json({ error: "Book ID is required" });
    }
    const deletedBook = await Book.findByIdAndDelete(bookId);
    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully", deletedBook });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ error: "Failed to delete book " + error });
  }
};

exports.getBookDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id)
      .populate("authorIds")
      .populate({ path: "genreIds", model: "Genre" });
    if (!book) {
      return res.status(404).json({
        message: "Book Not Found",
        status: false,
      });
    }
    book.rating?.sort((a, b) => b.time - a.time);
    const data = await Book.find({ authorIds: { $in: book.authorIds } })
      .populate("authorIds")
      .populate({ path: "genreIds", model: "Genre" })
      .limit(5)
      .exec();
    return res.status(200).json({
      message: "Book detail fetch successfully",
      status: true,
      book,
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "Something wents wrong",
      status: false,
    });
  }
};

exports.addRating = async (req, res) => {
  try {
    const { id, noOfStars, description } = req.body;
    const rating = {
      noOfStars: noOfStars,
      description: description,
      time: new Date(),
    };
    const book = await Book.findById(id);
    book.rating.push(rating);

    await book.save();

    return res.status(200).json({
      message: "Rating added successfully",
      status: true,
      book,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Something wents wrong",
      status: false,
    });
  }
};

exports.updateBook = async (req, res) => {
  try {
      const { description, content_link, authorIds, genreIds, book_name, price, availability } = req.body;
      const bookId = req.params.id; 

      const existingBook = await Book.findById(bookId);
      if (!existingBook) {
          return res.status(404).json({ error: 'Book not found' });
      }

      existingBook.description = description;
      existingBook.content_link = content_link;
      existingBook.authorIds = authorIds;
      existingBook.genreIds = genreIds;
      existingBook.book_name = book_name;
      existingBook.price = price;
      existingBook.availability = availability;
      const updatedBook = await existingBook.save();

      res.status(200).json(updatedBook);
  } catch (error) {
      console.error('Error updating book:', error);
      res.status(500).json({ error: 'Failed to update book ' + error });
  }
};
