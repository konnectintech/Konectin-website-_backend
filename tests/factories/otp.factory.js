const { createUser } = require("./user.factory");
const RegisterOTP = require("../../models/registerOTP");
const { faker } = require("@faker-js/faker");
const { v4 } = require("uuid");
const randomOTP = v4();

const createOTP = async (otpData = {}) => {
  const user = await createUser();

  const defaultOTPData = new RegisterOTP({
    userId: user._id,
    OTP: randomOTP,
    expiresIn: faker.date.soon(),
    ...otpData,
  });

  await defaultOTPData.save();

  return defaultOTPData;
};

module.exports = { createOTP };
