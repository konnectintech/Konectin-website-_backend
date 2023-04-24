const Blog = require("../models/blog.model")
const Admin = require('../models/admin.model')
const {passwordHash,passwordCompare} = require("../helpers/bcrypt")
const Comment = require('../models/comment.model')
const Like = require("../models/like.model")
const User = require("../models/user.model")
const {cloudinaryUpload} = require("../helpers/cloudinary")
const cloudinary = require("cloudinary").v2


const register = async(request, response) => {
    try{
        const {email, password} = request.body
        if(!email && !password){
            return response.status(400).json({message: "Please fill all required fields"})
        }

        const hashedPassword = await passwordHash(password)
        const admin = new Admin({
            email: email,
            password: hashedPassword
        })
        await admin.save()
        return response.status(201).json({message: "Admin record created successfully", admin})
    }
    catch(err){
        
        return response.status(500).json({message: "Server error, try again later"})
    }
}

const login = async(request, response) => {
    try{
        const {email, password} = request.body
        if(!email && !password){
            return response.status(400).json({message: "Please fill all required fields"})
        }
        const admin = await Admin.findOne({email: email})
        if(!admin){
            return response.status(400).json({message: "Admin account does not exist, please create one"})
        }
        const passwordMatch = await passwordCompare(password, admin.password)
        if(!passwordMatch){
            return response.status(400).json({message: "Incorrect password"})
        }

        return response.status(200).json({message: "Admin logged in successfully", admin})
    }   
    catch(err){
        return response.status(500).json({message: "Server error, try again later"})
    }
}

const makeBlog = async(request, response) => {
    try{
        const adminId = request.query.adminId
        const admin = await Admin.findById({_id: adminId})
        if(!admin){
            return response.status(400).json({message: "Admin account does not exits, please register"})
        }
        
        const {title, body, category, image} = request.body
        
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
        //     await cloudinaryUpload(image.path)
        //         .then((downloadURL) => {
        //             blog.image = downloadURL
        //         })
        //         .catch((err) => {
        //             throw new Error(`CLOUDINARY ERROR => ${err.message}`)
        //         })
        // }
        await blog.save()
        return response.status(201).json({message: "Blog created successfully", blog})
    }
    catch(err){
        console.log(err.message);
        return response.status(500).json({message: "Server error, try again later"})
    }
}

const getAllBlogs = async(request, response) => {
    try {
        const blogs = await Blog.find().exec()
        return response.status(200).json({message: "All blogs fetched successfully", blogs})
    }
    catch(err){
        return response.status(500).json({message: "Server error, try again later"})
    }
}

const getBlogById = async(request, response) => {
    try{
        const blogId = request.query.blogId
        const blog = await Blog.findById({_id: blogId})
        if(!blog){
            return response.status(400).json({message: "Blog post not found"})
        }
        return response.status(200).json({message: "Blog post fetched successfully,", Blog: blog})
    }
    catch(err){
        return response.status(500).json({message: "Server error, try again later"})
    }
}

const deleteBlog = async(request, response) => {
    try{
        const blogId = request.query.blogId
        const blog = await Blog.findById({_id: blogId})
        if(!blog){
            return response.status(400).json({message: "Blog post not found"})
        }
        await Blog.findByIdAndDelete({_id: blogId})
        await Comment.deleteMany({postId: blogId})
        await Like.deleteMany({postId: blogId})

        return response.status(200).json({message: "Blog post deleted successfully."})
    }
    catch(err){
        return response.status(500).json({ message: " Server error, try again later"})
    }
}

module.exports = {
    register, login, makeBlog, getAllBlogs, deleteBlog, getBlogById
}