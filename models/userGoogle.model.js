const mongoose = require("mongoose")
const userGoogle = new mongoose.Schema({
    googleId: {
        type: String,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    }
})

module.exports = mongoose.model("GoogleUser", userGoogle)