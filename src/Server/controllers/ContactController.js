const transporter = require('../utils/SendMail');
require('dotenv').config();

const { SENDER_EMAIL } = process.env;

async function sendAcknowledgementEmail(req, res) {
    try {
        const { Name, Email } = req.body

        const mailOptions = {
            from: SENDER_EMAIL,
            to: Email,
            subject: 'Thank You for Reaching Out to The Wardrobe',
            text: `
            Hello ${Name},

            Thank you for contacting The Wardrobe! We've received your message, and our team is reviewing it. We're committed to providing prompt assistance, so you can expect a response within the next 24-48 hours.

            If your inquiry is urgent, please feel free to call us at +91 95172 72735 during our business hours, and our support team will be happy to assist.

            Thank you for choosing The Wardrobe. We're here to help you look and feel your best!

            Warm regards,
            The Wardrobe Team

            This is an automated response to confirm we have received your message. Our team will get back to you soon.
            `,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Email Sent Successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server error', error: error.message });
    }
}

module.exports = sendAcknowledgementEmail