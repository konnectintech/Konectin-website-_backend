const request = require("supertest");
const { app } = require("../../server");
const { createUser } = require("../factories/user.factory");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const existingUserId = "5f4cc8f7e5a7de2a393a2a8b";
const { createLetter } = require("../factories/letter.factory");
const LetterBuilder = require("../../models/letter.model");

const jwtSign = (payload) => {
  return jwt.sign(payload, "K12345", { expiresIn: "24h" });
};

const letterContent =
  "I am thrilled to apply for the Senior Full Stack Software Engineer position at your esteemed company. With a solid background in software development spanning over four years, I bring a unique blend of experience, creativity, and a strong passion for innovation to your team.";

describe("Letter Routes", () => {
  describe("USER CREATES A LETTER", () => {
    it("should return 201 and the new user's letter created", async () => {
      const user = await createUser();
      const letterData = {
        details: {
          fullName: user.fullname,
          email: user.email,
          jobPosition: "Software Engineer",
          companyName: "Example Inc.",
        },
        description: {
          jobDescription: "Description of the job",
          companyInfo: "Information about the company",
        },
        content: letterContent,
        professionalBio: "Professional biography",
      };

      const response = await request(app)
        .post("/user/letter")
        .query({ userId: user._id.toString() })
        .set("content-type", "application/json")
        .send(letterData);
      expect(response.status).toEqual(StatusCodes.CREATED);
      expect(response.body.message).toEqual("Letter created successfully");
      expect(response.body.data.userId.toString()).toEqual(user._id.toString());
      expect(response.body.data.content).toEqual(letterData.content);
      expect(response.body.data.professionalBio).toEqual(
        letterData.professionalBio
      );
    });

    it("should create a letter  if the user id does not exist", async () => {
      const letterData = {
        details: {
          fullName: "Mary",
          email: "mary@gmail.com",
          jobPosition: "Software Engineer",
          companyName: "Example Inc.",
        },
        description: {
          jobDescription: "Description of the job",
          companyInfo: "Information about the company",
        },
        content: letterContent,
        professionalBio: "Professional biography",
      };

      const response = await request(app)
        .post("/user/letter")
        .set("content-type", "application/json")
        .send(letterData);

      expect(response.status).toEqual(StatusCodes.CREATED);
      expect(response.body.message).toEqual("Letter created successfully");
      expect(response.body.data.userId).toEqual(null);
      expect(response.body.data.content).toEqual(letterData.content);
      expect(response.body.data.professionalBio).toEqual(
        letterData.professionalBio
      );
    });
  });

  describe("GET ONE LETTER", () => {
    it("should get a user  letter by id", async () => {
      const letter = await createLetter({
        details: {
          fullName: "Mary",
          email: "mary@gmail.com",
          jobPosition: "Software Engineer",
          companyName: "Example Inc.",
        },
        description: {
          jobDescription: "Description of the job",
          companyInfo: "Information about the company",
        },
        content: letterContent,
        professionalBio: "Professional biography",
      });

      const response = await request(app)
        .get("/user/getLetter")
        .query({ letterId: letter._id.toString() });

      expect(response.status).toEqual(StatusCodes.OK);
      expect(response.body.message).toEqual("Letter retrieved successfully");
      expect(response.body.letter._id.toString()).toEqual(
        letter._id.toString()
      );
    });
    it("should return an error if the letter is not found", async () => {
      const response = await request(app)
        .get("/user/getLetter")
        .query({ letterId: existingUserId });

      expect(response.status).toEqual(StatusCodes.NOT_FOUND);
      expect(response.body.message).toEqual("Letter with Id does not exist");
    });
  });

  describe("USER LETTERS", () => {
    it("should return a list of user's letters", async () => {
      const user = await createUser();
      const token = jwtSign({ _id: user._id });
      const letter1 = await createLetter({
        userId: user._id,
        details: {
          fullName: user.fullname,
          email: user.email,
          jobPosition: "Software Engineer",
          companyName: "Example Inc.",
        },
        description: {
          jobDescription: "Description of the job",
          companyInfo: "Information about the company",
        },
        content: letterContent,
        professionalBio: "Professional biography",
      });
      const letter2 = await createLetter({
        userId: user._id,
        details: {
          fullName: user.fullname,
          email: user.email,
          jobPosition: "Software Engineer",
          companyName: "Example Inc.",
        },
        description: {
          jobDescription: "Description of the job",
          companyInfo: "Information about the company",
        },
        content: letterContent,
        professionalBio: "Professional biography",
      });

      //pageNumber=1, pageSize1
      const response = await request(app)
        .get("/user/getLetters")
        .query({ userId: user._id.toString() })
        .query({ page: 1 })
        .query({ pageSize: 1 })
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(StatusCodes.OK);
      expect(response.body.message).toEqual("Letters retrieved successfully");
      expect(response.body.letters.length).toEqual(1);
      expect(response.body.letters[0].userId.toString()).toEqual(
        letter1.userId.toString()
      );

      //pageNumber=2, pageSize1
      const response1 = await request(app)
        .get("/user/getLetters")
        .query({ userId: user._id.toString() })
        .query({ page: 2 })
        .query({ pageSize: 1 })
        .set("Authorization", `Bearer ${token}`);

      expect(response1.status).toEqual(StatusCodes.OK);
      expect(response1.body.message).toEqual("Letters retrieved successfully");
      expect(response1.body.letters.length).toEqual(1);
      expect(response1.body.letters[0].userId.toString()).toEqual(
        letter2.userId.toString()
      );
    });

    it("should return an error if the token is not correct", async () => {
      const user = await createUser();
      const token = jwtSign({ _id: user._id });
      const response = await request(app)
        .get("/user/getLetters")
        .query({ userId: existingUserId })
        .query({ page: 1 })
        .query({ pageSize: 1 })
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(StatusCodes.UNAUTHORIZED);
      expect(response.body.message).toEqual("Invalid access token");
    });
  });

  describe("DELETE A LETTER", () => {
    it("should delete a letter if authenticated", async () => {
      const user = await createUser();

      const token = jwtSign({ _id: user._id });

      const letter = await createLetter({
        userId: user._id,
        details: {
          fullName: user.fullname,
          email: user.email,
          jobPosition: "Software Engineer",
          companyName: "Example Inc.",
        },
        description: {
          jobDescription: "Description of the job",
          companyInfo: "Information about the company",
        },
        content: letterContent,
        professionalBio: "Professional biography",
      });
      const response = await request(app)
        .delete("/user/deleteLetter")
        .query({ letterId: letter._id.toString() })
        .query({ userId: user._id.toString() })
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toEqual(StatusCodes.OK);
      expect(response.body.message).toEqual(
        "Letter has been deleted successfully"
      );
      // Check if the resume is not found in the database
      await expect(LetterBuilder.findById(letter._id)).resolves.toBeNull();
    });

    it("should return an error if the letter is not found", async () => {
      const user = await createUser();
      const token = jwtSign({ _id: user._id });
      const response = await request(app)
        .delete("/user/deleteLetter")
        .query({ letterId: existingUserId })
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(StatusCodes.NOT_FOUND);
      expect(response.body.message).toEqual("Letter not found");
    });

    it("should return an error if a user is not authenticated", async () => {
      const user = await createUser();
      const user1 = await createUser();
      const token = jwtSign({ _id: user1._id });

      const letter = await createLetter({
        userId: user._id,
        details: {
          fullName: user.fullname,
          email: user.email,
          jobPosition: "Software Engineer",
          companyName: "Example Inc.",
        },
        description: {
          jobDescription: "Description of the job",
          companyInfo: "Information about the company",
        },
        content: letterContent,
        professionalBio: "Professional biography",
      });

      const response = await request(app)
        .delete("/user/deleteLetter")
        .query({ letterId: letter._id.toString() })
        .query({ userId: user._id.toString() })
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(StatusCodes.UNAUTHORIZED);
      expect(response.body.message).toEqual("Invalid access token");
    });
  });

  describe("UPDATE LETTER", () => {
    it("should return an error if a letter is not found", async () => {
      const user = await createUser();
      const token = jwtSign({ _id: user._id });

      await createLetter({
        userId: user._id,
        details: {
          fullName: user.fullname,
          email: user.email,
          jobPosition: "Software Engineer",
          companyName: "Example Inc.",
        },
        description: {
          jobDescription: "Description of the job",
          companyInfo: "Information about the company",
        },
        content: letterContent,
        professionalBio: "Professional biography",
      });

      const updateLetterDto = {
        content: "https://examptest.com/job",
      };

      const response = await request(app)
        .put("/user/updateLetter")
        .query({ letterId: existingUserId })
        .query({ userId: user._id.toString() })
        .send(updateLetterDto)
        .set("Authorization", `Bearer ${token}`);

      expect(response.body.message).toEqual("Letter not found");
    });
    it("should update the letter if the user is authenticated", async () => {
      const user = await createUser();
      const token = jwtSign({ _id: user._id });

      const letter = await createLetter({
        userId: user._id,
        details: {
          fullName: user.fullname,
          email: user.email,
          jobPosition: "Software Engineer",
          companyName: "Example Inc.",
        },
        description: {
          jobDescription: "Description of the job",
          companyInfo: "Information about the company",
        },
        content: letterContent,
        professionalBio: "Professional biography",
      });

      const updateLetterDto = {
        content: "https://examptest.com/job",
      };

      const response = await request(app)
        .put("/user/updateLetter")
        .query({ letterId: letter._id.toString() })
        .query({ userId: user._id.toString() })
        .send(updateLetterDto)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(StatusCodes.OK);
      expect(response.body.message).toEqual("Letter Updated successfully");

      expect(response.body.letter.userId.toString()).toEqual(
        user._id.toString()
      );
      expect(response.body.letter.content).toEqual(updateLetterDto.content);
    });
  });
  describe("NUMBER OF LETTERS DOWNLOADED", () => {
    it("should return a list of letters downloaded", async () => {
      const user = await createUser();
      const letter1 = await createLetter({
        details: {
          email: user.email,
          fullName: user.fullname,
        },
        userId: user._id,
        isDownloaded: true,
      });

      const letter2 = await createLetter({
        details: {
          email: user.email,
          fullName: user.fullname,
        },
        userId: user._id,
        isDownloaded: true,
      });
      await createLetter({
        details: {
          email: user.email,
          fullName: user.fullname,
        },
        userId: user._id,
      });

      const response = await request(app)
        .get("/user/downloadedLetters")
        .query({ userId: user._id.toString() });

      expect(response.status).toEqual(StatusCodes.OK);
      expect(response.body[0].isDownloaded).toEqual(letter1.isDownloaded);
      expect(response.body[1].isDownloaded).toEqual(letter2.isDownloaded);
      expect(response.body.length).toEqual(2);
    });
  });
});
