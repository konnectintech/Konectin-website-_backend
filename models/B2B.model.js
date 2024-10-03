const mongoose = require("mongoose");
const sharedSchemaDefinition = require("./shared.model");
const CompanySizeEnum = require("../utils/enums/companySizeEnum");
const HiringFrequencyEnum = require("../utils/enums/HiringFrequencyEnum");
const LanguagesEnum = require("../utils/enums/languagesEnum");
const InternsEnum = require("../utils/enums/internsEnum");

const b2bSchema = new mongoose.Schema(
  {
    ...sharedSchemaDefinition,
    requiredRole: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    companyWebsite: {
      type: String,
      match: [/(ftp|http|https):\/\/[^ "]+/, "Invalid URL format"],
    },
    supportEmail: {
      type: String,
      required: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"],
    },
    companyAddress: {
      type: String,
    },
    companySize: {
      type: String,
      enum: Object.values(CompanySizeEnum),
      required: true,
    },

    hiringFrequency: {
      type: String,
      enum: Object.values(HiringFrequencyEnum),
      required: true,
    },
    languages: {
      type: String,
      enum: Object.values(LanguagesEnum),
    },
    internsNeeded: {
      type: String,
      enum: Object.values(InternsEnum),
      required: true,
    },
    mouConfirmed: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("B2BApplication", b2bSchema);
