const { createUser } = require("./user.factory");
const ResumeBuilder = require("../../models/resume.model");

const createResume = async (resumeData = {}) => {
  const user = await createUser();

  const cv = new ResumeBuilder({
    userId: user._id,
    ...resumeData,
  });

  await cv.save();

  return cv;
};

module.exports = { createResume };
