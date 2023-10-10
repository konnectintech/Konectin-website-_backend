const mongoose = require("mongoose")
const moment = require("moment-timezone")

const registerOTPSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: "true"
    },
    OTP: {
        type: String,
        required: true
    },
    expiresIn: {
        type: Date,
        default: moment().add(10, 'minutes'),
    },
}, {timestamps: true})

module.exports = mongoose.model("RegisterOTP", registerOTPSchema)