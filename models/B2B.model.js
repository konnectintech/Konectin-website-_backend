const mongoose = require("mongoose");
const sharedSchemaDefinition = require("./shared.model");
const CompanySizeEnum = require("../utils/enums/companySizeEnum");
const HiringFrequencyEnum = require("../utils/enums/HiringFrequencyEnum");

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
      required: true,
      match: [/(ftp|http|https):\/\/[^ "]+/, "Invalid URL format"],
    },
    supportEmail: {
      type: String,
      required: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"],
    },
    companyAddress: {
      type: String,
      required: true,
    },
    companySize: {
      type: String,
      enum: Object.values(CompanySizeEnum),
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    companyDescription: {
      type: String,
      required: true,
    },
    hiringFrequency: {
      type: String,
      enum: Object.values(HiringFrequencyEnum),
      required: true,
    },
    mouContent: {
      type: String,
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
