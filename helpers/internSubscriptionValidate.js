const Joi = require("joi")

const internSubSchema = Joi.object({
    basicDetails: Joi.object({
        fullName: Joi.string(),
        email: Joi.string().email().optional(),
        country_code: Joi.string().optional(),
        phone_number: Joi.string().optional(),
        country: Joi.string().optional(),
        gender: Joi.string().optional(),
        ageRange: Joi.string().optional(),
    }),
    upload:Joi.object({
        portfolio:Joi.string().optional(),
        resumes: Joi.array().items(Joi.string()).optional(),
    }),
    education: Joi.object({
        name: Joi.string().optional(),
        options: Joi.object().optional(),
    }),
    internType: Joi.object({
        type: Joi.string(),
        field: Joi.string(),
    }),
})

module.exports = { internSubSchema }