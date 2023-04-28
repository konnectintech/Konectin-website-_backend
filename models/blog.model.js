const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
        },
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        category: [{
            type: String,
        }],
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
        numOfReads: {
            type: Number
        },
        readingTime: {
            type: String
        },
        image: {
            type: String,
        },
        userIP:[{
            type: String
        }]
    },
    { timestamps: true }
);

// blogSchema.pre('save', function(next) {
//     const wordsPerMinute = 200; // Average reading speed of an adult
//     const words = this.post.body.split(' ').length;
//     const minutes = Math.ceil(words / wordsPerMinute);
//     this.readTime = `${minutes} min read`;
//     next();
//   });

module.exports = mongoose.model("Blog", blogSchema);