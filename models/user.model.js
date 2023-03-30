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
        type: String,
        required: true
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
        enum: ["Regular", "Google"],
        default: "Regular"
    }
}, {timestamps: true})

module.exports = mongoose.model('users', userSchema)