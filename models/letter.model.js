const mongoose = require("mongoose");
const validator = require("validator");

const letterSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
  },
  letterUrl: {
    type: String,
  },
  basicInfo: {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return validator.isEmail(v);
        },
        message: (props) => `${props.value} is not a valid email address.`,
      },
    },
    jobPosition: {
      type: String,
    },
    companyName: {
      type: String,
    },
  },
  jobDescriptionAndCompanyBrief: {
    jobDescription: {
      type: String,
    },
    companyInfo: {
      type: String,
    },
  },
  content: { type: String },
  professionalBio: { type: String },
});

module.exports = mongoose.model("LetterBuilder", letterSchema);
