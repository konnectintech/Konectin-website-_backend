const mongoose = require("mongoose");
const {
  CountryCodesEnum,
  CountryNamesEnum,
} = require("../utils/enums/CountryEnum");
const GenderEnum = require("../utils/enums/GenderEnum");
const AgeRangeEnum = require("../utils/enums/AgeRangeEnum");
const CurrentEducationEnum = require("../utils/enums/CurrentEducationEnum");
const InternshipTypeEnum = require("../utils/enums/InternshipTypeEnum");
const PreferedFieldEnum = require("../utils/enums/PreferdFieldEnum");

const internshipSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"],
      unique: true,
    },
    country: {
      type: String,
      enum: Object.values(CountryNamesEnum),
      required: true,
    },
    countryCode: {
      type: String,
      enum: Object.values(CountryCodesEnum),
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      match: [
        /^[1-9][0-9]{7,}$/,
        "Must start with a digit from 1 to 9, followed by 7 or more digits",
      ],
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

    internshipType: {
      type: String,
      enum: Object.values(InternshipTypeEnum),
      required: true,
    },
    preferedField: {
      type: String,
      enum: Object.values(PreferedFieldEnum),
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("InternshipApplication", internshipSchema);
