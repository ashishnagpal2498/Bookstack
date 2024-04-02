// Move this to the MVC architecture

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Favorite = require('./models/favorite');

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Contact Schema and Model
const ContactSchema = new mongoose.Schema({
  email: String,
  phone: String,
  username: String,
  description: String,
});
const Contact = mongoose.model('Contact', ContactSchema);

// FAQ Schema and Model
const FaqSchema = new mongoose.Schema({
  question: String,
  answer: String,
});
const Faq = mongoose.model('Faq', FaqSchema);

// Contact Route
app.post('/api/contact', async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json({ message: "Data saved successfully." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// FAQ Route to fetch FAQs
app.get('/faqs', async (req, res) => {
  try {
    const faqs = await Faq.find();
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// adding to favorites
app.post('/api/favorites', async (req, res) => {
    try {
      const { username, bookName } = req.body;
      const newFavorite = new Favorite({ username, bookName });
      await newFavorite.save();
      res.status(201).json({ message: "Favorite saved successfully." });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Delete a favorite
app.delete('/api/favorites', async (req, res) => {
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
});

// Check if a favorite exists
app.get('/api/favorites/check', async (req, res) => {
  try {
    const { username, bookName } = req.query; 
    const favorite = await Favorite.findOne({ username, bookName });
    if (favorite) {
      res.json({ isFavorite: true });
    } else {
      res.json({ isFavorite: false });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



