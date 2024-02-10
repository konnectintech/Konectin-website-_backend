const mongoose = require("mongoose");

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
      match: /^\S+@\S+\.\S+$/,
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
  jobLink: { type: String, match: /^(http|https):\/\/[^ "]+$/ },
  professionalBio: { type: String },
});

module.exports = mongoose.model("LetterBuilder", letterSchema);
