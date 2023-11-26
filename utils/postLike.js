// import BlogLike from "../models/likeBlog.model";
const Blog = require("../models/blog.model");
exports.likeBlog =  async function (blogId, userId) {
    const blog = await Blog.findById({ _id: blogId });
    if (!blog.likes) {
        blog.likes = []
        blog.likes.push(userId)
        await blog.save()
    } else {
        blog.likes.push(userId)
        await blog.save()
    }
    // const like = new BlogLike({
    //     userId: userId,
    //     blogId: blogId,
    //   });
    //   await like.save();
    //   const blogLikes = await BlogLike.find({ blogId: blogId }).count();
    //   blog.likes = blogLikes;
    //   await blog.save();

    return true
}

exports.unlikeBlog =  async function (blogId, userId) {
    const blog = await Blog.findById({ _id: blogId });
    // const likeExists = await BlogLike.findOne({ userId, blogId: blogId });
    const likeExists = blog.likes.includes(userId)
    if (likeExists) {
        // await BlogLike.findOneAndDelete({ userId, blogId: blogId });
        // const blogLikes = await BlogLike.find({ blogId: blogId }).count();
        // blog.likes = blogLikes;
        // await blog.save();

        blog.likes.splice(blog.likes.indexOf(userId), 1)
        await blog.save()
        return true
    }
}