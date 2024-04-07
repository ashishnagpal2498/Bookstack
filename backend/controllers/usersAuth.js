// Author - Yogish Honnadevipura Gopalakrishna

const express = require('express');
const Cart = require('../models/cart.js');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const User = require('../models/users.js');
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const cloud = require('./../util/cloudinaryService.js');
const path = require('path');
const key = '0123456789abcdef0123456789abcdef'; // 32 characters (256 bits)
const iv = 'abcdef0123456789';  // Initialization vector
var sendCustomMail = require('../util/mailService.js'); // mail service
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();

const htmlTemplate = fs.readFileSync('./email_templates/html_content.html', 'utf8');

const bookStackEmail = process.env.ADMIN_EMAIL;
const frontendUrl = process.env.FRONTEND_URI;

// Decrypt data
function decrypt(encryptedText) {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// Encrypt data
function encrypt(text) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

// Routes
exports.createNewUser = async (req, res) => {
    const { first_name, last_name, email, picture, password, phone, role } = req.body;

    // Check if the email already exists
    // console.log("request made");
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(200).json({ message: 'Email already in use' });
    }
    // Create a new user
    const newUser = new User({ first_name, last_name, email, password, phone, picture, role });
    try {
        await newUser.save();
        const newCart = new Cart({ email, reservations: [] });
        await newCart.save();
        res.status(200).json({ message: "user added successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}
// login user api
exports.loginUser = async (req, res) => {
    // console.log("login request made");
    const { email, password } = req.body;
    // console.log(req.body);

    try {
        const user = await User.findOne({ email });
        // console.log(user);
        if (!user) {
            return res.status(200).json({ message: 'User not found' });
        }
        if (user.password === password) {
            res.status(200).json({ message: 'Login Successful', user });
        } else {
            res.status(200).json({ message: 'Credentials incorrect' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }

}

exports.deleteUser = async (req, res) => {
    const { email } = req.body;
    console.log(req);

    try {
        const deletedUser = await User.findOneAndDelete({ email });
        if (!deletedUser) {
            return res.status(200).json({ message: 'User not found' });
        }
        await Cart.findOneAndDelete({ email });
        res.json({ message: 'User deleted successfully', user: deletedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}



// Update user details by email
exports.updateUser = async (req, res) => {

    console.log("Update user API hit");
    console.log(req);
    const { first_name, last_name, email, phone } = req.body;

    try {
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { $set: { first_name, last_name, phone } },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(200).json({ message: 'User not found' });
        }
        res.json({ message: 'User updated successfully', user: updatedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.updateUserpicture = async (req, res) => {

    const { email } = req.body;
    // console.log(req);
    console.log(req.body);
    const pathPicture = req.file;
    // console.log(pathPicture);
    if (!pathPicture) {
        res.status(409).json({ message: "Image path not Found in backend" });
    }

    const imagePath = path.join(__dirname, '..', 'public', 'temp', pathPicture.filename);
    console.log(imagePath);
    const pictpath = await cloud.uploadOnCloudinary(imagePath);
    // console.log(pictpath);

    try {
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { $set: { picture: pictpath.url } },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(200).json({ message: 'User not found' });
        }
        res.json({ message: 'Picture updated successfully', user: updatedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }

};


exports.sendMailUpdatePassword = async (req, res) => {
    const { email } = req.body;
    const encryptedEmail = encrypt(email);
    const resetUrl = `${process.env.FRONTEND_URI}resetpassword?data=${encryptedEmail}`;

    // Email content
    const htmlContent = htmlTemplate.replace('[User Name]', email)
        .replace('[Reminder Message]', 'Greetings from BookStack! Below will be your link to reset the password\n\nClick on the following link to reset your password: ' + resetUrl)
        .replace('[Learn-more-link]', frontendUrl + 'about/');

    sendCustomMail(fromEmail = bookStackEmail, toEmail = email, subject = "Reset Your Password", html = htmlContent, function (error, info) {
        if (error) {
            console.log('Error:', error);
            return res.status(500).json({
                message: error,
                status: false
            });
        }
        // console.log('Email sent:');
        return res.status(200).json({
            message: "Reset email sent successfully",
            status: true
        });
    });
}

exports.resetPassword = async (req, res) => {
    const encryptedEmail = req.body.email;
    const email = decrypt(encryptedEmail);

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(200).json({ message: 'User not found' });
        }

        // Update user's password
        user.password = req.body.password;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.getUserData = async (req, res) => {
    const email = req.body.email;
    console.log(email);

    try {
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(200).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}


