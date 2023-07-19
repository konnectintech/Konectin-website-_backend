const Joi = require("joi")

const resumeSchema = Joi.object({
    basicInfo: Joi.object({
        firstName: Joi.string(),
        lastName: Joi.string(),
        email: Joi.string().email(),
        profileSummary: Joi.string(),
        phoneNumber: Joi.string(),
        country: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        zipCode: Joi.string(),
        profession: Joi.string(),
    }),
    jobExperience: Joi.array().items(Joi.object({
        jobTitle: Joi.string(),
        company: Joi.string(),
        country: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        startMonth: Joi.string(),
        startYear: Joi.string(),
        endMonth: Joi.string(),
        endYear: Joi.string(),
        workDesc: Joi.string(),
    })),
    education: Joi.array().items(Joi.object({
        schoolName: Joi.string(),
        degree: Joi.string(),
        country: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        graduated: Joi.boolean(),
        graduationMonth: Joi.string(),
        graduationYear: Joi.string(),
    })),
    skills: Joi.array().items(Joi.string())
})
const resumeUpdateSchema = Joi.object({
    basicInfo: Joi.object({
        firstName: Joi.string(),
        lastName: Joi.string(),
        email: Joi.string().email(),
        profileSummary: Joi.string(),
        phoneNumber: Joi.string(),
        country: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        zipCode: Joi.string(),
        profession: Joi.string(),
    }),
    jobExperience: Joi.array().items(Joi.object({
        jobTitle: Joi.string(),
        company: Joi.string(),
        country: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        startMonth: Joi.string(),
        startYear: Joi.string(),
        endMonth: Joi.string(),
        endYear: Joi.string(),
        workDesc: Joi.string(),
    })),
    education: Joi.array().items(Joi.object({
        schoolName: Joi.string(),
        degree: Joi.string(),
        country: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        graduated: Joi.boolean(),
        graduationMonth: Joi.string(),
        graduationYear: Joi.string(),
    })),
    skills: Joi.array().items(Joi.string())
})

module.exports = {resumeSchema, resumeUpdateSchema}