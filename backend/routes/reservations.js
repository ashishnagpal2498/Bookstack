// Authors - [Abhinav Acharya Tirumala Vinjamuri, Arihant Dugar]
const express = require('express');
const reservationsController = require('../controllers/reservations.js');

const router = express.Router();

// API to add a new reservation
router.post('/add', reservationsController.addReservation);

// API to view all reservations
router.get('/all', reservationsController.getAllReservations);

// API to change status of a reservation
router.put('/update/:reservation_id/:book_id', reservationsController.changeReservationStatus);

// Export the router to be used in the main app
module.exports = router;