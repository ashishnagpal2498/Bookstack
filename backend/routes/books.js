// Authors - [Ashish Nagpal, Jinal Dave]
const express = require('express');
const bookController = require('../controllers/books');

const router = express.Router();

// API to fetch all books
router.get("/all", bookController.getAllBooks);

router.get("/genres", bookController.getAllGenres);

router.get("/authors", bookController.getAllAuthors);

router.post("/add", bookController.addBook);

router.put("/update/:id", bookController.updateBook);

router.delete("/delete", bookController.deleteBook);

router.get("/:id", bookController.getBookDetail);

router.post("/rating", bookController.addRating);

module.exports = router;
