const Joi = require("joi");
const mongoose = require("mongoose");

// Define a custom Joi validation for mongoose.Types.ObjectId
const objectId = Joi.extend((joi) => ({
  type: "objectId",
  base: joi.string(),
  messages: {
    "objectId.hex": "{{#label}} must be a valid hexadecimal string",
  },
  validate(value, helpers) {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return { value, errors: helpers.error("objectId.hex") };
    }
  },
}));

const resumeSchema = Joi.object({
  cloudinaryUrl: Joi.string().email().optional().empty(""),
  userId: objectId.objectId().optional(),
  basicInfo: Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email().optional().empty(""),
    profileSummary: Joi.string().optional().empty(""),
    phoneNumber: Joi.string().optional().empty(""),
    country: Joi.string().optional().empty(""),
    city: Joi.string().optional().empty(""),
    state: Joi.string().optional().empty(""),
    zipCode: Joi.string().optional().empty(""),
    profession: Joi.string().optional().empty(""),
    phoneCode: Joi.string().optional().empty(""),
  }),
  jobExperience: Joi.array().items(
    Joi.object({
      jobTitle: Joi.string().optional().empty(""),
      company: Joi.string().optional().empty(""),
      country: Joi.string().optional().empty(""),
      city: Joi.string().optional().empty(""),
      state: Joi.string().optional().empty(""),
      startMonth: Joi.string().optional().empty(""),
      startYear: Joi.string().optional().empty(""),
      endMonth: Joi.string().optional().empty(""),
      endYear: Joi.string().optional().empty(""),
      workDesc: Joi.string().optional().empty(""),
    })
  ),
  education: Joi.array().items(
    Joi.object({
      schoolName: Joi.string().optional().empty(""),
      degree: Joi.string().optional().empty(""),
      country: Joi.string().optional().empty(""),
      city: Joi.string().optional().empty(""),
      state: Joi.string().optional().empty(""),
      graduated: Joi.boolean().optional().empty(""),
      graduationMonth: Joi.string().optional().empty(""),
      graduationYear: Joi.string().optional().empty(""),
    })
  ),
  skills: Joi.array().items(Joi.string()).optional().empty(""),
  currentEditedJob: Joi.number().optional(),
  currentEditedEducation: Joi.number().optional(),
  bio: Joi.string().optional().empty(""),
  selectedTemplate: Joi.string().optional().empty(""),
  currentStage: Joi.number(),
});
// const resumeUpdateSchema = Joi.object({
//     basicInfo: Joi.object({
//         firstName: Joi.string().optional().empty(""),
//         lastName: Joi.string().optional().empty(""),
//         email: Joi.string().email().optional().empty(""),
//         profileSummary: Joi.string().optional().empty(""),
//         phoneNumber: Joi.string().optional().empty(""),
//         country: Joi.string().optional().empty(""),
//         city: Joi.string().optional().empty(""),
//         state: Joi.string().optional().empty(""),
//         zipCode: Joi.string().optional().empty(""),
//         profession: Joi.string().optional().empty(""),
//     }),
//     jobExperience: Joi.array().items(Joi.object({
//         jobTitle: Joi.string().optional().empty(""),
//         company: Joi.string().optional().empty(""),
//         country: Joi.string().optional().empty(""),
//         city: Joi.string().optional().empty(""),
//         state: Joi.string().optional().empty(""),
//         startMonth: Joi.string().optional().empty(""),
//         startYear: Joi.string().optional().empty(""),
//         endMonth: Joi.string().optional().empty(""),
//         endYear: Joi.string().optional().empty(""),
//         workDesc: Joi.string().optional().empty(""),
//     })),
//     education: Joi.array().items(Joi.object({
//         schoolName: Joi.string().optional().empty(""),
//         degree: Joi.string().optional().empty(""),
//         country: Joi.string().optional().empty(""),
//         city: Joi.string().optional().empty(""),
//         state: Joi.string().optional().empty(""),
//         graduated: Joi.boolean().optional().empty(""),
//         graduationMonth: Joi.string().optional().empty(""),
//         graduationYear: Joi.string().optional().empty(""),
//     })),
//     skills: Joi.array().items(Joi.string()).optional().empty("")
// })
const resumeUpdateSchema = resumeSchema;
module.exports = { resumeSchema, resumeUpdateSchema };
