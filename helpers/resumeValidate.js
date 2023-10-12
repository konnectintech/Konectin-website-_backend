const Joi = require("joi")

const resumeSchema = Joi.object({
    basicInfo: Joi.object({
        firstName: Joi.string(),
        lastName: Joi.string(),
        email: Joi.string().email().optional(),
        profileSummary: Joi.string().optional(),
        phoneNumber: Joi.string().optional(),
        country: Joi.string().optional(),
        city: Joi.string().optional(),
        state: Joi.string().optional(),
        zipCode: Joi.string().optional(),
        profession: Joi.string().optional(),
    }),
    jobExperience: Joi.array().items(Joi.object({
        jobTitle: Joi.string().optional(),
        company: Joi.string().optional(),
        country: Joi.string().optional(),
        city: Joi.string().optional(),
        state: Joi.string().optional(),
        startMonth: Joi.string().optional(),
        startYear: Joi.string().optional(),
        endMonth: Joi.string().optional(),
        endYear: Joi.string().optional(),
        workDesc: Joi.string().optional(),
    })),
    education: Joi.array().items(Joi.object({
        schoolName: Joi.string().optional(),
        degree: Joi.string().optional(),
        country: Joi.string().optional(),
        city: Joi.string().optional(),
        state: Joi.string().optional(),
        graduated: Joi.boolean().optional(),
        graduationMonth: Joi.string().optional(),
        graduationYear: Joi.string().optional(),
    })),
    skills: Joi.array().items(Joi.string()).optional()
})
const resumeUpdateSchema = Joi.object({
    basicInfo: Joi.object({
        firstName: Joi.string().optional(),
        lastName: Joi.string().optional(),
        email: Joi.string().email().optional(),
        profileSummary: Joi.string().optional(),
        phoneNumber: Joi.string().optional(),
        country: Joi.string().optional(),
        city: Joi.string().optional(),
        state: Joi.string().optional(),
        zipCode: Joi.string().optional(),
        profession: Joi.string().optional(),
    }),
    jobExperience: Joi.array().items(Joi.object({
        jobTitle: Joi.string().optional(),
        company: Joi.string().optional(),
        country: Joi.string().optional(),
        city: Joi.string().optional(),
        state: Joi.string().optional(),
        startMonth: Joi.string().optional(),
        startYear: Joi.string().optional(),
        endMonth: Joi.string().optional(),
        endYear: Joi.string().optional(),
        workDesc: Joi.string().optional(),
    })),
    education: Joi.array().items(Joi.object({
        schoolName: Joi.string().optional(),
        degree: Joi.string().optional(),
        country: Joi.string().optional(),
        city: Joi.string().optional(),
        state: Joi.string().optional(),
        graduated: Joi.boolean().optional(),
        graduationMonth: Joi.string().optional(),
        graduationYear: Joi.string().optional(),
    })),
    skills: Joi.array().items(Joi.string()).optional()
})

module.exports = {resumeSchema, resumeUpdateSchema}