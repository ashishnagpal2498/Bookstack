// Authors - [Abhinav Acharya Tirumala Vinjamuri, Ashish Nagpal , Aiwin Charalil Manuel]
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const lateFeeRoute = require('./routes/lateFeeSystem.js');
const notificationsRoute = require('./routes/notifications.js');
const booksRoute = require('./routes/books.js');
const favoritesRoute = require('./routes/favorite');
const reservationsRoute = require('./routes/reservations.js');
const cartRoute = require('./routes/cart.js');

const usersRoute = require('./routes/userAuth.js');
// Initialize express app and middleware
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

// Load params from .env file
const PORT = process.env.PORT || 8080;
const uri = process.env.MONGODB_URI || "mongodb+srv://aiwinmanuel652:webgrp13@group13.gs7y5qc.mongodb.net/test?retryWrites=true&w=majority&appName=group13";
const frontend_url = process.env.FRONTEND_URI;

// Load routes
app.use('/late-fees', lateFeeRoute);
app.use('/notify', notificationsRoute);
app.use('/books', booksRoute);
app.use('/api/favorites', favoritesRoute);
app.use('/reservations', reservationsRoute);
app.use('/users', usersRoute);
app.use('/cart', cartRoute);


// Connect to mongoDB
async function connect() {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");
    }
    catch (err) {
        console.error(err);
    }
}

connect();

app.listen(PORT, () => {
    console.log("Listening on PORT: " + PORT);
})