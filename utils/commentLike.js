const CommentLike = require("../models/likeComment.model")
const {Comment} = require("../models/comment.model")
exports.likeComment = async (commentId,userId)=>{
    const comment = await Comment.findById({ _id: commentId });
    const like = new CommentLike({
        userId: userId,
        commentId: commentId,
      });
      await like.save();
      const commentLikes = await CommentLike.find({ commentId: commentId }).count();
      comment.likes = commentLikes;
      await comment.save();
      return true
}

exports.unlikeComment = async(commentId,userId)=>{
    const comment = await Comment.findById({_id:commentId});
    const likeExists = await CommentLike.findOne({ userId, commentId: commentId });
    if(likeExists){
        await CommentLike.findOneAndDelete({ userId, commentId: commentId });
        const commentLikes = await CommentLike.find({ commentId: commentId }).count();
        comment.likes = commentLikes;
        await comment.save();
        return true
    }
}