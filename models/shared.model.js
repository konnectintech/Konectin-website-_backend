const { CountryNamesEnum } = require("../utils/enums/CountryEnum");
const InternshipTypeEnum = require("../utils/enums/InternshipTypeEnum");
const PreferedFieldEnum = require("../utils/enums/PreferdFieldEnum");

const sharedSchemaDefinition = {
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
      /^[0-12][0-9]{7,}$/,
      "Must start with a digit from 0 to 12, followed by 7 or more digits",
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
};

module.exports = sharedSchemaDefinition;