// Authors - [Abhinav Acharya Tirumala Vinjamuri]
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    first_name: String,
    last_name: String,
    password: String,
    phone: String,
    picture: String,
    role: String,
});

const users = mongoose.model('users', userSchema);

module.exports = users;