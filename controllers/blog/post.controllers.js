const User = require("../../models/user.model");
const Blog = require("../../models/blog.model");
const { Comment } = require("../../models/comment.model");
const BlogLike = require("../../models/likeBlog.model");
const hubspotClient = require("../../config/hubspot");
const { unlikeBlog, likeBlog: like } = require("../../utils/postLike");

exports.createPost = async (req, res) => {
    try {
        const { blog } = req.body;
        const userId = req.query.userId;
        const user = await User.findById({ _id: userId });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const post = new Blog({
            userId: userId,
            post: blog,
        });
        await post.save();
        return res.status(201).json({ message: "Blog uploaded successfully" });
    } catch (err) {
        console.error(err)
        return res
            .status(500)
            .json({ message: "Server error, try again later!" });
    }
};

// endpoint to enable a user delete a blog post
exports.deletePost = async (req, res) => {
    try {
        const userId = req.query.userId;
        const blogId = req.query.blogId;
        const user = await User.findById({ _id: userId });
        const blog = await Blog.findById({ _id: blogId });

        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        if (!blog) {
            return res
                .status(400)
                .json({ message: "Blog post does not exists" });
        }
        await Blog.findByIdAndDelete({ _id: blogId });
        await Comment.deleteMany({ postId: blogId });
        await BlogLike.deleteMany({ postId: blogId });

        return res
            .status(200)
            .json({ message: "Blog post deleted succesfully" });
    } catch (err) {
        consol.error(err)
        return res
            .status(500)
            .json({ message: "Server error, try again later!" });
    }
};

//endpoint to get all blog post of a particular user
exports.getPosts = async (req, res) => {
    try {
        const blogs =
            await hubspotClient.cms.blogs.blogPosts.blogPostsApi.getPage();
        // const blogs = await Blog.find().exec();
        return res.status(200).json({ message: "All blog posts", blogs });
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ message: "Server error, try again later" });
    }
};

exports.getPost = async (req, res) => {
    try {
        const blogId = req.query.blogId;
        const blogPost = await hubspotClient.cms.blogs.blogPosts.blogPostsApi.getById(blogId);
        if(blogPost){
            //check if the blogPost Id stored in database, else create one
            const blog = await Blog.findById({ _id: blogId });
            if(!blog){
                await Blog.create({
                    _id:blogId
                })
            }
            return res
                .status(200)
                .json({ message: "Blog post fetched successfully", posts: blogPost });
        }
    } catch (err) {
        console.log(err.message);
        if (err.message.includes("404")) {
            return res.status(404).json({ message: "Blog post not found" })
        }
        return res
            .status(500)
            .json({ message: "Server error, try again later!" });
    }
};


exports.likePost = async (req, res) => {
    try {
        const { blogId, userId } = req.query;
        const user = await User.findById({ _id: userId });
        const blog = await Blog.findById({ _id: blogId });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        if (!blog) {
            return res.status(400).json({ message: "Blog post not found" });
        }

        const ifLikeExists = blog.likes.includes(userId);
        if (ifLikeExists) {
            const success = await unlikeBlog(blogId, user.id);
            return res
                .status(200)
                .json({ message: "Blog unliked successfully" });
        }
        const success = await like(blogId, user.id);
        if (success) {
            return res.status(200).json({ message: "Blog liked successfully" });
        }

    } catch (err) {
        console.error(err)
        return res
            .status(500)
            .json({ message: "Server error, try again later!" });
    }
};


exports.updateNumOfReads = async (req, res) => {
    let blog;
    const ipAddress = req.socket.remoteAddress
    try {
        const blogId = req.query.blogId;
        blog = await Blog.findById(blogId)
        if (!blog) {
            return res.status(404).json({message:"Blog not found"})
        } else {
            console.log(ipAddress)
            console.log(blog.userIP)
            if(blog.userIP.includes(ipAddress)){
                console.log("Already read")
                return res.status(200).json({ message: "Number of reads updated", data: blog })
            }else{
                blog = await Blog.findByIdAndUpdate(blogId, { $inc: { numOfReads: 1 } }, { new: true })
                blog.userIP.push(ipAddress)
                await blog.save()
            }
        }
        return res.status(200).json({ message: "Number of reads updated", data: blog })


        // const blog = await Blog.findById({ _id: blogId });

        // if (!blog) {
        //     return res.status(400).json({ message: "Blog post not found" });
        // }

        // const userHasRead = blog.userIP.includes(req.ip);
        // if (!userHasRead) {
        //     blog.userIP.push(req.ip); // add user's IP address to readBy array
        //     await blog.save();
        //     const updatedBlog = await blog.updateOne({ $inc: { numOfReads: 1 } });
        //     return res
        //         .status(200)
        //         .json({ message: "Number of reads updated", updatedBlog });
        // } else {
        //     return res
        //         .status(200)
        //         .json({ message: "Number of reads not updated" });
        // }
    } catch (err) {
        console.log(err.message);
        return res
            .status(500)
            .json({ message: "Server error, try again later" });
    }
};

exports.getBlogActions= async (req, res) => {
    let blog;
    try {
        const blogId = req.query.blogId;
        blog = await Blog.findById(blogId)
        if (!blog) {
            // blog = await Blog.create({ blogId, numOfReads: 1 })
            return res.status(404).json({message:"Blog post not found"})
        }
        return res.status(200).json({ message: "Blog actions", data: {views:blog.numOfReads,shares:blog.numOfShares,likes:blog.likes} })
    } catch (err) {
        console.log(err.message);
        return res
            .status(500)
            .json({ message: "Server error, try again later" });
    }
};

exports.updateNumOfShares = async (req, res) => {
    const { blogId } = req.query
    let blog;
    try {
        blog = await Blog.findById(blogId)
        if (!blog) {
            return res.status(404).json({message:"Blog not found"})
        } else {
            blog = await Blog.findByIdAndUpdate(blogId, { $inc: { numOfShares: 1 } }, { new: true })
        }
        return res.status(200).json({ message: "Number of shares updated", data: blog })

    } catch (error) {
        console.error(error.message)
        return res
            .status(500)
            .json({ message: "Server error, try again later" });
    }
}
