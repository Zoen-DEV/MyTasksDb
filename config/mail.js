require('dotenv').config();
const nodemailer = require("nodemailer");
const { EMAIL, PASS } = process.env

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: EMAIL,
    pass: PASS,
  },
  tls: {
     rejectUnauthorized: false,
  },
});

transporter
   .verify()
   .then(() => {
      console.log("Ready for send emails");
   })
   .catch((err) => {
      console.log(err);
   });