const Joi = require("joi")

const resumeSchema = Joi.object({
    basicInfo: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        profileSummary: Joi.string(),
        phoneNumber: Joi.string().required(),
        country: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        zipCode: Joi.string(),
        profession: Joi.string().required(),
    }),
    jobExperience: Joi.array().items(Joi.object({
        jobTitle: Joi.string().required(),
        company: Joi.string().required(),
        country: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        startMonth: Joi.string().required(),
        startYear: Joi.string().required(),
        endMonth: Joi.string(),
        endYear: Joi.string(),
        workDesc: Joi.string(),
    })),
    education: Joi.array().items(Joi.object({
        schoolName: Joi.string().required(),
        degree: Joi.string().required(),
        country: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        graduated: Joi.boolean(),
        graduationMonth: Joi.string(),
        graduationYear: Joi.string(),
    })),
    skills: Joi.array().items(Joi.string())
})

module.exports = {resumeSchema}