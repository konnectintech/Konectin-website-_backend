const request = require("supertest");
const { app } = require("../../server");
const { createUser } = require("../factories/user.factory");
const { faker } = require("@faker-js/faker");
const { passwordHash } = require("../../helpers/bcrypt");
const { StatusCodes } = require("http-status-codes");
const { createOTP } = require("../factories/otp.factory");
const { v4 } = require("uuid");
const randomOTP = v4();
const User = require("../../models/user.model");

describe("Auth Routes", () => {
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

    it("should return an error if some one the fields is missing", async () => {
      const userData = {
        picture: faker.image.avatar(),
        isEmailVerified: false,
        typeOfUser: "Regular",
      };

      const response = await request(app)
        .post("/user/register")
        .set("content-type", "application/json")
        .send(userData);

      expect(response.status).toEqual(StatusCodes.BAD_REQUEST);
      expect(response.body.message).toEqual("Please fill all required fields");
    });

    it("should return a conflict error if a user already exists", async () => {
      const password = "K12345";
      const hashedPassword = await passwordHash(password);

      // Create the user in the database
      const existingUser = await createUser();

      const userData = {
        fullname: existingUser.fullname,
        email: existingUser.email,
        password: hashedPassword,
      };

      const response = await request(app)
        .post("/user/register")
        .set("content-type", "application/json")
        .send(userData);

      expect(response.status).toEqual(StatusCodes.CONFLICT);
      expect(response.body.message).toEqual("User already exists");
    });
  });

  describe("Email Verification", () => {
    it("should return Email verified successfully ", async () => {
      const user = await createUser();
      const otp = await createOTP({ userId: user._id });

      const response = await request(app)
        .post("/user/verifyemail")
        .send({ OTP: otp.OTP })
        .query({ email: user.email });

      //check if isEmailVerified: true
      const isUserVerified = await User.findOne({ email: user.email });

      expect(response.status).toEqual(StatusCodes.OK);
      expect(isUserVerified.isEmailVerified).toEqual(true);
      expect(response.body.message).toEqual("Email verified successfully");
    });

    it("should return error if the token does not exist", async () => {
      const user = await createUser();

      const otp = {
        userId: user._id,
        OTP: randomOTP,
        expiresIn: faker.date.soon(),
      };

      const response = await request(app)
        .post("/user/verifyemail")
        .send({ OTP: otp.OTP })
        .query({ email: user.email });

      expect(response.status).toEqual(StatusCodes.NOT_FOUND);
      expect(response.body.message).toEqual("otp does not exist");
    });

    it("should return error if the user does not exist", async () => {
      const otp = await createOTP();

      const response = await request(app)
        .post("/user/verifyemail")
        .send({ OTP: otp.OTP })
        .query({ email: "johanita@gmail.com" });

      expect(response.status).toEqual(StatusCodes.NOT_FOUND);
      expect(response.body.message).toEqual("User does not exist");
    });

    it("should return an error if the token has been expired if the expiredIn is less that the current moment", async () => {
      const user = await createUser();
      const otp = await createOTP({
        userId: user._id,
        expiresIn: faker.date.past(),
      });
      const response = await request(app)
        .post("/user/verifyemail")
        .send({ OTP: otp.OTP })
        .query({ email: user.email });

      expect(response.status).toEqual(StatusCodes.BAD_REQUEST);
      expect(response.body.message).toEqual(
        "Token has expired, please request a new one"
      );
    });
  });
});
