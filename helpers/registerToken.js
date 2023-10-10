const RegisterOTP = require('../models/registerOTP');
const User = require('../models/user.model');
const moment = require("moment-timezone")
const randToken = require('rand-token').generator({
  chars: '0-9',
});

const generateRegisterOTP = async (userId) => {
  let random = randToken.generate(6);
  const token = new RegisterOTP({
    userId: userId,
    OTP: random,
    expiresIn: moment().add(10, 'minutes'),
  });
  await token.save();
  return random;
};

module.exports = { generateRegisterOTP };
