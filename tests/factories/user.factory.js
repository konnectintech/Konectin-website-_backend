const faker = require("@faker-js/faker");
const User = require("../../models/user.model");

const createUser = async (overrides = {}) => {
  const user = new User({
    fullname: "jehanne",
    email: "jehanne@gmail.com",
    password: "K123456",
    ...overrides,
  });

  await user.save();

  return user;
};

module.exports = { createUser };
