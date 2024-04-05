// Author - Abhinav Acharya Tirumala Vinjamuri
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

        // Create a new late fee document
        if (!lateFeeDocument) {
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

        // No document means no active late fee
        if (!lateFeeDocument) {
            return res.status(200).json({
                message: "No active late fee!",
                status: false
            })
        }
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
exports.getActiveLateFeesUsers = async (req, res) => {
    try {
        // fetch all documents who have paid as false ([{books: [{paid:  false}, {paid: true}, {paid: true}]}, {books: [{paid: true}, {paid: true}]}, {books: [{paid:  false}]}])
        const lateFeeDocuments = await lateFeeSchema.find({ "books.paid": false });
        const users = [];
        for (let i = 0; i < lateFeeDocuments.length; i++) {
            try {
                let lateFeeDocument = lateFeeDocuments[i];
                // console.log(lateFeeDocument)
                const user = await usersSchema.findOne({ _id: new ObjectID(lateFeeDocument.user_id) });
                const book = lateFeeDocument.books.filter(book => book.paid === false)[0];
                // console.log(new ObjectID(book.book_id));
                // console.log(book)
                if (!user || !book) {
                    continue; // skip to next iteration of loop if user name or book is missing or null or empty or undefined
                }
                const user_name = user.first_name + " " + user.last_name;
                const user_picture = user.picture;
                const book_document = await booksSchema.findOne({ _id: new ObjectID(book.book_id) });
                // console.log(book_document);
                const book_name = book_document.book_name;
                // console.log(book_name)
                const user_dict = {
                    _id: lateFeeDocument._id,
                    user_id: user._id,
                    user_name,
                    user_picture,
                    book_name,
                    amount: book.amount,
                    book_id: book_document._id,
                }
                users.push(user_dict);
            }
            catch (error) {
                console.log(error);
                continue; // skip to next iteration of loop if user name or book is missing or null or empty or undefined
            }
        }
        // check if users array is empty
        if (users.length === 0) {
            return res.status(404).json({
                message: "No active late fee users found!",
                users: []
            })
        }
        return res.status(200).json({
            message: "List of active late fee users!",
            users: users
        })
    }
    // internal server error
    catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Uh oh! Looks like something broke on our end...",
            users: []
        })
    }
}

// API to fetch user details - to display on admin late fee details page (return user picture, name, email, phone)
exports.getUserDetails = async (req, res) => {
    try {
        const { user_id } = req.params;
        const user = await usersSchema.findOne({ _id: new ObjectID(user_id) }).select(['-password', '-role']);
        // if no user is found
        if (!user) {
            return res.status(404).json({
                message: "Details not found!",
                user: {}
            });
        }
        // Delete unwanted items in dictionary
        return res.status(200).json({
            message: "User Details Found!",
            user
        })
    }
    // internal server error
    catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Uh oh! Looks like something broke on our end...",
            user: {}
        })
    }
}

// API to fetch active late fee details - to display on admin, user late fee details page (return book picture, book name, reserved date, due date, amount due)
exports.getActiveLateFeeDetails = async (req, res) => {
    try {
        const { user_id } = req.params;
        // console.log(user_id)
        // console.log(_id, book__id);
        const lateFeeDocument = await lateFeeSchema.findOne({ user_id: new ObjectID(user_id) });
        // console.log(lateFeeDocument)
        const book = lateFeeDocument?.books.filter(book => book.paid === false)[0];
        if (!lateFeeDocument || !book) {
            return res.status(404).json({
                message: "Active Late Fee details not found!",
                active_late_fee: {}
            });
        }
        const book_document = await booksSchema.findOne({ _id: new ObjectID(book.book_id) });
        if (!book_document) {
            return res.status(404).json({
                message: "Active Late Fee details not found!",
                active_late_fee: {}
            });
        }
        // Check if fee is already paid -- kind of redundant, but good to check
        if (book.paid === true) {
            return res.status(200).json({
                message: "No Active Late Fees!",
                active_late_fee: {}
            })
        }
        active_late_fee = {}
        active_late_fee.book_picture = book_document.image_url
        active_late_fee.book_name = book_document.book_name
        active_late_fee.reserved_date = new Date(book.reserved_date).toUTCString().split(' ').slice(0, 4).join(' ')
        // Due date is 14 days from reserved date
        active_late_fee.due_date = new Date(new Date(active_late_fee.reserved_date).getTime() + 14 * 24 * 60 * 60 * 1000).toUTCString().split(' ').slice(0, 4).join(' ');
        active_late_fee.amount_due = book.amount;
        return res.status(200).json({
            message: "Active Late Fee details found!",
            active_late_fee
        })

    }
    // internal server error
    catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Uh oh! Looks like something broke on our end...",
            active_late_fee: {}
        })
    }
}

