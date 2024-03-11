const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String
    },
    picture: {
        type: String
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    typeOfUser: {
        type: String,
        enum: ["Regular", "Google","Microsoft"],
        default: "Regular"
    },
    notifications: {
        resumeStatusUpdates: {
            type: Boolean,
            default: true
        },
        jobAlerts: {
            type: Boolean,
            default: true
        },
        internshipAlerts: {
            type: Boolean,
            default: true
        },
        blogUpdates: {
            type: Boolean,
            default: true
        },
        reminders: {
            type: Boolean,
            default: true
        }
    }
}, {timestamps: true})

module.exports = mongoose.model('users', userSchema)