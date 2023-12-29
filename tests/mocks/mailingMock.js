const nodemailerMock = require("nodemailer-mock");

const transporterMock = nodemailerMock.createTransport();

const transporterTest = (email, subject, content, signature) => {
  const htmltemplate = template.default(subject, content, signature);
  return new Promise((resolve, reject) => {
    transporterMock
      .sendMail({
        from: "test@conectIn.org",
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

module.exports = transporterTest;
