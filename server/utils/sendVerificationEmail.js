// utils/sendVerificationEmail.js
const nodemailer = require('nodemailer');

const sendVerificationEmail = async (email, token) => {
  // const transporter = nodemailer.createTransport({
  //   service: 'Gmail', // or your email service
  //   auth: {
  //   //   user: process.env.EMAIL_USER,
  //   //   pass: process.env.EMAIL_PASS,
  //   user: "dexpro988@gmail.com",
  //   pass: "czbggebyepfiqrwh",
  //   },
  //    tls: {
  //     rejectUnauthorized: false, // <== ADD THIS
  //   },
  // });
  const transporter = nodemailer.createTransport({
    host: "smtp.mail.yahoo.com",
    port: 587,
    secure: false, // <- must be false for STARTTLS
    auth: {
      user: process.env.YAHOO_USER,
      pass: process.env.YAHOO_PASS,
    },
    tls: {
      rejectUnauthorized: false, // optional, only if you get cert errors
    },
  });
  

  //const verificationUrl = `http://localhost:5000/api/users/verify-email?token=${token}`;
   const verificationUrl = `https://prodexmd.ba/api/users/verify-email?token=${token}`;

  const mailOptions = {
    // from: '"Your App Name" <your@email.com>',
    //from: 'dexpro988@gmail.com',
    from: process.env.YAHOO_USER,
    to: email,
    subject: 'Verifikujte vaš email',
    html: `
       <p>Hvla vam što ste se ragistrovali. Molimo vas da provjerite link ispod da biste verifikovali email:</p>
      <a href="${verificationUrl}">Verifikujte Email</a>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendVerificationEmail;
