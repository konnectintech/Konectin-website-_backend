const { createUser } = require("./user.factory");
const RegisterOTP = require("../../models/registerOTP");
const { faker } = require("@faker-js/faker");
const { v4 } = require("uuid");
const randomOTP = v4();

const createOTP = async (otpData = {}) => {
  const user = await createUser();

  const defaultOTPData = {
    userId: user._id,
    OTP: randomOTP,
    expiresIn: faker.date.soon(),
  };

  const finalOTPData = { ...defaultOTPData, ...otpData };

  const otp = new RegisterOTP(finalOTPData);
  await otp.save();

  return otp;
};

module.exports = { createOTP };
