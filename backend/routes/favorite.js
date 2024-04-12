// Author - Aiwin Charalil Manuel

const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favorite');

router.get('/check', favoritesController.checkFavorite);
router.post('/', favoritesController.addFavorite);
router.delete('/', favoritesController.deleteFavorite);
router.get('/', favoritesController.getAllFavorites);

module.exports = router;