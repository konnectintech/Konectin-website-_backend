const mongoose = require("mongoose");

const letterSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
  },
  letterUrl: {
    type: String,
  },
  details: {
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
  description: {
    jobDescription: {
      type: String,
    },
    companyInfo: {
      type: String,
    },
  },
  content: { type: String },
  professionalBio: { type: String },
  chats: [],
});

module.exports = mongoose.model("LetterBuilder", letterSchema);
