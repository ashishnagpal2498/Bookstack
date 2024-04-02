// Authors - [Arihant Dugar, Abhinav Acharya Tirumala Vinjamuri]
const mongoose = require('mongoose');
// console.log(reservationStatus)

const ReservationsSchema = new mongoose.Schema({
    user_id: String,
    reservations: [{
        book_id: String,
        reservation_date: String,
        returned: Boolean 
    }]
});

module.exports = mongoose.model('reservations', ReservationsSchema, 'reservations');