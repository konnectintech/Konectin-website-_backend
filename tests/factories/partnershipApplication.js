const B2BApplication = require("../../models/B2B.model");
const createPartnershipApplication = async (partnershipData = {}) => {
  const partnershipApplication = await B2BApplication.create({
    ...partnershipData,
  });

  // await partnershipApplication.save();

  return partnershipApplication;
};

module.exports = { createPartnershipApplication };
