const mongoose = require("mongoose");

const commentReplySchema = new mongoose.Schema(
    {
        commentId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true
        },
        userId:{
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
            type:String,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
        reply:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"comment_reply"
            }
        ]
    },
    { timestamps: true }
);

const Comment = mongoose.model("comment", commentSchema);
const CommentReply = mongoose.model("comment_reply",commentReplySchema);
module.exports = {Comment,CommentReply};