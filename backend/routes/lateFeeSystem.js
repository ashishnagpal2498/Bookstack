// Author - Abhinav Acharya Tirumala Vinjamuri
const express = require('express');
const lateFeeController = require('../controllers/lateFeeSystem.js');

const router = express.Router();

// API to create a new late fee for a user - for placing a restriction on reserving new books (return true or false)
router.post('/create', lateFeeController.createLateFee);

// API to check if user has active late fee - for placing a restriction on reserving new books (return true of false)
router.get('/check-restriction/:user_id', lateFeeController.checkActiveLateFee);

// API to fetch a list of all users who have active late fees - to display on admin late fee system search page (return user picture, user name, book name, and active late fee amount)
router.get('/active-users', lateFeeController.getActiveLateFeesUsers);

// API to fetch user details - to display on admin late fee details page (return user picture, name, email, phone)
router.get('/user-details/:user_id', lateFeeController.getUserDetails);

// API to fetch active late fee details - to display on admin, user late fee details page (return book picture, book name, reserved date, due date, amount due)
router.get('/active-fee-details/:user_id', lateFeeController.getActiveLateFeeDetails);

// API to fetch past late fees - to display on admin, user late fee details page (return book picture, book name, paid date, amount paid)
router.get('/past-fee-details/:user_id', lateFeeController.getPastLateFees);

// API to clear active late fees - for the button in admin late fee details page (return true or false)
router.post('/clear-fee', lateFeeController.clearActiveLateFee);

// Export the router to be used in the main app
module.exports = router;