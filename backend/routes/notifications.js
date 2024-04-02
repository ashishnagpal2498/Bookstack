// Author - Abhinav Acharya Tirumala Vinjamuri
const express = require('express');
const notificationsController = require('../controllers/notifications.js');

const router = express.Router();

// API to notify user of active late fees - for notify user button on admin late fee details page
router.post('/late-fee-reminder-user/:user_id', notificationsController.remindUserLateFee);

// API to notify admin of uncleared late fees - for dispute charge button on user late fee details page
router.post('/late-fee-dispute-charge/:user_id', notificationsController.disputeLateFeeCharge);

// more to come...

// Export the router to be used in the main app
module.exports = router;