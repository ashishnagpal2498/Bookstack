const express = require('express');
const cartController = require('../controllers/cart.js');

const router = express.Router();

router.post('/getallbookinfo', cartController.getWholeCart);
router.post('/addbook', cartController.addToCart);
router.post('/deletebook', cartController.deletefromCart);

module.exports = router;
