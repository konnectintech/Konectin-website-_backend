const { timeStamp } = require("console");
const mongoose = require("mongoose");

const profileImageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    link: {
        type: String
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("ProfileImage", profileImageSchema);
