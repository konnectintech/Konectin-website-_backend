const InternshipApplication = require("../../models/internship.model");
const createInternshipApplication = async (internshipData = {}) => {
  const internshipApplication = new InternshipApplication({
    ...internshipData,
  });

  await internshipApplication.save();

  return internshipApplication;
};

module.exports = { createInternshipApplication };
