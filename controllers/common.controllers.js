const { transporter, sendHtmlEmail } = require("../config/email");
const { internSubSchema } = require("../helpers/internSubscriptionValidate");
const intern = require("../models/internshipModel");
const newsletter = require("../models/newsletter");
const internSubscription = require("../models/internSubscription.model");
const cloudinary = require("cloudinary").v2;
const subscribedInternEmail = require("../utils/subscribedIntern");

cloudinary.config({
  secure: true,
});

require("dotenv").config();

exports.konectinInternshipMail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Your email is required" });
    }
    const find = await intern.findOne({ email: email });
    if (find) {
      return res.status(400).json({ message: "You already subscribed" });
    }
    const internship = new intern({
      email: email,
    });
    await internship.save();
    const subject = "Konectin Technical - Konectin Internship";
    const msg = `This email is to signify that you have requested to be notified when the internship service launch.
			<p class="text-xs my-1 text-center">If you did not req this email, kindly ignore it or reach out to support if you think your account is at risk.</p>
		`;
    await transporter(email, subject, msg);
    return res.status(200).json({
      message:
        "You will be notified accordingly, please check your email for a vverification message",
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error, try again later!" });
  }
};

exports.subscribeNewsLetter = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Your email is required" });
    }
    const user = await newsletter.findOne({ email: email });

    if (user) {
      return res.status(400).json({ message: "You already subscribed" });
    }
    const news = new newsletter({
      email: email,
    });
    await news.save();
    const subject = "Konectin Technical";
    const msg = `This email is to signify that you have successfully subscribed to our newsletter.
          <p class="text-xs my-1 text-center">If you did not req this email, kindly ignore it or reach out to support if you think your account is at risk.</p>
        `;
    await transporter(email, subject, msg);
    return res.status(200).json({ message: "Subscribed successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Server error, try again later!" });
  }
};

exports.unsubscribeNewsLetter = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await newsletter.findOne({ email: email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "You need to be subscribed first" });
    }
    await user.deleteOne();
    const subject = "Konectin Technical";
    const msg = `This email is to signify that you have successfully unsubscribed from our newsletter.
			<p class="text-xs my-1 text-center">If you did not req this email, kindly ignore it or reach out to support if you think your account is at risk.</p>
		`;
    await transporter(email, subject, msg);
    return res.status(200).json({
      message: "You have successfully unsubscribed from the mailing list.",
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error, try again later!" });
  }
};

exports.subscribeIntern = async (req, res) => {
  const userId = req.query.userId;
  const body = req.body;
  try {
    const intern = await internSubscription.findOne({ userId: userId });
    if (intern) {
      return res.status(400).json({ message: "You already subscribed" });
    }
    const { error, value } = internSubSchema.validate(body);
    if (error) {
      return res.status(400).json({ Error: error.details[0].message });
    }

    const data = await internSubscription.create({ userId: userId, ...value });
    message = subscribedInternEmail({ ...data.basicDetails, role: data.internType, upload: data.upload })
    await sendHtmlEmail(
      "interns@konectin.org",
      "New Konectin Internship Subscription",
      message
    );

    const { firstName, role, upload } = data.basicDetails;
    const emailContent = `
      <div style="background-color: #1E1E1E; color: white; padding: 20px;">
        <h1 style="color: white;">Welcome to Konectin's Internship Program!</h1>
        <p>Dear ${firstName},</p>
        <p>Welcome to Konectin's Internship Program! We're excited to have you on board.</p>
        <p>Our mission is to connect talented individuals like you with amazing internship opportunities that align with your career goals. Our platform is designed to provide you with a seamless experience, from creating your profile to getting matched with the perfect internship. This program is designed to be a stepping stone to your future career. Stay tuned for updates on available internships and don't hesitate to reach out if you have any questions. We're here to support you every step of the way.</p>
        <p>Welcome to the Konectin community!</p>
        <p>Best Regards,<br>Konectin Team</p>
        <div style="margin-top: 20px;">
          <h3>Learn more about us</h3>
          <p>Join our community on X.com and LinkedIn for updates, networking opportunities, and more.</p>
          <a href="https://www.konectin.com/community" style="background-color: #6A5ACD; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Join our community</a>
        </div>
        <div style="display: flex; justify-content: center; margin-top: 20px;">
          <a href="https://www.linkedin.com/company/konectin" target="_blank" style="margin-right: 10px;"><img src="linkedin-icon.png" alt="LinkedIn" width="30" height="30"></a>
          <a href="https://twitter.com/konectin" target="_blank" style="margin-right: 10px;"><img src="twitter-icon.png" alt="Twitter" width="30" height="30"></a>
          <a href="https://www.facebook.com/konectin" target="_blank"><img src="facebook-icon.png" alt="Facebook" width="30" height="30"></a>
        </div>
        <div style="margin-top: 20px; font-size: 12px;">
          <a href="https://www.konectin.com" style="color: white; text-decoration: none;">www.konectin.com</a> - <a href="https://www.konectin.com/terms-of-service" style="color: white; text-decoration: none;">Terms of service</a> - <a href="https://www.konectin.com/privacy-policy" style="color: white; text-decoration: none;">Privacy Policy</a> - <a href="https://www.konectin.com/faq" style="color: white; text-decoration: none;">FAQ</a>
        </div>
        <div style="margin-top: 10px; font-size: 12px;">
          Copyright © 2023 Konectin.
        </div>
        <div style="margin-top: 10px; font-size: 12px;">
          Konectin Address
        </div>
      </div>
    `;

    // Send email
    await sendHtmlEmail(
      "interns@konectin.org",
      "New Konectin Internship Subscription",
      emailContent
    );

    return res.status(201).json({ message: "Subscribed successfully", data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error, try again later!" });
  }
};

exports.updateSubscribeIntern = async (req, res) => {
  const userId = req.query.userId;
  const update = req.body;
  try {
    const intern = await internSubscription.findOne({ userId: userId });
    if (!intern) {
      return res.status(404).json({ message: "Not Found" });
    }
    const { error, value } = internSubSchema.validate(update);

    if (error) {
      return res.status(400).json({ Error: error.details[0].message });
    }

    const data = await internSubscription.findOneAndUpdate(
      { userId: userId },
      value
    );
    return res.status(201).json({ message: "Updated successfully", data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error, try again later!" });
  }
};

exports.uploadFile = async (req, res) => {
  const file = req.files.file;

  if (!file) {
    return res.status(400).json({ message: "Please upload a file" });
  }
  const options = {
    unique_filename: true,
    overwrite: true,
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(file.tempFilePath, options);
    return res
      .status(200)
      .json({
        messgae: "File Uploaded Successfully",
        data: { url: result.secure_url },
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
