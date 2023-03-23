const mongoose = require("mongoose");

const likeSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "posts",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("likes", likeSchema);
