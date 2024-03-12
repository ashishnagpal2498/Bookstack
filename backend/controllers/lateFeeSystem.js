const lateFeeSchema = require('../models/lateFeeSystem');
const booksSchema = require('../models/books');
const usersSchema = require('../models/users');
const ObjectID = require('mongodb').ObjectId;

// API to create a new late fee for a user - for placing a restriction on reserving new books (return true or false)
exports.createLateFee = async (req, res) => {
    try {
        const { user_id, book_id, reserved_date } = req.body;

        // if the input variables empty or null or missing
        if (!user_id || !book_id || !reserved_date) {
            return res.status(400).json({
                message: "Missing information!",
                status: false
            })
        }

        // if there is no user with the user id
        const userDocument = await usersSchema.findOne({ _id: new ObjectID(user_id) });
        if (!userDocument) {
            return res.status(404).json({
                message: "User not found!",
                status: false
            })
        }

        // if there is no book with the book id
        const bookDocument = await booksSchema.findOne({ _id: new ObjectID(book_id) })
        if (!bookDocument) {
            return res.status(404).json({
                message: "Book not found!",
                status: false
            })
        }

        // If there is already an active late fee for the user, add to the books array
        const lateFeeDocument = await lateFeeSchema.findOne({ user_id: new ObjectID(user_id) });

        if (lateFeeDocument) {
            // Calculate due amount - constant of 50% of the book price
            const book = await booksSchema.findOne({ _id: new ObjectID(book_id) });
            const amount = book.price * 0.5;

            const details = {
                book_id,
                reserved_date,
                amount,
                "paid": false,
                "paid_date": ""
            }

            lateFeeDocument.books.push(details);
            await lateFeeDocument.save();
            return res.status(200).json({
                message: "Late fee applied!",
                status: true
            })
        }
        // Create a new late fee document
        else {
            // Calculate due amount - constant of 50% of the book price
            const book = await booksSchema.findOne({ _id: new ObjectID(book_id) });
            const amount = book.price * 0.5;
            const newLateFeeDocument = new lateFeeSchema({
                user_id,
                books: [{
                    book_id,
                    reserved_date,
                    amount: amount,
                    "paid": false,
                    "paid_date": ""
                }]
            })
            await newLateFeeDocument.save();
            return res.status(200).json({
                message: "Late fee applied!",
                status: true
            })
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Uh oh! Looks like something broke on our end...",
            status: false
        })
    }
}

// API to check if user has active late fee - for placing a restriction on reserving new books (return true of false)
exports.checkActiveLateFee = async (req, res) => {
    try {
        const { user_id } = req.params;

        // if the input variables empty or null or missing
        if (!user_id) {
            return res.status(400).json({
                message: "Missing information!",
                status: false
            })
        }

        // if there is no user with the user id
        const userDocument = await usersSchema.findOne({ _id: new ObjectID(user_id) });
        if (!userDocument) {
            return res.status(404).json({
                message: "User not found!",
                status: false
            })
        }
        // Check if there is an entry in late fee system and if so if the entry has an active late fee
        const lateFeeDocument = await lateFeeSchema.findOne({ user_id: new ObjectID(user_id) });

        if (lateFeeDocument) {
            // check if there are any unpaid late fees
            const unpaidLateFees = lateFeeDocument.books.filter(book => book.paid === false);
            // Unpaid late fees means there are active late fees for the user - return true 
            if (unpaidLateFees.length > 0) {
                return res.status(200).json({
                    message: "Active late fee found!",
                    status: true
                })
            }
            // No unpaid late fees means there are no active late fees for the user - return false
            else{
                return res.status(200).json({
                    message: "No active late fee!",
                    status: false
                })  
            }
        }
        // No document means no active late fee
        else {
            return res.status(200).json({
                message: "No active late fee!",
                status: false
            })
        }
    }
    // internal server error
    catch (error) {
        return res.status(500).json({
            message: "Uh oh! Looks like something broke on our end...",
            status: false
        })
    }
}

// API to fetch a list of all users who have active late fees - to display on admin late fee system search page (return user picture, user name, book name, and active late fee amount)

// API to fetch user details - to display on admin late fee details page (return user picture, name, email, phone)

// API to fetch active late fee details - to display on admin, user late fee details page (return book picture, book name, reserved date, due date, amount due)

// API to fetch past late fees - to display on admin, user late fee details page (return book picture, book name, paid date, amount paid)

// API to clear active late fees - for the button in admin late fee details page (return true or false)
