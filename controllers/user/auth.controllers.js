const User = require("../../models/user.model");
const { passwordCompare, passwordHash } = require("../../helpers/bcrypt");
const { transporter } = require("../../config/email");
const { generateRegisterOTP } = require("../../helpers/registerToken");
const { generatePasswordOTP } = require("../../helpers/passwordToken");
const RegisterOTP = require("../../models/registerOTP");
const { jwtSign } = require("../../helpers/jsonwebtoken");
const { ResetPasswordEmail } = require("../../utils/resetPasswordEmail");
const moment = require("moment-timezone");
const { verifyEmail } = require("../../utils/verifyEmail");
const { countries, getCountry } = require("../../utils/countrySearch");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const { StatusCodes } = require("http-status-codes");

require("dotenv").config();
const { uploadFile } = require("../../helpers/aws");

exports.register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    let pictureUrl;
    if (req.files && req.files.picture) {
      const pictureFile = req.files.picture;
      pictureUrl = await uploadFile(pictureFile.tempFilePath, pictureFile.name);
    }

    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: "User already exists" });
    }

    const hashedPassword = await passwordHash(password);
    const user = new User({
      fullname: fullname,
      email: email,
      password: hashedPassword,
      picture: pictureUrl,
    });
    await user.save();
    if (
      process.env.NODE_ENV === "development" ||
      process.env.NODE_ENV === "production"
    ) {
      // Generate OTP
      const token = await generateRegisterOTP(user._id);
      // Email Subject
      const subject = "Konectin Technical - Email Verification";
      // Email body
      const msg = verifyEmail(user.fullname.split(" ")[0], user.email, token);
      //Send email
      await transporter(user.email, subject, msg);
      //
    }

    return res
      .status(StatusCodes.CREATED)
      .json({ message: "User created successfully", user });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};

exports.verifyEmailAddress = async (req, res) => {
  try {
    const { OTP } = req.body;
    const email = req.query.email;
    const token = await RegisterOTP.findOne({ OTP: OTP });

    if (!token) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "otp does not exist" });
    }
    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User does not exist" });
    }

    if (token.expiresIn < new Date()) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Token has expired, please request a new one",
      });
    }

    user.isEmailVerified = true;
    await user.save();

    return res
      .status(StatusCodes.OK)
      .json({ message: "Email verified successfully", user });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Please fill all required fields" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User does not exist" });
    }
    const passwordMatch = await passwordCompare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Incorrect password" });
    }

    if (user.isEmailVerified !== true) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Your email is not verified" });
    }
    const payload = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
    };
    const token = jwtSign(payload);

    return res.status(StatusCodes.OK).json({
      message: "User logged in successfully!",
      token: token,
      data: payload,
    });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};

exports.removeEmail = async (req, res) => {
  try {
    const { email } = req.query;
    const userExist = await User.exists({ email });
    if (!userExist)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Email does not exist" });

    const user = await User.findOneAndDelete({ email });
    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Email deletion failed" });
    }

    return res
      .status(StatusCodes.OK)
      .json({ message: "Email deleted successfully!" });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error, try again later!" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { userId } = req.query;
    const user = await User.findById({ _id: userId });

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No such user exists" });
    }

    return res
      .status(StatusCodes.OK)
      .json({ message: "User profile fetched successfully", user });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};

exports.googleLogin = async (req, res) => {
  const { displayName, email } = req.body;

  const password = "googlesignup";

  const user = User.findOne({ email }).exec();
  const token = jwtSign(payload);

  if (!user) {
    await new user({
      email: email,
      fullname: displayName,
      password: password,
      typeOfUser: "Google",
    }).save();

    const payload = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
    };

    return res.status(StatusCodes.OK).json({
      message: "User logged in successfully!",
      data: user,
      token: token,
    });
  } else {
    return res.status(StatusCodes.OK).json({
      message: "User logged in successfully!",
      data: user,
      token: token,
    });
  }
};

