const request = require("supertest");
const { app } = require("../../server");
const { StatusCodes } = require("http-status-codes");
const {
  createPartnershipApplication,
} = require("../factories/partnershipApplication");
const InternshipTypeEnum = require("../../utils/enums/InternshipTypeEnum");
const CompanySizeEnum = require("../../utils/enums/companySizeEnum");
const HiringFrequencyEnum = require("../../utils/enums/HiringFrequencyEnum");
const LanguagesEnum = require("../../utils/enums/languagesEnum");
const InternsEnum = require("../../utils/enums/internsEnum");

describe("B2B Routes", () => {
  describe("Partnership Application", () => {
    it("should return a conflict error if a user already sends an application", async () => {
      const data = {
        fullName: "Jehanne MUSA",
        email: "konectin@gmail.com",
        country: "Rwanda",
        countryCode: "+250",
        internshipType: InternshipTypeEnum.PAID,
        requiredRole: "Backend",
        companyName: "KonectIn",
        supportEmail: "support@gmail.com",
        companySize: CompanySizeEnum["1-10"],
        hiringFrequency: HiringFrequencyEnum.ALWAYS_HIRING,
        languages: LanguagesEnum.FRENCH,
        internsNeeded: InternsEnum["10-20"],
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
        fullName: "Jehanne MUSA",
        email: "konectin@gmail.com",
        country: "Rwanda",
        countryCode: "+250",
        internshipType: InternshipTypeEnum.PAID,
        requiredRole: "Backend",
        companyName: "KonectIn",
        supportEmail: "support@gmail.com",
        companySize: CompanySizeEnum["1-10"],
        hiringFrequency: HiringFrequencyEnum.ALWAYS_HIRING,
        languages: LanguagesEnum.FRENCH,
        internsNeeded: InternsEnum["10-20"],
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
        fullName: "Jehanne MUSA",
        email: "konectin@gmail.com",
        country: "Rwanda",
        countryCode: "+250",
        internshipType: InternshipTypeEnum.PAID,
        requiredRole: "Backend",
        companyName: "KonectIn",
        supportEmail: "support@gmail.com",
        companySize: CompanySizeEnum["1-10"],
        hiringFrequency: HiringFrequencyEnum.ALWAYS_HIRING,
        languages: LanguagesEnum.FRENCH,
        internsNeeded: InternsEnum["10-20"],
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
