const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post",
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("comment", commentSchema);