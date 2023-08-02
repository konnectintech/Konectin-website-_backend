const { string } = require("joi");
const mongoose = require("mongoose");

const likeSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required:true
        },
        blogId: {
            type:String,
            required:true
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("likes", likeSchema);
