const mongoose = require("mongoose")

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
        default: Date.now() + 600000,
    },
}, {timestamps: true})

module.exports = mongoose.model("PasswordOTP", passwordOTPSchema)