const User = require('../models/user.model')
const Blog = require('../models/blog.model')
const Comment = require('../models/comment.model')
const Like = require('../models/like.model')
const { passwordCompare, passwordHash} = require('../helpers/bcrypt')

// endpoint for allowing a user to sign up
const register = async(request, response) => {
    try{
        const {fullname, email, password } = request.body
        if(!fullname && !email & !password){
            return response.status(400).json({message: 'Please fill all required fields'})
        }
        const userExists = await User.findOne({email: email})
        if(userExists){
            return response.status(401).json({message: "User already exists"})
        }

        const hashedPassword = await passwordHash(password)
        const user = new User({
            fullname: fullname,
            email: email,
            password: hashedPassword
        })

        await user.save()
        return response.status(201).json({message: "User created successfully", user})
    }
    catch(err){
        return response.status(500).json({message: "Server error, try again later!"})
    }
}

// endpoint for allowing a user to login
const login = async(request, response) => {
    try{
        const {email, password} = request.body
        if(!email && !password){
            return response.status(400).json({message: "Please fill all required fields"})
        }
        const user = await User.findOne({email: email})
        if(!user){
            return response.status(400).json({ message: "User does not exist"})
        }
        const passwordMatch = await passwordCompare(password, user.password)
        if(!passwordMatch){
            return response.status(400).json({message: "Incorrect password"})
        }

        return response.status(200).json({message: "User logged in successfully!"})
    }
    catch(err){
        return response.status(500).json({message: "Server error, try again later!"})
    }
}

//endpoint for getting user
const getUser = async(request, response) => {
    try {
        const userId = request.query.userId
        const user = await User.findById({_id: userId})
        if(!user){
            return response.status(400).json({message: "No such user exists"})
        }
        return response.status(200).json({message: "User profile fetched successfully", user})
    }
    catch(err){
        return response.status(500).json({message: 'Server error, try again later!'})
    }
}

//endpoint to allow a user make a blog post
const makeBlog = async(request, response) => {
    try{
        const { blog } = request.body
        const userId = request.query.userId
        const user = await User.findById({_id: userId})
        if(!user){
            return response.status(400).json({message: "User not found"})
        }
        const post = new Blog({
            userId: userId,
            post: blog
        })
        await post.save()
        return response.status(201).json({message: "Blog uploaded successfully"})
    }
    catch(err){
        return response.status(500).json({message: 'Server error, try again later!'})
    }
}

// endpoint to enable a user delete a blog post
const deleteBlog = async(request, response) => {
    try{
        const userId = request.query.userId
        const blogId = request.query.blogId
        const user = await User.findById({_id: userId})
        const blog = await Blog.findById({_id: blogId})

        if(!user){
            return response.status(400).json({message: "User does not exist"})
        }
        if(!blog){
            return response.status(400).json({message: "Blog post does not exists"})
        }
        await Blog.findByIdAndDelete({_id: blogId})
        await Comment.deleteMany({postId: blogId})
        await Like.deleteMany({postId: blogId})

        return response.status(200).json({message: "Blog post deleted succesfully"})
    }
    catch(err){
        return response.status(500).json({message: "Server error, try again later!"})
    }
}

//endpoint to get all blog post of a particular user
const getPost = async (request, response) => {
    try{
        const userId = request.query.userId
        const user = await User.findById({_id: userId})
        if(!user){
            return response.status(400).json({message: "User does not exist"})
        }

        const blogPost =  await Blog.find({ userId: user._id });
        return response.status(200).json({message: 'Blog posts fetched successfully', posts: blogPost})
    }
    catch(err){
        console.log(err.message)
        return response.status(500).json({message: "Server error, try again later!"})
    }
}

module.exports = {
    register, login, getUser, makeBlog, deleteBlog, getPost
}