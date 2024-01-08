const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
  },
  cloudinaryUrl: {
    type: String,
  },
  basicInfo: {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    profileSummary: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    profession: {
      type: String,
    },
    phoneCode: {
      type: String,
    },
  },
  jobExperience: [
    {
      jobTitle: {
        type: String,
      },
      company: {
        type: String,
      },
      country: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      startMonth: {
        type: String,
      },
      startYear: {
        type: String,
      },
      endMonth: {
        type: String,
      },
      endYear: {
        type: String,
      },
      workDesc: {
        type: String,
      },
    },
  ],
  education: [
    {
      schoolName: { type: String },
      degree: { type: String },
      country: { type: String },
      city: { type: String },
      state: { type: String },
      graduated: { type: Boolean },
      graduationMonth: { type: String },
      graduationYear: { type: String },
    },
  ],
  skills: [{ type: String }],
  currentStage: {
    type: Number,
  },
});

module.exports = mongoose.model("ResumeBuilder", resumeSchema);
