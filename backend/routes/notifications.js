const express = require('express');
const notificationsController = require('../controllers/notifications.js');

const router = express.Router();

// API to notify user of active late fees - for notify user button on admin late fee details page
router.post('/notifications/late-fee-reminder-user/:userId', notificationsController.remindUserLateFee);

// API to notify admin of uncleared late fees - for dispute charge button on user late fee details page
router.post('/notifications/late-fee-dispute-charge/:userId', notificationsController.remindUserLateFee);

// more to come...

// Export the router to be used in the main app
module.exports = router;