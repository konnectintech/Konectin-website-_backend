const mongoose = require("mongoose");

const commentReplySchema = new mongoose.Schema(
    {
        commentId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        comment: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
)

const commentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        blogId: {
            type: String,
            // this has to be removed to cater for comment replies
            // required: true,
        },
        comment: {
            type: String,
            required: true,
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users"
            }
        ],
        reply: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "comment"
            }
        ],
        numOfShares: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);

const Comment = mongoose.model("comment", commentSchema);
const CommentReply = mongoose.model("comment_reply", commentReplySchema);
module.exports = { Comment, CommentReply };