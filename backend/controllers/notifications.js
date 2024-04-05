// Author - Abhinav Acharya Tirumala Vinjamuri
const usersSchema = require('../models/users');
const lateFeeSchema = require('../models/lateFeeSystem');
var sendCustomMail = require('../util/mailService.js');
const ObjectID = require('mongodb').ObjectId;
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const bookStackEmail = process.env.ADMIN_EMAIL;
const frontendUrl = process.env.FRONTEND_URI;
// Read the HTML content from the file
const htmlTemplate = fs.readFileSync('./email_templates/html_content.html', 'utf8');

// API to notify user of active late fees - for notify user button on admin late fee details page
// Access admin email from .env, user email from userSchema, send a mail to user.
exports.remindUserLateFee = async (req, res) => {
    try {
        const { user_id } = req.params;
        const user = await usersSchema.findOne({ _id: new ObjectID(user_id) });
        if (!user) {
            return res.status(404).json({
                message: "User not found!",
                status: false
            });
        }
        const htmlContent = htmlTemplate.replace('[User Name]', user.first_name + ' ' + user.last_name)
                            .replace('[Reminder Message]', 'Please pay your late fee as soon as possible to avoid further action.')
                            .replace('[Learn-more-link]', frontendUrl + 'latefee');
        sendCustomMail(fromEmail = bookStackEmail, toEmail = user.email, subject = "Late Fee Reminder", html = htmlContent, function (error, info) {
            if (error) {
                console.log('Error:', error);
                return res.status(500).json({
                    message: error,
                    status: false
                });
            }
            return res.status(200).json({
                message: "Reminder sent!",
                status: true
            });
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error,
            status: false
        });
    }
};

// API to notify admin of uncleared late fees - for dispute charge button on user late fee details page
exports.disputeLateFeeCharge = async (req, res) => {
    try {
        const { user_id } = req.params;
        // fetch admin from users schema
        const admin = await usersSchema.findOne({ role: 'admin' });
        const user = await usersSchema.findOne({ _id: new ObjectID(user_id) });
        // console.log("user", user);
        // console.log("admin", admin);
        if (!user || !admin) {
            return res.status(404).json({
                message: "Details not found!",
                status: false
            });
        }
        // send mail to admin
        const htmlContent = htmlTemplate.replace('[User Name]', admin.first_name + ' ' + admin.last_name)
                            .replace('[Reminder Message]', user.first_name + ' ' + user.last_name + ' has a dispute in their late fee charge. Please look into it!')
                            .replace('[Learn-more-link]', frontendUrl + 'latefee');
        
        sendCustomMail(fromEmail = bookStackEmail, toEmail = admin.email, subject = "Late Fee Reminder", html = htmlContent, function (error, info) {
            if (error) {
                console.log('Error:', error);
                return res.status(500).json({
                    message: error,
                    status: false
                });
            }
            // console.log('Email sent:');
            return res.status(200).json({
                message: "Reminder sent!",
                status: true
            });
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: error,
            status: false
        });
    }
};