const request = require("supertest");
const { app } = require("../../server");
const User = require("../../models/user.model");
const createUser = require("../factories/user.factory");
const { faker } = require("@faker-js/faker");
const { passwordHash } = require("../../helpers/bcrypt");
const { StatusCodes } = require("http-status-codes");

describe("User Routes", () => {
  describe("user registration", () => {
    it("should return 201 and the new user created", async () => {
      const password = "K12345";
      const hashedPassword = await passwordHash(password);

      const userData = {
        fullname: faker.person.fullName(),
        email: faker.internet.email(),
        password: hashedPassword,
        picture: faker.image.avatar(),
        isEmailVerified: false,
        typeOfUser: "Regular",
      };

      const response = await request(app)
        .post("/user/register")
        .set("content-type", "application/json")
        .send(userData);

      expect(response.status).toEqual(StatusCodes.CREATED);
      expect(response.body.message).toEqual("User created successfully");
      expect(response.body.user.fullname).toEqual(userData.fullname);
      expect(response.body.user.email).toEqual(userData.email);
      expect(response.body.user.typeOfUser).toEqual(userData.typeOfUser);
      expect(response.body.user.isEmailVerified).toEqual(
        userData.isEmailVerified
      );
    });
  });
});
