const mongoose = require("mongoose");
const validator = require("validator");

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
  },
  resumeUrl: {
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
      validate: {
        validator: function (v) {
          return validator.isEmail(v);
        },
        message: (props) => `${props.value} is not a valid email address.`,
      },
    },
    phoneNumber: {
      type: String,
      validate: {
        validator: function (v) {
          return /^\+?\d{1,3}?\d{9,14}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number.`,
      },
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
      current: Boolean,
    },
  ],
  education: [
    {
      city: String,
      country: String,
      degree: String,
      startMonth: String,
      startYear: Number,
      schoolName: String,
      state: String,
      endMonth: String,
      endYear: String,
      awards: [{ name: String }],
      relevantCourses: [{ name: String }],
      current: Boolean,
    },
  ],
  skills: [
    {
      name: String,
      lvl: String,
    },
  ],
  currentEditedJob: { type: Number },
  currentEditedEducation: { type: Number },
  bio: { type: String },
  selectedTemplate: { type: String },
  currentStage: {
    type: Number,
  },
});

module.exports = mongoose.model("ResumeBuilder", resumeSchema);
