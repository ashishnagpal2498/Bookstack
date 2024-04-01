const mongoose = require('mongoose');
const reservationStatus = require('../util/reservationStatus')

const ReservationsSchema = new mongoose.Schema({
    user_id: String,
    reservations: [{
        book_id: String,
        reservation_date: String,
        status: {
            type: String,
            enum: [reservationStatus.RETURNED, reservationStatus.NOT_RETURNED],
            default: reservationStatus.NOT_RETURNED
        }
    }]
});

module.exports = mongoose.model('reservations', ReservationsSchema, 'reservations');