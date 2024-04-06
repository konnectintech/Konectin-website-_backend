const mongoose = require("mongoose");
const UserRoleEnum = require("../utils/userRoleEnum");

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
    },
    phoneNumber: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    },
    city: {
        type: String, 
        default: ''
    },
    college: {
        type: String,
        default: ''
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    typeOfUser: {
        type: String,
        enum: Object.values(UserRoleEnum),
        default: UserRoleEnum.REGULAR,
    },
    notificationSettings: {
        emails: {
          type: Boolean,
          default: true,
        },
        pushNotifications: {
          type: Boolean,
          default: true,
        },
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
    },
    socials: {
        github: {
          type: String,
        },
        facebook: {
          type: String,
        },
        instagram: {
          type: String,
        },
        linkedin: {
          type: String,
        },
        medium: {
          type: String,
        },
      },
    },  
    { timestamps: true }
);

module.exports = mongoose.model("users", userSchema)