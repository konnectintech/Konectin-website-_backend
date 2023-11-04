const User = require("../../models/user.model");
const Blog = require("../../models/blog.model");
const { Comment } = require("../../models/comment.model");
const CommentLike = require("../../models/likeComment.model")

require("dotenv").config();

const { unlikeComment, likeComment: like } = require("../../utils/commentLike");



// endpoint to get all comments under a post
exports.getComments = async (req, res) => {
    try {
        const blogId = req.query.blogId;
        const comments = await Comment.find({ blogId: blogId }).sort({
            createdAt: -1,
        }).populate("likes", "_id fullname email typeOfUser");
        return res
            .status(200)
            .json({ message: "Comments fetched successfully", comments: comments });
    } catch (err) {
        console.error(err)
        return res
            .status(500)
            .json({ message: "Server error, try again later!" });
    }
};
// endpoint to like a comment

exports.likeComment = async (req, res) => {
    try {
        const { commentId, userId } = req.query;
        const user = await User.findById({ _id: userId });
        const comment = await Comment.findById({ _id: commentId });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        if (!comment) {
            return res.status(400).json({ message: "Comment not found" });
        }

        const likeExists = comment.likes.includes(userId)
        if (likeExists) {
            const success = await unlikeComment(commentId, user.id)
            if (success) {
                return res
                    .status(200)
                    .json({ message: "Comment unliked successfully" });
            }
        }
        const success = await like(commentId, user.id)
        if (success) {
            return res.status(200).json({ message: "Comment liked successfully" });
        }
    } catch (err) {
        console.error(err)
        return res
            .status(500)
            .json({ message: "Server error, try again later!" });
    }
}
// endpoint to delete a comment
exports.deleteComments = async (req, res) => {
    try {
        const userId = req.query.userId;
        const blogId = req.query.blogId;
        const commentId = req.query.commentId;

        const user = await User.findById({ _id: userId });
        const blog = await Blog.findById({ _id: blogId });
        const comment = await Comment.findById({ _id: commentId });

        if (!user) {
            return res.status(400).json({ message: "User not found!" });
        }
        if (!blog) {
            return res.status(400).json({ message: "Blog post not found!" });
        }
        if (!comment) {
            return res.status(400).json({ message: "Comment not found!" });
        }
        let notInComment = true;

        blog.comments.forEach((comment, index) => {
            if (comment.commentId == commentId) {
                notInComment = false;
                blog.comments.splice(index, 1);
                blog.save();
                return res.status(200).json({ message: "Comment deleted!" });
            }
        });
        if (notInComment) {
            return res.status(400).json({ message: "Comment not found!" });
        }
        await Comment.findByIdAndDelete(commentId);
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Server error, try again later!" });
    }
};

// endpoint to like a blog post
exports.commentPost = async (req, res) => {
    try {
        const { comment } = req.body;
        const userId = req.query.userId;
        const blogId = req.query.blogId;

        const user = await User.findById({ _id: userId });

        if (!user) {
            return res.status(400).json({ message: "User not found!" });
        }

        const newComment = new Comment({
            userId: userId,
            blogId: blogId,
            comment: comment,
        });
        await newComment.save();

        return res.status(200).json({
            message: "Comment posted successfully",
            comment: newComment.comment,
        });
    } catch (err) {
        console.log(err.message);
        return res
            .status(500)
            .json({ message: "Server error, try again later!" });
    }
};