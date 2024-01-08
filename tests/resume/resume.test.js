const request = require("supertest");
const { app } = require("../../server");
const { createUser } = require("../factories/user.factory");
const { createResume } = require("../factories/resume.factory");
const ResumeBuilder = require("../../models/resume.model");
const { faker } = require("@faker-js/faker");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const existingUserId = "5f4cc8f7e5a7de2a393a2a8b";

const jwtSign = (payload) => {
  return jwt.sign(payload, "K12345", { expiresIn: "24h" });
};

describe("Resume Routes", () => {
  describe("USER CREATES A RESUME", () => {
    it("should return 201 and the new user's resume created", async () => {
      const user = await createUser();

      const resumeData = {
        userId: user._id,
        basicInfo: {
          firstName: user.fullname,
          lastName: user.fullname,
          email: user.email,
          profileSummary: "blogger",
          phoneNumber: "07834516789",
          country: "RWANDA",
          city: "KIGALI",
          state: "GASABO",
          zipCode: "250",
          profession: "blogger",
          phoneCode: "+250",
        },
        jobExperience: [
          {
            jobTitle: "blogger",
            company: "TECHGEM",
            country: "RWANDA",
            city: "KIGALI",
            state: "GASABO",
            startMonth: "January",
            startYear: "2019",
            endMonth: "May",
            endYear: "2022",
            workDesc: "ghl;lkhjyutryuugh",
          },
        ],
        education: [
          {
            schoolName: "UNR",
            degree: "AO",
            country: "RWANDA",
            city: "KIGALI",
            state: "GASABO",
            graduated: true,
            graduationMonth: "August",
            graduationYear: "2013",
          },
        ],
        skills: ["blogging", "content writing"],
        currentStage: 1,
      };

      const response = await request(app)
        .post("/user/resume")
        .set("content-type", "application/json")
        .send(resumeData);

      expect(response.status).toEqual(StatusCodes.CREATED);
      expect(response.body.message).toEqual("Resume created successfully");
      expect(response.body.cv.userId.toString()).toEqual(
        resumeData.userId.toString()
      );
      expect(response.body.cv.skills).toEqual(resumeData.skills);
      expect(response.body.cv.education[0].schoolName).toEqual(
        resumeData.education[0].schoolName
      );
      expect(response.body.cv.jobExperience[0].jobTitle).toEqual(
        resumeData.jobExperience[0].jobTitle
      );
      expect(response.body.cv.basicInfo).toEqual(resumeData.basicInfo);
    });

    it("should return an error if the user id does not exist", async () => {
      const resumeData = {
        userId: existingUserId,
        basicInfo: {
          firstName: faker.person.firstName,
          lastName: faker.person.lastName,
          email: faker.internet.email(),
          profileSummary: "blogger",
          phoneNumber: "07834516789",
          country: "RWANDA",
          city: "KIGALI",
          state: "GASABO",
          zipCode: "250",
          profession: "blogger",
          phoneCode: "+250",
        },
        jobExperience: [
          {
            jobTitle: "blogger",
            company: "TECHGEM",
            country: "RWANDA",
            city: "KIGALI",
            state: "GASABO",
            startMonth: "January",
            startYear: "2019",
            endMonth: "May",
            endYear: "2022",
            workDesc: "ghl;lkhjyutryuugh",
          },
        ],
        education: [
          {
            schoolName: "UNR",
            degree: "AO",
            country: "RWANDA",
            city: "KIGALI",
            state: "GASABO",
            graduated: true,
            graduationMonth: "August",
            graduationYear: "2013",
          },
        ],
        skills: ["blogging", "content writing"],
        currentStage: 1,
      };

      const response = await request(app)
        .post("/user/resume")
        .set("content-type", "application/json")
        .send(resumeData);

      expect(response.status).toEqual(StatusCodes.NOT_FOUND);
      expect(response.body.message).toEqual(
        "User does not exist, please register"
      );
    });
  });

  describe("USER RESUMES", () => {
    it("should return a list of user's resumes", async () => {
      const user = await createUser();

      const resume1 = await createResume({ userId: user._id });
      const resume2 = await createResume({ userId: user._id });
      const cvs = [resume1, resume2];

      const response = await request(app).get(`/user/getResumes/${user._id}`);

      expect(response.status).toEqual(StatusCodes.OK);
      expect(response.body.message).toEqual("Resumes retrieved successfully");
      expect(response.body.cvs.length).toEqual(cvs.length);
      expect(response.body.cvs[0].userId.toString()).toEqual(
        cvs[0].userId.toString()
      );
      expect(response.body.cvs[1].userId.toString()).toEqual(
        cvs[1].userId.toString()
      );
      expect(response.body.cvs.map((el) => el._id.toString())).toEqual(
        cvs.map((el) => el._id.toString())
      );
    });

    it("should return an error if the user does not exist", async () => {
      const response = await request(app).get(
        `/user/getResumes/${existingUserId}`
      );

      expect(response.status).toEqual(StatusCodes.NOT_FOUND);
      expect(response.body.message).toEqual(
        "User does not exist, please register"
      );
    });
  });

  describe("GET ONE RESUME", () => {
    it("should get a use  resume by id", async () => {
      const user = await createUser();
      const resume = await createResume({ userId: user._id });

      const response = await request(app).get(`/user/getResume/${resume._id}`);
      expect(response.status).toEqual(StatusCodes.OK);
      expect(response.body.message).toEqual("Resume retrieved successfully");
      expect(response.body.cv._id.toString()).toEqual(resume._id.toString());
      expect(response.body.cv.userId.toString()).toEqual(
        resume.userId.toString()
      );
    });
    it("should return an error if the resume is not found", async () => {
      const response = await request(app).get(
        `/user/getResume/${existingUserId}`
      );

      expect(response.status).toEqual(StatusCodes.NOT_FOUND);
      expect(response.body.message).toEqual("Resume with Id does not exist");
    });
  });

  describe("DELETE A RESUME", () => {
    it("should delete a resume if authenticated", async () => {
      const user = await createUser();
      const token = jwtSign({ _id: user._id });
      const resume = await createResume({ userId: user._id });

      const response = await request(app)
        .delete(`/user/resume/${resume._id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toEqual(StatusCodes.OK);
      expect(response.body.message).toEqual(
        "Resume has been deleted successfully"
      );
      // Check if the resume is not found in the database
      await expect(ResumeBuilder.findById(resume._id)).resolves.toBeNull();
    });

    it("should return an error if the resume is not found", async () => {
      const user = await createUser();
      const token = jwtSign({ _id: user._id });
      const response = await request(app)
        .delete(`/user/resume/${existingUserId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(StatusCodes.NOT_FOUND);
      expect(response.body.message).toEqual("CV not found");
    });

    it("should return an error if a user is not authenticated", async () => {
      const user = await createUser();
      const user1 = await createUser();
      const token = jwtSign({ _id: user._id });

      const resume = await createResume({ userId: user1._id });

      const response = await request(app)
        .delete(`/user/resume/${resume._id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(StatusCodes.UNAUTHORIZED);
      expect(response.body.message).toEqual("Unauthorized");
    });
  });

  describe("UPDATE RESUME", () => {
    it("should update the resume if the user is authenticated", async () => {
      const user = await createUser();
      const token = jwtSign({ _id: user._id });

      const resume = await createResume({ userId: user._id });

      const updateResumeDto = {
        jobExperience: [
          {
            jobTitle: "Backend Engineer",
            company: "KonectIn",
            country: "Angola",
          },
        ],
      };

      const response = await request(app)
        .put(`/user/updateResume/${resume._id}`)
        .send(updateResumeDto)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(StatusCodes.OK);
      expect(response.body.message).toEqual("Resume Updated successfully");
      expect(response.body.cv.userId.toString()).toEqual(user._id.toString());
      expect(response.body.cv.jobExperience[0].jobTitle).toEqual(
        updateResumeDto.jobExperience[0].jobTitle
      );
      expect(response.body.cv.jobExperience[0].jobTitle).toEqual(
        updateResumeDto.jobExperience[0].jobTitle
      );
      expect(response.body.cv.jobExperience[0].company).toEqual(
        updateResumeDto.jobExperience[0].company
      );
      expect(response.body.cv.jobExperience[0].country).toEqual(
        updateResumeDto.jobExperience[0].country
      );
    });
  });
});
