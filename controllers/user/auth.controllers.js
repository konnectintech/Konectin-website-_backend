const User = require("../../models/user.model");
const { passwordCompare, passwordHash } = require("../../helpers/bcrypt");
const { transporter } = require("../../config/email");
const { generateRegisterOTP } = require("../../helpers/registerToken");
const { generatePasswordOTP } = require("../../helpers/passwordToken");
const RegisterOTP = require("../../models/registerOTP");
const { jwtSign } = require("../../helpers/jsonwebtoken");
const passwordOTP = require("../../models/passwordOTP");
const { ResetPasswordEmail } = require("../../utils/resetPasswordEmail");
const moment = require("moment-timezone");

require("dotenv").config();

exports.register = async (req, res) => {
  try {
    const { fullname, email, password, profilePhoto } = req.body;
    if (!fullname && !email && !password) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await passwordHash(password);
    const user = new User({
      fullname: fullname,
      email: email,
      password: hashedPassword,
      picture: profilePhoto,
    });
    if (
      process.env.NODE_ENV === "development" ||
      process.env.NODE_ENV === "production"
    ) {
      const token = await generateRegisterOTP(user._id);
      const subject = "Konectin Technical - Email Verification";
      const msg = `Use this code to verify your Konectin account. It expires in 10 minutes.
                  <h1 class="code block text-5xl text-center font-bold tracking-wide my-10">${token}</h1>
                  <p class="text-xs my-1 text-center">If you did not req this email, kindly ignore it or reach out to support if you think your account is at risk.</p>
              `;

      await transporter(email, subject, msg);
    }

    await user.save();

    return res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    // return res.status(500).json({ message: err.message });
    return res.status(500).json({ message: "Server error, try again later!" });
  }
};

exports.verifyEmailAddress = async (req, res) => {
  try {
    const { OTP } = req.body;
    const email = req.query.email;
    const token = await RegisterOTP.findOne({ OTP: OTP });

    if (!token) {
      return res.status(404).json({ message: "otp does not exist" });
    }
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    if (token.expiresIn < new Date()) {
      return res.status(400).json({
        message: "Token has expired, please request a new one",
      });
    }

    await User.findByIdAndUpdate(
      { _id: user._id },
      { $set: { isEmailVerified: true } },
      { new: true }
    ).exec();
    await user.save();

    return res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Some error occured, try again later!" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }
    const passwordMatch = await passwordCompare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const payload = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
    };
    const token = jwtSign(payload);

    return res.status(200).json({
      message: "User logged in successfully!",
      token: token,
      data: payload,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error, try again later!" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { userId } = req.query;
    const user = await User.findById({ _id: userId });
    
    if (!user) {
      return res.status(404).json({ message: "No such user exists" });
    }
    
    return res
      .status(200)
      .json({ message: "User profile fetched successfully", user });
  } catch (err) {
    return res.status(500).json({ message: "Server error, try again later!" });
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

    return res.status(200).json({
      message: "User logged in successfully!",
      data: user,
      token: token,
    });
  } else {
    return res.status(200).json({
      message: "User logged in successfully!",
      data: user,
      token: token,
    });
  }
};

exports.microsoftLogin = async function (req, res) {
  const { name, username: email } = req.body;
  if (!name && !email) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }
  try {
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
  let user = await User.findOne({ email, typeOfUser: "Microsoft" });
  if (user) {
    const payload = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
    };
    const token = jwtSign(payload);
    return res.status(200).json({
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
    .status(200)
    .json({ message: "User logged in successfully", token, data: payload });
};

exports.requestEmailToken = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Please sign up before reqing a new token" });
    }
    const token = await generateRegisterOTP(user._id);
    const subject = "Konectin Technical - OTP Code req";
    const msg = `Use this code to verify your Konectin account. It expires in 10 minutes.
              <h1 class="code block text-5xl text-center font-bold tracking-wide my-10">${token}</h1>
              <p class="text-xs my-1 text-center">If you did not req this email, kindly ignore it or reach out to support if you think your account is at risk.</p>
          `;
    await transporter(email, subject, msg);
    return res
      .status(200)
      .json({ message: "Check your email for the verification code" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Some error occured, try again later!" });
  }
};

//endpoint for forget password
exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: "Please sign-up first" });
    }
    const token = await generatePasswordOTP(user._id);
    const subject = "Konectin Technical - Reset password";
    const msg = ResetPasswordEmail(token);
    await transporter(email, subject, msg);
    return res.status(200).json({
      message: "Please check email for the code to reset your password",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Some error occured, try again later" });
    console.log(err);
  }
};

// Endpoint to verify OTP
exports.verifyOtp = async (req, res) => {
  try {
    const { OTP } = req.body;

    if (!OTP) {
      return res.status(400).json({ message: "Please provide OTP" });
    }

    // Check if the OTP exists and is valid
    const token = await passwordOTP.findOne({ OTP: OTP });

    if (!token) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    console.log(moment(token.expiresIn), moment());
    if (moment(token.expiresIn) < moment()) {
      return res
        .status(400)
        .json({ message: "The OTP has expired, please req a new one" });
    }
    // OTP is valid
    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Some error occurred, try again later" });
  }
};

//endpoint to reset password
exports.resetPassword = async (req, res) => {
  try {
    const { OTP, password, confirmPassword, email } = req.body;
    if (!password || !confirmPassword || !OTP || !email) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const token = await passwordOTP.findOne({ OTP: OTP });

    if (!token) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    if (token.expiresIn < Date.now()) {
      return res
        .status(400)
        .json({ message: "The token has expired, please req a new one" });
    }

    // Fetch the user's email from the database
    const user = await User.findById(token.userId).select("email").exec();

    if (!user || user.email !== email) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    const hashedPassword = await passwordHash(password);

    await User.findByIdAndUpdate(
      { _id: token.userId },
      { $set: { password: hashedPassword } },
      { new: true }
    ).exec();
    return res
      .status(200)
      .json({ message: "Password updated successfully, please login" });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ message: "Some error occured, try again later" });
  }
};

exports.logOut = async function (req, res) {
  try {
    return res.status(400).json({ message: "In development" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error, try again later!" });
  }
};
