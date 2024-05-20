const B2BApplication = require("../../models/B2B.model");
const createPartnershipApplication = async (partnershipData = {}) => {
  const partnershipApplication = new B2BApplication({
    ...partnershipData,
  });

  await partnershipApplication.save();

  return partnershipApplication;
};

module.exports = { createPartnershipApplication };
