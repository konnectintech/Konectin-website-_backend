const { transporter } = require("../config/email");
const intern = require("../models/internshipModel");
const newsletter = require("../models/newsletter");

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
    const msg = `This email is to signify that you have reqed to be notified when the internship service launch.
			<p class="text-xs my-1 text-center">If you did not req this email, kindly ignore it or reach out to support if you think your account is at risk.</p>
		`;
    await transporter(email, subject, msg);
    return res.status(200).json({
      message:
        "You will be notified accordingly, please check your email for a vverification message",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error, try again later!" });
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
    return res
      .status(500)
      .json({ message: "Server error, try again later!" });
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
    return res
      .status(500)
      .json({ message: "Server error, try again later!" });
  }
};