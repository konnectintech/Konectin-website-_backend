const faker = require("@faker-js/faker");
const User = require("../../models/user.model");

const createUser = () => {
  return new User({
    fullName: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    picture: faker.image.avatar(),
    isEmailVerified: faker.random.boolean(),
    typeOfUser: faker.random.arrayElement(["Regular", "Google", "Microsoft"]),
  });
};

module.exports = createUser;
