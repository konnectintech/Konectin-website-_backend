const request = require("supertest");
const { app } = require("../../server");
const { StatusCodes } = require("http-status-codes");
const {
  createPartnershipApplication,
} = require("../factories/partnershipApplication");
const InternshipTypeEnum = require("../../utils/enums/InternshipTypeEnum");
const PreferdFieldEnum = require("../../utils/enums/PreferdFieldEnum");
const CompanySizeEnum = require("../../utils/enums/companySizeEnum");
const HiringFrequencyEnum = require("../../utils/enums/HiringFrequencyEnum");

describe("B2B Routes", () => {
  describe("Partnership Application", () => {
    it("should return a conflict error if a user already sends an application", async () => {
      const data = {
        fullName: "test",
        email: "test@gmail.com",
        phoneNumber: "0978665432",
        country: "RWANDA",
        requiredRole: "Frontend",
        companyName: "partnet@name",
        companyWebsite: "https://www.linkedin.com/in/test/",
        supportEmail: "test1@email.com",
        companySize: CompanySizeEnum["100+"],
        companyAddress: "Kigali",
        logo: "image.png",
        companyDescription: "testhjbddhjf",
        hiringFrequency: HiringFrequencyEnum.ALWAYS_HIRING,
        internshipType: InternshipTypeEnum.Both,
        preferedField: PreferdFieldEnum.FINANCE,
        mouContent: "rhjdh jfb bhc",
        mouConfirmed: true,
      };
      const existingPartnership = await createPartnershipApplication(data);

      const partnerData = {
        fullName: existingPartnership.fullName,
        email: existingPartnership.email,
        mouConfirmed: existingPartnership.mouConfirmed,
      };

      const response = await request(app)
        .post("/user/partner")
        .set("content-type", "application/json")
        .send(partnerData);
      expect(response.status).toEqual(StatusCodes.CONFLICT);
      expect(response.body.message).toEqual("You've already registered");
    });
    it("should return a bad request error if mouConfirmed is not equal to true", async () => {
      const data = {
        fullName: "test",
        email: "test@gmail.com",
        phoneNumber: "0977865432",
        country: "RWANDA",
        requiredRole: "Frontend",
        companyName: "partnet@name",
        companyWebsite: "https://www.linkedin.com/in/test/",
        supportEmail: "test1@email.com",
        companySize: CompanySizeEnum["100+"],
        companyAddress: "Kigali",
        logo: "image.png",
        companyDescription: "testhjbddhjf",
        hiringFrequency: HiringFrequencyEnum.ALWAYS_HIRING,
        internshipType: InternshipTypeEnum.Both,
        preferedField: PreferdFieldEnum.FINANCE,
        mouContent: "rhjdh jfb bhc",
        mouConfirmed: false,
      };

      const response = await request(app)
        .post("/user/partner")
        .set("content-type", "application/json")
        .send(data);
      expect(response.status).toEqual(StatusCodes.BAD_REQUEST);
      expect(response.body.message).toEqual(
        "You have to confirm that you have read and acknowledged the Memorandum of Understanding (MOU)"
      );
    });

    it("should return a success message if the registration is successful", async () => {
      const data = {
        fullName: "test",
        email: "test@gmail.com",
        phoneNumber: "097865432",
        country: "RWANDA",
        requiredRole: "Frontend",
        companyName: "partnet@name",
        companyWebsite: "https://www.linkedin.com/in/test/",
        supportEmail: "test1@email.com",
        companySize: CompanySizeEnum["100+"],
        companyAddress: "Kigali",
        companyDescription: "testhjbddhjf",
        logo: "image.png",
        hiringFrequency: HiringFrequencyEnum.ALWAYS_HIRING,
        internshipType: InternshipTypeEnum.Both,
        preferedField: PreferdFieldEnum.FINANCE,
        mouContent: "rhjdh jfb bhc",
        mouConfirmed: true,
      };

      const response = await request(app)
        .post("/user/partner")
        .set("content-type", "application/json")
        .send(data);
      expect(response.status).toEqual(StatusCodes.CREATED);
      expect(response.body.message).toEqual(
        "Your request has been submitted successfully"
      );
      expect(response.body.data.email).toEqual(data.email);
    });
  });
});
