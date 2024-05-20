const mongoose = require("mongoose");
const { CountryNamesEnum } = require("../utils/enums/CountryEnum");
const InternshipTypeEnum = require("../utils/enums/InternshipTypeEnum");
const PreferedFieldEnum = require("../utils/enums/PreferdFieldEnum");

const sharedModel = new mongoose.Schema(
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
    phoneNumber: {
      type: String,
      required: true,
      match: [
        /^[1-9][0-9]{7,}$/,
        "Must start with a digit from 1 to 9, followed by 7 or more digits",
      ],
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

module.exports = sharedModel;
