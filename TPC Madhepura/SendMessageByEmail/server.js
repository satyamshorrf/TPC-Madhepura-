const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the CORS middleware

const app = express();

// Middleware to parse JSON request body
app.use(bodyParser.json());

// Enable CORS for specific origin
app.use(cors({
  origin: 'http://127.0.0.1:5500' // Replace with the actual origin of your client-side code
}));

// Endpoint to send email
app.post('/send-email', (req, res) => {
    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com', // e.g., 'smtp.example.com'
      port: 465, // Your SMTP port (usually 587 for TLS or 465 for SSL)
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'yourmail@gmail.com', // Your SMTP username
        pass: '*********' // Your SMTP password
      }
    });
  
    // Email message options
    let mailOptions = {
      from: 'yourmail@gmail.com', // Sender email address
      to: req.body.email, // Recipient email address (passed from client-side)
      subject: req.body.subject, // Subject line (passed from client-side)
      text: `Received message from: ${req.body.email}\n\nMessage:\n${req.body.message}` // Email body
    };
  
    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error occurred:', error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent successfully:', info.response);
        res.status(200).send('Email sent successfully');
      }
    });
  });
  

// Middleware to handle CORS preflight requests
app.options('/send-email', cors());

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
