const mongoose = require('mongoose')

const resumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
    },
    basicInfo: {
        firstName: {
            type: String,
            required: false
        },
        lastName: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: false
        },
        profileSummary: {
            type: String,
            required: false
        },
        phoneNumber: {
            type: String,
            required: false
        },
        country: {
            type: String,
            required: false
        },
        city: {
            type: String,
            required: false
        },
        state: {
            type: String,
            required: false
        },
        zipCode: {
            type: String,
            required: false
        },
        profession: {
            type: String,
            required: false,
        }
    },
    jobExperience: [{
        jobTitle: {
            type: String,
            required: false
        },
        company: {
            type: String,
            required: false
        },
        country: {
            type: String,
            required: false
        },
        city: {
            type: String,
            required: false
        },
        state: {
            type: String,
            required: false
        },
        startMonth: {
            type: String,
            required: false
        },
        startYear: {
            type: String,
            required: false
        },
        endMonth: {
            type: String,
            required: false
        },
        endYear: {
            type: String,
            required: false
        },
        workDesc: {
            type: String,
            required: false
        },
    }],
    education: [{
        schoolName: { type: String, required: false },
        degree: { type: String, required: false },
        country: { type: String, required: false },
        city: { type: String, required: false },
        state: { type: String, required: false },
        graduated: { type: Boolean, required: false },
        graduationMonth: { type: String, required: false },
        graduationYear: { type: String, required: false },
    }],
    skills: [{ type: String, required: false }],
    isCompleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("ResumeBuilder", resumeSchema)