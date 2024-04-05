//Author Aiwin Charalil Manuel
const Favorite = require('../models/favorite');

exports.checkFavorite = async (req, res) => {
    try {
        const { username, bookName } = req.query;
        const favorite = await Favorite.findOne({ username, bookName });
        res.json({ isFavorite: !!favorite });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addFavorite = async (req, res) => {
    try {
        const { username, bookName } = req.body;
        const newFavorite = new Favorite({ username, bookName });
        await newFavorite.save();
        res.status(201).json({ message: "Favorite added successfully." });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteFavorite = async (req, res) => {
    try {
        const { username, bookName } = req.body;
        const result = await Favorite.findOneAndDelete({ username, bookName });
        if (result) {
            res.status(200).json({ message: "Favorite removed successfully." });
        } else {
            res.status(404).json({ message: "Favorite not found." });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllFavorites = async (req, res) => {
    // Assuming the username is mandatory for this endpoint
    if (!req.query.username) {
        return res.status(400).json({ error: "Username is required." });
    }

    try {
        // Directly use the username in the query
        const usernameQuery = { username: req.query.username };
        const favorites = await Favorite.find(usernameQuery);
        res.json(favorites);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};