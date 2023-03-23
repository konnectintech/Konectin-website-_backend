const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        post: {
            type: String,
            required: true,
        },
        comments: [
            {
                commentId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "comment",
                },
                comment: {
                    type: String,
                },
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "users",
                },
            },
        ],
        likes: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("post", postSchema);