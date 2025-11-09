const nodemailer = require('nodemailer');


const sendVerificationEmail1 = () => {
  console.log('Pogodio sam ovdiiii!!!!')
   // Create a transporter object using SMTP transport
   const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'dexpro988@gmail.com',
            pass: 'czbggebyepfiqrwh'
        },
        tls: {
            rejectUnauthorized: false // <- Accept self-signed certs
        }
});


    // Define email options
    const mailOptions = {
    from: 'dexpro988@gmail.com',
    to: 'prodanovicd132@gmail.com',
    subject: 'Hello from Node.js!',
    text: 'This is a test email sent from a Node.js server using Nodemailer.'
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.error('Error sending email:', error);
    }
    console.log('Email sent:', info.response);
    });
};

module.exports = { sendVerificationEmail1 };

// export const sendVerificationEmail = () => {
//     // Create a transporter object using SMTP transport
//     const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'dexpro988@gmail.com',
//         pass: 'czbggebyepfiqrwh' // use App Password if 2FA is enabled
//     }
//     });

//     // Define email options
//     const mailOptions = {
//     from: 'dexpro988@gmail.com',
//     to: 'prodanovicd132@gmail.com',
//     subject: 'Hello from Node.js!',
//     text: 'This is a test email sent from a Node.js server using Nodemailer.'
//     };

//     // Send the email
//     transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         return console.error('Error sending email:', error);
//     }
//     console.log('Email sent:', info.response);
//     });

//     };