exports.microsoftLogin = async function (req, res) {
  const { name, username: email } = req.body;
  if (!name && !email) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please fill all required fields" });
  }
  try {
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
  let user = await User.findOne({ email, typeOfUser: "Microsoft" });
  if (user) {
    const payload = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
    };
    const token = jwtSign(payload);
    return res.status(StatusCodes.OK).json({
      message: "User logged in successfully!",
      token: token,
      data: payload,
    });
  }
  user = await User.create({
    fullname: name,
    email: email,
    password: null,
    typeOfUser: "Microsoft",
  });
  const payload = {
    _id: user._id,
    fullname: user.fullname,
    email: user.email,
  };
  const token = jwtSign(payload);
  user.token = token;
  return res
    .status(StatusCodes.OK)
    .json({ message: "User logged in successfully", token, data: payload });
};

exports.requestEmailToken = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Please sign up before requesting a new token" });
    }
    const token = await generateRegisterOTP(user._id);

    const subject = "Konectin Technical - OTP Code request";
    const msg = `Use this code to verify your Konectin account. It expires in 10 minutes.
              <h1 class="code block text-5xl text-center font-bold tracking-wide my-10">${token}</h1>
              <p class="text-xs my-1 text-center">If you did not request this email, kindly ignore it or reach out to support if you think your account is at risk.</p>
          `;
    await transporter(email, subject, msg);
    return res
      .status(StatusCodes.OK)
      .json({ message: "Check your email for the verification code" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//endpoint for forget password
exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    let ipAddress = req.ip;
    const userAgent = req.get("user-agent");

    const user = await User.findOne(
      { email: email },
      { email: 1, fullname: 1 }
    );

    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Please sign-up first" });
    }
    //
    const isIPv6 = /^[:0-9a-fA-F]+$/.test(`${ipAddress}`);
    if (isIPv6) {
      // Extract the IPv4 part (if it's an IPv6-mapped IPv4 address)
      ipAddress = ipAddress.includes("::ffff:")
        ? ipAddress.replace(/^.*:/, "")
        : null;
    }
    if (!ipAddress) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Some error occured, try again later" });
    }
    //Get location
    const response = await fetch(`https://ipinfo.io/${ipAddress}/json`);
    if (!response.ok) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Some error occured, try again later" });
    }

    const locationData = await response.json();
    const countryAbbreviation = locationData.country;
    const sortedData = countries.sort(
      (a, b) => a.abbreviation - b.abbreviation
    );

    let location = getCountry(sortedData, countryAbbreviation);
    location !== -1 ? location : (location = countryAbbreviation);
    let device = userAgent;

    const token = await generatePasswordOTP(user._id);
    const subject = "Konectin Technical - Reset password";
    const msg = ResetPasswordEmail(
      user.fullname.split(" ")[0],
      location,
      device,
      token
    );
    await transporter(email, subject, msg);
    return res.status(StatusCodes.OK).json({
      message: "Please check email for the code to reset your password",
    });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};

// Endpoint to verify OTP
exports.verifyOtp = async (req, res) => {
  try {
    const { OTP } = req.body;

    if (!OTP) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Please provide OTP" });
    }

    // Check if the OTP exists and is valid
    const token = await RegisterOTP.findOne({ OTP: OTP });

    if (!token) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Invalid OTP" });
    }
    if (moment(token.expiresIn) < moment()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "The OTP has expired, please req a new one" });
    }
    // OTP is valid
    return res
      .status(StatusCodes.OK)
      .json({ message: "OTP verified successfully" });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};

//endpoint to reset password
exports.resetPassword = async (req, res) => {
  try {
    const { OTP, password, confirmPassword, email } = req.body;
    if (!OTP || !password || !confirmPassword || !email) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Please fill all fields" });
    }

    if (password !== confirmPassword) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Passwords do not match" });
    }

    const token = await RegisterOTP.findOne({ OTP: OTP });

    if (!token) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Invalid or expired token" });
    }

    if (token.expiresIn < Date.now()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "The token has expired, please req a new one" });
    }

    // Fetch the user's email from the database
    const user = await User.findById(token.userId).select("email").exec();

    if (!user || user.email !== email) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid email address" });
    }

    const hashedPassword = await passwordHash(password);

    await User.findByIdAndUpdate(
      { _id: token.userId },
      { $set: { password: hashedPassword } },
      { new: true }
    ).exec();
    return res
      .status(StatusCodes.OK)
      .json({ message: "Password updated successfully, please login" });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};

exports.logOut = async function (req, res) {
  try {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "In development" });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};
