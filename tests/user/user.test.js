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
const UserRoleEnum = require("../../utils/enums/userRoleEnum");

describe("Auth Routes", () => {
  describe("user registration", () => {
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
    it("should return 201 and the new user", async () => {
      const password = "K12345";
      const hashedPassword = await passwordHash(password);

      const userData = {
        fullname: "testFullName",
        email: "test@gmail.com",
        password: hashedPassword,
      };

      const response = await request(app)
        .post("/user/register")
        .set("content-type", "application/json")
        .send(userData);

      expect(response.status).toEqual(StatusCodes.CREATED);
      expect(response.body.message).toEqual("User created successfully");
      expect(response.body.user.fullname).toEqual(userData.fullname);
      expect(response.body.user.email).toEqual(userData.email);
      expect(response.body.user.isEmailVerified).toEqual(false);
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

  describe("User Login", () => {
    it("should login successfully", async () => {
      const password = "K12345";
      const hashedPassword = await passwordHash(password);

      const user = await createUser({
        password: hashedPassword,
        isEmailVerified: true,
      });

      const loginDto = {
        email: user.email,
        password: password,
      };

      const response = await request(app).post("/user/login").send(loginDto);
      expect(response.status).toEqual(StatusCodes.OK);
      expect(response.body.message).toEqual("User logged in successfully!");
      expect(response.body.data.fullname).toEqual(user.fullname);
      expect(response.body.data.email).toEqual(user.email);
      expect(response.body).toHaveProperty("token");
    });

    it("should return an error if email and password have not been provided", async () => {
      const response = await request(app).post("/user/login").send();
      expect(response.status).toEqual(StatusCodes.BAD_REQUEST);
      expect(response.body.message).toEqual("Please fill all required fields");
    });

    it("should return an error if a user does not exist", async () => {
      const loginDto = {
        email: faker.internet.email(),
        password: "password",
      };

      const response = await request(app).post("/user/login").send(loginDto);
      expect(response.status).toEqual(StatusCodes.NOT_FOUND);
      expect(response.body.message).toEqual("User does not exist");
    });
    it("should return an error if the password is wrong", async () => {
      const password = "K12345";
      const hashedPassword = await passwordHash(password);

      const user = await createUser({
        password: hashedPassword,
        isEmailVerified: true,
      });

      const loginDto = {
        email: user.email,
        password: "kdyt3267578",
      };

      const response = await request(app).post("/user/login").send(loginDto);
      expect(response.status).toEqual(StatusCodes.BAD_REQUEST);
      expect(response.body.message).toEqual("Incorrect password");
    });
  });

  describe("Get User", () => {
    it("should return user details", async () => {
      const user = await createUser({});

      const response = await request(app)
        .get("/user/getUser")
        .query({ userId: user.id });

      expect(response.status).toEqual(StatusCodes.OK);
      expect(response.body.message).toEqual(
        "User profile fetched successfully"
      );
      expect(response.body.user._id.toString()).toEqual(user._id.toString());
      expect(response.body.user.fullname).toEqual(user.fullname);
      expect(response.body.user.email).toEqual(user.email);
      expect(response.body.user.isEmailVerified).toEqual(user.isEmailVerified);
    });

    it("should return an error if a user is not found", async () => {
      const existingUserId = "5f4cc8f7e5a7de2a393a2a8b";
      const response = await request(app)
        .get("/user/getUser")
        .query({ userId: existingUserId });

      expect(response.status).toEqual(StatusCodes.NOT_FOUND);
      expect(response.body.message).toEqual("No such user exists");
    });
  });

  describe("VERIFY OTP", () => {
    it("should return an error if the otp has been expired", async () => {
      const user = await createUser();
      const otp = await createOTP({
        userId: user._id,
        expiresIn: faker.date.past(),
      });

      const response = await request(app)
        .post("/user/verify-otp")
        .send({ OTP: otp.OTP });

      expect(response.status).toEqual(StatusCodes.BAD_REQUEST);
      expect(response.body.message).toEqual(
        "The OTP has expired, please req a new one"
      );
    });

    it("should return an error if the otp does not exist", async () => {
      const user = await createUser();
      const otp = {
        userId: user._id,
        OTP: randomOTP,
        expiresIn: faker.date.soon(),
      };

      const response = await request(app)
        .post("/user/verify-otp")
        .send({ OTP: otp.OTP });

      expect(response.status).toEqual(StatusCodes.NOT_FOUND);
      expect(response.body.message).toEqual("Invalid OTP");
    });

    it("should verify otp", async () => {
      const user = await createUser();
      const otp = await createOTP({
        userId: user._id,
        expiresIn: faker.date.future(),
      });

      const response = await request(app)
        .post("/user/verify-otp")
        .send({ OTP: otp.OTP });

      expect(response.status).toEqual(StatusCodes.OK);
      expect(response.body.message).toEqual("OTP verified successfully");
    });
  });

  describe("REQUEST EMAIL TOKEN", () => {
    it("should request token to signin", async () => {
      const user = await createUser();

      const response = await request(app)
        .post("/user/requestEmail")
        .send({ email: user.email });

      expect(response.body.message).toEqual(
        "Check your email for the verification code"
      );
    });
    it("should return an error if user is not found", async () => {
      const response = await request(app)
        .post("/user/requestEmail")
        .send({ email: "test@email.com" });

      expect(response.status).toEqual(StatusCodes.BAD_REQUEST);
      expect(response.body.message).toEqual(
        "Please sign up before requesting a new token"
      );
    });
  });

  describe("FORGOT PASSWORD", () => {
    it("should return an error message if a user is not found", async () => {
      const response = await request(app)
        .post("/user/forgotPassword")
        .send({ email: "test@email.com" });

      expect(response.status).toEqual(StatusCodes.BAD_REQUEST);
      expect(response.body.message).toEqual("Please sign-up first");
    });

    it("should send the email successfully if user found", async () => {
      const user = await createUser();

      const response = await request(app)
        .post("/user/forgotPassword")
        .send({ email: user.email });

      expect(response.status).toEqual(StatusCodes.OK);
      expect(response.body.message).toEqual(
        "Please check email for the code to reset your password"
      );
    });
  });

  describe("RESET PASSWORD", () => {
    it("should return an error message if all fields are not filled", async () => {
      const user = await createUser();
      const otp = await createOTP({
        userId: user._id,
        expiresIn: faker.date.future(),
      });
      const password = "NewPassword@12";
      const response = await request(app)
        .post("/user/resetPassword")
        .send(otp.OTP, password, password);

      expect(response.status).toEqual(StatusCodes.BAD_REQUEST);
      expect(response.body.message).toEqual("Please fill all fields");
    });

    it("should return an error if passwords don't match", async () => {
      const user = await createUser();
      const otp = await createOTP({
        userId: user._id,
        expiresIn: faker.date.future(),
      });

      const response = await request(app).post("/user/resetPassword").send({
        password: "NewPassword@12",
        confirmPassword: "NewPassword@13",
        OTP: otp.OTP,
        email: user.email,
      });

      expect(response.status).toEqual(StatusCodes.BAD_REQUEST);
      expect(response.body.message).toEqual("Passwords do not match");
    });

    it("should return an error if token is expired", async () => {
      const user = await createUser();
      const otp = await createOTP({
        userId: user._id,
        expiresIn: faker.date.past(),
      });

      const response = await request(app).post("/user/resetPassword").send({
        password: "NewPassword@12",
        confirmPassword: "NewPassword@12",
        OTP: otp.OTP,
        email: user.email,
      });
      expect(response.status).toEqual(StatusCodes.BAD_REQUEST);
      expect(response.body.message).toEqual(
        "The token has expired, please req a new one"
      );
    });

    it("should return an error if no user", async () => {
      const user = await createUser();
      const otp = await createOTP({
        userId: user._id,
        expiresIn: faker.date.future(),
      });

      const response = await request(app).post("/user/resetPassword").send({
        password: "NewPassword@12",
        confirmPassword: "NewPassword@12",
        OTP: otp.OTP,
        email: "test@email.com",
      });

      expect(response.status).toEqual(StatusCodes.BAD_REQUEST);
      expect(response.body.message).toEqual("Invalid email address");
    });

    it("should return a successful message", async () => {
      const user = await createUser();
      const otp = await createOTP({
        userId: user._id,
        expiresIn: faker.date.future(),
      });
      const response = await request(app).post("/user/resetPassword").send({
        password: "NewPassword@12",
        confirmPassword: "NewPassword@12",
        OTP: otp.OTP,
        email: user.email,
      });

      expect(response.status).toEqual(StatusCodes.OK);
      expect(response.body.message).toEqual(
        "Password updated successfully, please login"
      );
    });
  });
});
