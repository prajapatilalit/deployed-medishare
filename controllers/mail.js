
const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

const auth = {
    auth: {
        api_key: 'your_api',
        domain: 'your_domain'
    },
    tls: {
        rejectUnauthorized: false
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (email, subject, text, cb) => {
    const mailOptions = {
        from: email,
        to: 'aditya.metal01@gmail.com',
        subject: 'Notification - Data is Accessed!',
        text: 'Hi patient_name,\n Your Data has been accessed By Dr. doctor_name'
    };
    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
            cb(err, null);
        } else {
            console.log('Message Sent: %s', data.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(data));
            cb(null, data);
        }
    });
}

// Exporting the sendmail
module.exports = sendMail;
