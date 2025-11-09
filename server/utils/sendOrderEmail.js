// // utils/sendOrderEmail.js
// const nodemailer = require('nodemailer');

// const sendOrderEmail = async ({ ime, prezime, kompanija, email, adresa, telefon, placanje, cartItems }) => {

// // console.log('ovde sam isto')
// // console.log(process.env.EMAIL_USER)
// // console.log(process.env.EMAIL_PASS)

//   // const transporter = nodemailer.createTransport({
//   //   service: 'Gmail',
//   //   auth: {
//   //     user: process.env.EMAIL_USER,
//   //     pass: process.env.EMAIL_PASS,
//   //       //  user: "dexpro988@gmail.com",
//   //       //  pass: "czbggebyepfiqrwh",
//   //   },
//   //   tls: {
//   //     rejectUnauthorized: false,
//   //   },
//   // });
//   const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false, // <--- use STARTTLS
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });


//   const productListText = cartItems.map(item => {
//     const itemPrice = item.price > 0 ? `${item.price} KM` : "Cijena po upitu";
//     const itemTotal = item.price > 0 ? `${(item.price * item.quantity).toFixed(2)} KM` : "N/A";
//     return `- ${item.name} (x${item.quantity}) - Jedinična cijena: ${itemPrice} - Ukupno: ${itemTotal}`;
//   }).join("\n");

//   const totalPrice = cartItems.reduce((sum, item) => {
//     if (item.price > 0) return sum + item.price * item.quantity;
//     return sum;
//   }, 0).toFixed(2);

//   const greeting = kompanija ? `Poštovani,` : `Poštovani ${ime} ${prezime},`;

//   const mailOptions = {
//     from: "dexpro988@gmail.com",
//     to: email,
//     subject: 'Potvrda kupovine',
//     text: `
// ${greeting}

// Hvala vam na kupovini.

// 🧾 Detalji narudžbe:
// Adresa: ${adresa}
// Telefon: ${telefon}
// Način plaćanja: ${placanje === "pouzecem" ? "Plaćanje pouzećem" : "Plaćanje na žiro račun"}

// 🛍️ Kupljeni proizvodi:
// ${productListText}

// 💰 Ukupno za platiti: ${totalPrice} KM

// Ukoliko imate pitanja, slobodno nas kontaktirajte.

// Srdačan pozdrav,
// Prodex Modriča 
//     `,
//   };

//   await transporter.sendMail(mailOptions);
// };

// module.exports = sendOrderEmail;

const nodemailer = require('nodemailer');

const sendOrderEmail = async ({ ime, prezime, kompanija, email, adresa, telefon, placanje, cartItems }) => {
  // const transporter = nodemailer.createTransport({
  //   host: "smtp.gmail.com",
  //   port: 587,
  //   secure: false,
  //   auth: {
  //     user: process.env.EMAIL_USER,
  //     pass: process.env.EMAIL_PASS,
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
  //   service: 'Gmail',
  //   auth: {
  //     // user: process.env.EMAIL_USER,
  //     // pass: process.env.EMAIL_PASS,
  //          user: "dexpro988@gmail.com",
  //         pass: "czbggebyepfiqrwh",
  //   },
  //   tls: {
  //     rejectUnauthorized: false,
  //   },
  // });

  const productRows = cartItems.map((item, index) => {
    const itemPrice = item.price > 0 ? `${item.price} KM` : "Cijena po upitu";
    const itemTotal = item.price > 0 ? `${(item.price * item.quantity).toFixed(2)} KM` : "N/A";

    return `
      <tr>
        <td style="text-align:center;">${index + 1}</td>
        <td>${item.serialNumber}</td>
        <td>${item.name}</td>
        <td style="text-align:center;">${item.quantity}</td>
        <td style="text-align:right;">${itemPrice}</td>
        <td style="text-align:right;">${itemTotal}</td>
      </tr>`;
  }).join("");

  const totalPrice = cartItems.reduce((sum, item) => {
    if (item.price > 0) return sum + item.price * item.quantity;
    return sum;
  }, 0).toFixed(2);

  const greeting = kompanija ? `Poštovani,` : `Poštovani ${ime} ${prezime},`;

  const mailOptions = {
    // from: "prodexns@gmail.com",
    from: "prodexmd@yahoo.com",
    to: email,
    subject: 'Potvrda kupovine',
    html: `
      <p>${greeting}</p>
      <p>Hvala vam što se interesujete za naše proizvode. Ponudu šaljemo
       kada provjerimo raspoloživost proizvoda.</p>
      <h3>🧾 Detalji narudžbe:</h3>
      <p><strong>Adresa:</strong> ${adresa}<br/>
      <strong>Telefon:</strong> ${telefon}<br/>
      <strong>Način plaćanja:</strong> ${placanje === "pouzecem" ? "Plaćanje pouzećem" : "Plaćanje na žiro račun"}</p>

      <h3>🛍️ Proizvodi za koje se interesujete:</h3>
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

      <p><strong>💰 Ukupno za platiti:</strong> ${totalPrice} KM</p>

      <p>Ukoliko imate pitanja, slobodno nas kontaktirajte.</p>
      <p>Srdačan pozdrav,<br/>Prodex Modriča</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendOrderEmail;