// API to fetch past late fees - to display on admin, user late fee details page (return book picture, book name, paid date, amount paid)
exports.getPastLateFees = async (req, res) => {
    try {
        const { user_id } = req.params;
        const lateFeeDocument = await lateFeeSchema.findOne({ user_id: new ObjectID(user_id) });
        let past_late_fees = lateFeeDocument?.books.filter(book => book.paid === true);
        // check if past late fee is empty
        if (past_late_fees?.length === 0 ||past_late_fees === null || past_late_fees === undefined) {
            return res.status(200).json({
                message: "No Past Late Fees!",
                past_late_fees: {}
            })
        }
        // console.log(typeof(past_late_fees))
        // fetch book details of each paid late fee
        for (let i = 0; i < past_late_fees?.length; i++) {
            let past_late_fee = past_late_fees[i].toObject();
            const book_document = await booksSchema?.findOne({ _id: new ObjectID(past_late_fees[i].book_id) });
            // if no book is found
            if (!book_document) {
                continue;
            }
            // console.log(book_document);
            past_late_fee.reserved_date = new Date(past_late_fee.reserved_date).toUTCString().split(' ').slice(0, 4).join(' ');
            past_late_fee.paid_date = new Date(past_late_fee.paid_date).toUTCString().split(' ').slice(0, 4).join(' ');
            // add due_date, book_name, and image_url to past_late_fee
            past_late_fee.due_date = new Date(new Date(past_late_fee.reserved_date).getTime() + 14 * 24 * 60 * 60 * 1000).toUTCString().split(' ').slice(0, 4).join(' ');
            past_late_fee.book_name = book_document.book_name;
            past_late_fee.image_url = book_document.image_url;
            // console.log(book_document.image_url + " " + book_document.book_name)
            past_late_fees[i] = past_late_fee;
        }
        // sort past late fees by paid date in descending order
        past_late_fees.sort((a, b) => new Date(b.paid_date) - new Date(a.paid_date));

        return res.status(200).json({
            message: "Past Late Fees found!",
            past_late_fees
        })


    }
    // internal server error
    catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Uh oh! Looks like something broke on our end...",
            past_late_fees: {}
        })
    }
}


// API to clear active late fees - for the button in admin late fee details page (return true or false)
exports.clearActiveLateFee = async (req, res) => {
    try {
        const { user_id } = req.body;
        const lateFeeDocument = await lateFeeSchema.findOne({ user_id: new ObjectID(user_id) });
        const book = lateFeeDocument.books.filter(book => book.paid === false)[0];
        if (!lateFeeDocument || !book) {
            return res.status(404).json({
                message: "Late fee not found!",
                status: false
            })
        }
        // Clear the active late fee by setting paid to true and add paid_date
        book.paid = true;
        book.paid_date = new Date();
        await lateFeeDocument.save();
        return res.status(200).json({
            message: "Active late fee cleared!",
            status: true
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Uh oh! Looks like something broke on our end...",
            status: false
        })
    }
}