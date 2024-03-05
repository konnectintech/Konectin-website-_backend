const nodemailer = require("nodemailer");
const { template } = require("../utils/mail-template");
require("dotenv").config();

const nm = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
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
