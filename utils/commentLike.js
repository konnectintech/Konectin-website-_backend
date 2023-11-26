// const CommentLike = require("../models/likeComment.model")
const { Comment } = require("../models/comment.model")
exports.likeComment = async (commentId, userId) => {
    const comment = await Comment.findById({ _id: commentId });
    if (!comment.likes) {
        comment.likes = []
        comment.likes.push(userId)
        await comment.save()
    } else {
        comment.likes.push(userId)
        await comment.save()
    }
    // const like = new CommentLike({
    //     userId: userId,
    //     commentId: commentId,
    //   });
    //   await like.save();
    //   const commentLikes = await CommentLike.find({ commentId: commentId }).count();
    //   comment.likes = commentLikes;
    //   await comment.save();

    return true
}

exports.unlikeComment = async (commentId, userId) => {
    const comment = await Comment.findById({ _id: commentId });
    // const likeExists = await CommentLike.findOne({ userId, commentId: commentId });
    const likeExists = comment.likes.includes(userId)
    console.log(likeExists)
    if (likeExists) {
        // await CommentLike.findOneAndDelete({ userId, commentId: commentId });
        // const commentLikes = await CommentLike.find({ commentId: commentId }).count();
        // comment.likes = commentLikes;
        // await comment.save();

        comment.likes.splice(comment.likes.indexOf(userId), 1)
        await comment.save()
        return true
    }
}