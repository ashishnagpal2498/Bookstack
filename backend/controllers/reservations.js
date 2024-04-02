// Authors: [Abhinav Acharya Tirumala Vinjamuri, Arihant Dugar]
const reservationsSchema = require('../models/reservations');
const usersSchema = require('../models/users');
const booksSchema = require('../models/books');
const ObjectID = require('mongodb').ObjectId;

// API to add a reservation
exports.addReservation = async (req, res) => {
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

        // If there is already a reservation document for the user, add to the reservations array
        const reservationDocument = await reservationsSchema.findOne({ user_id: new ObjectID(user_id) });

        // Create a new late fee document
        if (!reservationDocument) {

            const newReservationDocument = new reservationsSchema({
                user_id,
                reservations: [{
                    book_id,
                    "reservation_date": reserved_date,
                    "returned": false,
                }]
            })
            await newReservationDocument.save();
            return res.status(200).json({
                message: "Reservation Successful!",
                status: true
            })
        }

        const details = {
            book_id,
            "reservation_date": reserved_date,
            "returned": false,
        }
        reservationDocument.reservations.push(details);
        await reservationDocument.save();
        return res.status(200).json({
            message: "Reservation Successful!",
            status: true
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }

}

// API to view all reservations
exports.getAllReservations = async (req, res) => {

    try {
        // get all reservations where reservationStatus is NOT_RETURNED
        const reservations = await reservationsSchema.find({ "reservations.returned": false });
        const users = [];
        for (let i = 0; i < reservations.length; i++) {
            try {
                let reservation = reservations[i];
                let obj = {};
                const user = await usersSchema.findOne({ "_id": new ObjectID(reservation.user_id) });
                if (!user) {
                    continue; // skip to next iteration of loop if user name is missing or null or empty or undefined
                }
                obj.reservation_id = reservation._id;
                obj.user_id = reservation.user_id;
                obj.user_name = user.first_name + ' ' + user.last_name;
                obj.user_picture = user.picture;
                for (let j = 0; i < reservation.reservations.length; i++) {
                    try {
                        // console.log("here")
                        let res = reservation.reservations[j];
                        // if (res.returned) {
                        //     console.log("here2")
                        //     continue;
                        // }
                        const book = await booksSchema.findOne({ "_id": new ObjectID(res.book_id) });
                        if (!book) {
                            continue; // skip to next iteration of loop if book name is missing or null or empty or undefined
                        }
                        obj.book_id = res.book_id;
                        obj.book_name = book.book_name;
                        obj.book_picture = book.image_url;
                        obj.reservation_date = res.reservation_date;
                        obj.reservation_status = res.returned;
                    }
                    catch (error) {
                        console.log(error);
                        continue;
                    }
                }
                users.push(obj);
            }
            catch (error) {
                console.log(error);
                continue; // skip to next iteration of loop if user name or book is missing or null or empty or undefined
            }
        }
        // check if users array is empty
        if (users.length === 0) {
            return res.status(404).json({
                message: "No reservations found!",
                users: []
            })
        }
        return res.status(200).json({
            message: "List of reservations found!",
            users: users
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message, users: [] });
    }
}

// API to change status of a reservation
exports.changeReservationStatus = async (req, res) => {
    try {
        const { reservation_id, book_id } = req.params;
        if (!reservation_id || !book_id) {
            return res.status(400).json({
                message: "Missing information!",
                status: false
            })
        }
        // Check if reservation is available
        const reservationDocument = await reservationsSchema.findOne({ _id: new ObjectID(reservation_id) });
        if (!reservationDocument) {
            return res.status(404).json({
                message: "Reservation not found!",
                status: false
            })
        }
        // Find all occurances of book_id in reservations and change the latest returned param to true
        for (let i = 0; i < reservationDocument.reservations.length; i++) {
            if (reservationDocument.reservations[i].book_id == book_id) {
                if (!reservationDocument.reservations[i].returned) {
                    reservationDocument.reservations[i].returned = true;
                    await reservationDocument.save();
                    return res.status(200).json({
                        message: "Reservation status changed!",
                        status: true
                    })
                }
            }
        }
        return res.status(200).json({
            message: "Reservation couldn't be changed!",
            status: false
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message, status: false });
    }
}