const mongoose = require("mongoose");
const GenderEnum = require("../utils/enums/GenderEnum");
const AgeRangeEnum = require("../utils/enums/AgeRangeEnum");
const CurrentEducationEnum = require("../utils/enums/CurrentEducationEnum");
const sharedSchemaDefinition = require("./shared.model");
const PreferedFieldEnum = require("../utils/enums/PreferdFieldEnum");

const internshipSchema = new mongoose.Schema(
  {
    ...sharedSchemaDefinition,
    preferedField: {
      type: String,
      enum: Object.values(PreferedFieldEnum),
      required: true,
    },

    gender: {
      type: String,
      enum: Object.values(GenderEnum),
    },
    ageRange: {
      type: String,
      enum: Object.values(AgeRangeEnum),
      required: true,
    },
    portfolio: {
      type: String,
      required: true,
      match: [/(ftp|http|https):\/\/[^ "]+/, "Invalid URL format"],
    },
    resumes: [
      {
        type: String,
        required: true,
      },
    ],

    currentEducation: {
      type: String,
      enum: Object.values(CurrentEducationEnum),
    },
    institution: {
      type: String,
    },
    fieldOfStudy: {
      type: String,
    },
    resumeDate: {
      type: Date,
    },
    graduationDate: {
      type: Date,
    },
    completionDate: {
      type: Date,
    },
    moreDetails: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("InternshipApplication", internshipSchema);
