const User = require("../../models/user.model");
const { passwordHash } = require("../../helpers/bcrypt");
const UserRoleEnum = require("../../utils/enums/userRoleEnum");
const createUser = async (overrides = {}) => {
  const user = new User({
    fullname: "jehanne",
    email: "jehanne@gmail.com",
    password: await passwordHash("K123456"),
    ...overrides,
  });

  await user.save();

  return user;
};

module.exports = { createUser };
