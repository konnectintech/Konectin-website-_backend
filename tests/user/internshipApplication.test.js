const request = require("supertest");
const { app } = require("../../server");
const { StatusCodes } = require("http-status-codes");
const {
  createInternshipApplication,
} = require("../factories/intershipApplication");
const AgeRangeEnum = require("../../utils/enums/AgeRangeEnum");
const InternshipTypeEnum = require("../../utils/enums/InternshipTypeEnum");
const PreferdFieldEnum = require("../../utils/enums/PreferdFieldEnum");

describe("Internship Routes", () => {
  describe("internship Application", () => {
    it("should return a conflict error if a user already sends an application", async () => {
      // Create the internship application in the database
      const existingInternship = await createInternshipApplication({
        fullName: "test",
        email: "test@gmail.com",
        countryCode: "+250",
        phoneNumber: "097865432",
        country: "RWANDA",
        ageRange: AgeRangeEnum["25-34"],
        internshipType: InternshipTypeEnum.Both,
        preferedField: PreferdFieldEnum.FINANCE,
        portfolio: "https://www.linkedin.com/in/test/",
      });

      const internshipData = {
        fullName: existingInternship.fullName,
        email: existingInternship.email,
        countryCode: existingInternship.countryCode,
        country: existingInternship.country,
        phoneNumber: existingInternship.phoneNumber,
        internshipType: existingInternship.internshipType,
        preferedField: existingInternship.preferedField,
      };

      const response = await request(app)
        .post("/user/internshipApplication")
        .set("content-type", "application/json")
        .send(internshipData);

      expect(response.status).toEqual(StatusCodes.CONFLICT);
      expect(response.body.message).toEqual(
        "You've already registered for Konectin's Internship Program."
      );
    });

    it("should return a success message and data", async () => {
      // Create the internship application in the database
      const internshipData = {
        fullName: "test",
        email: "test@gmail.com",
        countryCode: "+250",
        phoneNumber: "097865432",
        country: "RWANDA",
        ageRange: AgeRangeEnum["25-34"],
        internshipType: InternshipTypeEnum.Both,
        preferedField: PreferdFieldEnum.FINANCE,
        portfolio: "https://www.linkedin.com/in/test/",
      };

      const response = await request(app)
        .post("/user/internshipApplication")
        .set("content-type", "application/json")
        .send(internshipData);

      expect(response.status).toEqual(StatusCodes.CREATED);
      expect(response.body.message).toEqual(
        "Thank you for applying for Konectin's Internship Program."
      );
      expect(response.body.data.email).toEqual(internshipData.email);
      expect(response.body.data.fullName).toEqual(internshipData.fullName);
      expect(response.body.data.portfolio).toEqual(internshipData.portfolio);
    });
  });
});
