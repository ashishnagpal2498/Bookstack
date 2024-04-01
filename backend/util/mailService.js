// Author - Abhinav Acharya Tirumala Vinjamuri
var transporter = require('./transporter');

function sendCustomMail(fromEmail, toEmail, subject, html, callback) {
    const mailOptions = {
        from: fromEmail,
        to: toEmail,
        subject: subject,
        html: html
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Error:', error);
            callback(error, null);
        } else {
            // console.log('Email sent:', info);
            callback(null, info);
        }
    });
}

module.exports = sendCustomMail;