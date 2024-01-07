const nodemailer = require("nodemailer");
const { template } = require("../utils/mail-template");
require("dotenv").config();

const nm = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: true,
  },
});
const transporter = (email, subject, content, signature) => {
  const htmltemplate = template.default(subject, content, signature);
  return new Promise((resolve, reject) => {
    nm.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: content,
      html: htmltemplate,
    })
      .then((msg) => {
        resolve(msg);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
};

module.exports = { transporter };
