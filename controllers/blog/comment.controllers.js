const User = require("../../models/user.model");
const Blog = require("../../models/blog.model");
const { Comment } = require("../../models/comment.model");
// const CommentLike = require("../../models/likeComment.model")

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

exports.getComment = async (req, res) => {
    try {
        const commentId = req.query.commentId;
        const comment = await Comment.findById(commentId).populate("likes", "_id fullname email typeOfUser").populate({
            path: "reply",
            select:"comment",
            populate: {
                path: "userId",
                select: "_id fullname email typeOfUser",
            },
        });
        if(!comment){
            return res.status(404).json({message:"Comment not found"})
        }
        return res
            .status(200)
            .json({ message: "Comment fetched successfully", comment: comment });
    } catch (err) {
        console.error(err)
        return res
            .status(500)
            .json({ message: "Server error, try again later!" });
    }
};

exports.updateComment = async (req, res) => {
    try {
        const commentId = req.query.commentId;
        const { comment } = req.body;
        const comments = await Comment.findByIdAndUpdate(commentId, { comment },{new:true}).populate("likes", "_id fullname email typeOfUser");
        return res
            .status(200)
            .json({ message: "Comment fetched successfully", comments: comments });
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

exports.updateCommentshare = async (req, res) => {
    const { commentId } = req.query
    let comment;
    try {
        comment  = await Comment.findById(commentId)
        if (!comment ) {
            return res.status(404).json({message:"Comment not found"})
        } else {
            comment  = await Comment.findByIdAndUpdate(commentId, { $inc: { numOfShares: 1 } }, { new: true })
        }
        return res.status(200).json({ message: "Number of shares updated", data: comment  })

    } catch (error) {
        console.error(error.message)
        return res
            .status(500)
            .json({ message: "Server error, try again later" });
    }
}
// endpoint to delete a comment
exports.deleteComments = async (req, res) => {
    try {
        const userId = req.query.userId;
        const commentId = req.query.commentId;

        const user = await User.findById({ _id: userId });
        const comment = await Comment.findById({ _id: commentId });

        if (!user) {
            return res.status(400).json({ message: "User not found!" });
        }
        if (!comment) {
            return res.status(400).json({ message: "Comment not found!" });
        }

        // check if the comment is a replied comment
        if(!comment.blogId){
            const parentComment = await Comment.findOne({"$reply._id":commentId})
            const index = parentComment.reply.indexOf(commentId)
            parentComment.reply.splice(index,1)
            await parentComment.save()
        }
        // delete the comment
        await Comment.findByIdAndDelete(commentId);
        return res.status(200).json({message:"Comment deleted"})
    } catch (err) {
        console.error(err)
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
            comment: newComment,
        });
    } catch (err) {
        console.log(err.message);
        return res
            .status(500)
            .json({ message: "Server error, try again later!" });
    }
};

exports.replyComment = async (req, res) => {
    const commentId = req.query.commentId;
    const userId = req.query.userId
    const { comment: text } = req.body
    try {
        const comment = await Comment.findById(commentId)
        if (!comment) {
            return res.status(404).json({ message: "Not Found" });
        }
        const reply = await Comment.create({ userId: userId, comment: text })
        comment.reply.push(reply)
        comment.save()
        return res.status(200).json({ message: "Comment replied successfully", data: reply })
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({ message: "Internal Server Error" })
    }

}
