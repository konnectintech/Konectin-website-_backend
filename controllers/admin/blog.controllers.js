const Blog = require("../../models/blog.model")
const Admin = require('../../models/admin.model')
const Comment = require('../../models/comment.model')
const Like = require("../../models/likeBlog.model")

exports.makeBlog = async (req, res) => {
    try {
        const adminId = req.query.adminId
        const admin = await Admin.findById({ _id: adminId })
        if (!admin) {
            return res.status(400).json({ message: "Admin account does not exits, please register" })
        }

        const { title, body, category, image } = req.body

        const wordsPerMinute = 100; // Average reading speed of an adult
        const words = body.split(" ").length;
        const minutes = Math.ceil(words / wordsPerMinute);
        const readTime = `${minutes} min read`;

        const blog = new Blog({
            userId: adminId,
            title: title,
            body: body,
            category: category,
            image: image,
            readingTime: readTime
        })
        // if (image) {
        //     await  Upload(image.path)
        //         .then((downloadURL) => {
        //             blog.image = downloadURL
        //         })
        //         .catch((err) => {
        //             throw new Error(`  ERROR => ${err.message}`)
        //         })
        // }
        await blog.save()
        return res.status(201).json({ message: "Blog created successfully", blog })
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: "Server error, try again later" })
    }
}

exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().exec()
        return res.status(200).json({ message: "All blogs fetched successfully", blogs })
    }
    catch (err) {
        return res.status(500).json({ message: "Server error, try again later" })
    }
}

exports.getBlogById = async (req, res) => {
    try {
        const blogId = req.query.blogId
        const blog = await Blog.findById({ _id: blogId })
        if (!blog) {
            return res.status(400).json({ message: "Blog post not found" })
        }
        return res.status(200).json({ message: "Blog post fetched successfully,", Blog: blog })
    }
    catch (err) {
        return res.status(500).json({ message: "Server error, try again later" })
    }
}

exports.deleteBlog = async (req, res) => {
    try {
        const blogId = req.query.blogId
        const blog = await Blog.findById({ _id: blogId })
        if (!blog) {
            return res.status(400).json({ message: "Blog post not found" })
        }
        await Blog.findByIdAndDelete({ _id: blogId })
        await Comment.deleteMany({ postId: blogId })
        await Like.deleteMany({ postId: blogId })

        return res.status(200).json({ message: "Blog post deleted successfully." })
    }
    catch (err) {
        return res.status(500).json({ message: " Server error, try again later" })
    }
}