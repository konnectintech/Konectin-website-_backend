const mongoose = require("mongoose")
const moment = require("moment-timezone")

const passwordOTPSchema = new mongoose.Schema({
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
    },
}, { timestamps: true })

module.exports = mongoose.model("PasswordOTP", passwordOTPSchema)