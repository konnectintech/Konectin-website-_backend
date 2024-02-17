const { transporter } = require('../../config/email');

exports.sendContactEmail = async (req, res) => {
  try {
    const { mail, topic, message, files } = req.body;

    if (!mail || !topic || !message) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const mailContent = `
      From: ${mail}
      Topic: ${topic}
      Message: ${message}
      Attachments: ${files.join(', ')}
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'info@konectin.org',
      subject: `Contact Us: ${topic}`,
      text: mailContent,
      attachments: files.map((file) => ({
        filename: file.split('/').pop(),
        path: file,
      })),
    };

    await transporter(mailOptions.to, mailOptions.subject, mailOptions.text, '');

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};