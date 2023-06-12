const makeSendEmail = require('./send-email');
const nodemailer = require('nodemailer')

const sendEmail = makeSendEmail({
    nodemailer,
});


module.exports = Object.freeze({
    sendEmail,
})