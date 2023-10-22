const { string } = require("joi");
const mongoose = require("mongoose");

const likeBlogSchema = mongoose.Schema(
    {
        blogId: {
            type:String,
            required:true
        },
        likes:{
            users: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "users",
                required:true
            }],
            count:{
                type:Number,
                default:0
            }
        }

    },
    { timestamps: true }
);
likeBlogSchema.pre('save',function(next){
    this.likes.count = this.likes.users.length;
    next();
})

module.exports = mongoose.model("blogLikes", likeBlogSchema);
