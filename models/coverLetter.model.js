const mongoose = require("mongoose");

const coverLetterSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "users",
            required: true,
        },
        letter: {
            type: String,
        },
        downloadUrl: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("coverLetter", coverLetterSchema);
