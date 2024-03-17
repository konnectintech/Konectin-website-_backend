const request = require("supertest");
const { app } = require("../../server");
const { createUser } = require("../factories/user.factory");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { faker } = require("@faker-js/faker");

faker.custom = {
  socialUsername: () => `username${faker.number.int()}`,
};

const jwtSign = (payload) => {
  return jwt.sign(payload, "K12345", { expiresIn: "24h" });
};

describe("Get user info", () => {
  it("should return user info if email is provided", async () => {
    const user = await createUser();
    const token = jwtSign({ _id: user._id });

    const res = await request(app)
      .get("/user/v2/getUserInfo")
      .query({ email: user.email })
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(StatusCodes.OK);
    expect(res.body.user.email).toBe(user.email);
  });

  it("should return 404 if user not found", async () => {
    const user = await createUser();
    const token = jwtSign({ _id: user._id });
    const res = await request(app)
      .get("/user/v2/getUserInfo")
      .query({ email: "none@example.com" })
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(StatusCodes.NOT_FOUND);
  });
});

describe("Get notification settings", () => {
  it("should get notification settings for user", async () => {
    // Create user
    const user = await createUser({
      notificationSettings: {
        emails: true,
        pushNotifications: true,
      },
    });

    const token = jwtSign({ _id: user._id });

    const res = await request(app)
      .get(`/user/v2/getNotificationSettings?userId=${user._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(StatusCodes.OK);
    expect(res.body.emails).toEqual(user.notificationSettings.emails);
    expect(res.body.pushNotifications).toEqual(
      user.notificationSettings.pushNotifications
    );
  });
});

describe("Update user", () => {
  it("should update user details", async () => {
    const user = await createUser({
      notificationSettings: {
        emails: true,
        pushNotifications: true,
      },
    });

    const token = jwtSign({ _id: user._id });
    const update = { fullname: "Jane" };

    const res = await request(app)
      .put(`/user/v2/updateUser?userId=${user._id}`)
      .send(update)
      .set("Authorization", `Bearer ${token}`);

    expect(res.body.fullname).toBe("Jane");
  });
});

describe("Update socials", () => {
  it("should update socials for user", async () => {
    // Create user
    const user = await createUser({
      notificationSettings: {
        emails: true,
        pushNotifications: true,
      },
      socials: {
        github: `https://github.com/${faker.custom.socialUsername()}`,
        linkedin: `https://www.linkedin.com/in/${faker.custom.socialUsername()}`,
      },
    });

    const token = jwtSign({ _id: user._id });

    const update = {
      socials: {
        github: `https://github.com/${faker.custom.socialUsername()}`,
        linkedin: `https://www.linkedin.com/in/${faker.custom.socialUsername()}`,
      },
    };

    const res = await request(app)
      .put(`/user/v2/updateUser?userId=${user._id}`)
      .send(update)
      .set("Authorization", `Bearer ${token}`);
  });
});
