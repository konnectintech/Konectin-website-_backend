const Intern = require("../../models/internshipModel");
const createInternshipApplication = async (internshipData = {}) => {
  const internship = new Intern({
    ...internshipData,
  });

  await internship.save();

  return internship;
};

module.exports = { createInternshipApplication };
