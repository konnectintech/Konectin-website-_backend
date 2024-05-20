const mongoose = require("mongoose");
const sharedModel = require("./shared.model");
const CompanySizeEnum = require("../utils/enums/companySizeEnum");
const HiringFrequencyEnum = require("../utils/enums/HiringFrequencyEnum");

const b2bSchema = new mongoose.Schema(
  {
    ...sharedModel,
    requiredRole: {
      type: String,
      required: true,
    },
    campanyName: {
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
    mou: {
      content: {
        type: String,
        required: true,
      },
      confirmed: {
        type: Boolean,
        required: true,
      },
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("B2BApplication", b2bSchema);
