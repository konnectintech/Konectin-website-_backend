const passwordOTP = require('../models/passwordOTP');
const User = require('../models/user.model');
const moment = require("moment-timezone");
const randToken = require('rand-token').generator({
  chars: '0-9',
});

const generatePasswordOTP = async (userId) => {
  let random = randToken.generate(6);
  const token = new passwordOTP({
    userId: userId,
    OTP: random,
    expiresIn: moment().add(10, 'minutes'),
  });
  await token.save();
  return random;
};

module.exports = { generatePasswordOTP };
