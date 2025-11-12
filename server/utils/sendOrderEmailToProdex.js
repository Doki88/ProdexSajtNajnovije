// utils/sendOrderEmail.js
const nodemailer = require('nodemailer');

const sendOrderEmailToProdex = async ({ ime, prezime, kompanija, email, adresa, telefon, placanje, cartItems }) => {
  //  console.log('tuj sam')
  // const transporter = nodemailer.createTransport({
  //   service: 'Gmail',
  //   auth: {
  //     // user: process.env.EMAIL_USER,
  //     // pass: process.env.EMAIL_PASS,
   
  //   user: "dexpro988@gmail.com",
  //   pass: "czbggebyepfiqrwh",
  //   },
  //   tls: {
  //     rejectUnauthorized: false,
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

  //   const transporter = nodemailer.createTransport({
  //   host: "smtp.gmail.com",
  //   port: 587,
  //   secure: false, // <--- use STARTTLS
  //   auth: {
  //     user: process.env.EMAIL_USER,
  //     pass: process.env.EMAIL_PASS,
  //   },
  // });
  // Format cart items into text
    const productRows = cartItems.map((item, index) => {
    const itemPrice = item.price > 0 ? `${item.price} KM` : "Cijena po upitu";
    const itemTotal = item.price > 0 ? `${(item.price * item.quantity).toFixed(2)} KM` : "N/A";

    return `
      <tr>
        <td style="text-align:center;">${index + 1}</td>
        <td>${item.serialNumber}</td>
        <td>${item.name.replace(/^\d+\)\s*/, "")}</td>
        <td style="text-align:center;">${item.quantity}</td>
        <td style="text-align:right;">${itemPrice}</td>
        <td style="text-align:right;">${itemTotal}</td>
      </tr>`;
  }).join("");

  // Calculate total price
  const totalPrice = cartItems.reduce((sum, item) => {
    if (item.price > 0) {
      return sum + item.price * item.quantity;
    }
    return sum;
  }, 0).toFixed(2);

   const greeting = kompanija ? `Stigla je narudžba od ${kompanija},` : `Stigla je narudžba od ${ime} ${prezime},`;

  const mailOptions = {
    // from: process.env.EMAIL_USER,
    // from: "dexpro988@gmail.com",
    // to: "dexpro988@gmail.com",
    // from: "prodexns@gmail.com",
    // to: "prodexns@gmail.com",
    from: "prodexmd@yahoo.com",
    to: "prodexmd@yahoo.com",
    subject: 'Narudzba',
    html: `

    
    <p>${greeting}</p>

    <h3>🧾 Detalji narudžbe:</h3>
    <p><strong>Adresa:</strong> ${adresa}<br/>
    <strong>Telefon</strong>: ${telefon}<br/>
    <strong>Email</strong>: ${email}<br/>
    <strong>Način plaćanja:</strong> ${placanje === "pouzecem" ? "Plaćanje pouzećem" : "Plaćanje na žiro račun"}</p>

    <h3>🛍️ Izabrani proizvodi:</h3>
    <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr style="background-color: #f2f2f2;">
            <th>Redni broj</th>
            <th>Šifra</th>
            <th>Naziv</th>
            <th>Količina</th>
            <th>Cijena sa PDV</th>
            <th>Iznos</th>
          </tr>
        </thead>
        <tbody>
          ${productRows}
        </tbody>
      </table>

    💰 <p><strong>Ukupno za platiti:</strong> ${totalPrice} KM</p>
        `,
      };

      await transporter.sendMail(mailOptions);
};

module.exports = sendOrderEmailToProdex;
