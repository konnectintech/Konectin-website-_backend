const User = require('../models/user.model');
const Blog = require('../models/blog.model');
const Comment = require('../models/comment.model');
const Like = require('../models/like.model');
const { passwordCompare, passwordHash } = require('../helpers/bcrypt');
const { transporter } = require('../config/email');
const { generateRegisterOTP } = require('../helpers/registerToken');
const { generatePasswordOTP } = require('../helpers/passwordToken');
const registerOTP = require('../models/registerOTP');
const { jwtSign } = require('../helpers/jsonwebtoken');
const passwordOTP = require('../models/passwordOTP');
const resume = require('../models/resume.model');
const intern = require('../models/internshipModel');
const newsletter = require('../models/newsletter');
const pdf = require('html-pdf');
require('dotenv').config();
const {
  resumeSchema,
  resumeUpdateSchema,
} = require('../helpers/resumeValidate');
const { ResetPasswordEmail } = require('../utils/resetPasswordEmail');

// endpoint for allowing a user to sign up
const register = async (request, response) => {
  try {
    const { fullname, email, password, profilePhoto } = request.body;
    if (!fullname && !email & !password) {
      return response
        .status(400)
        .json({ message: 'Please fill all required fields' });
    }
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return response.status(401).json({ message: 'User already exists' });
    }

    const hashedPassword = await passwordHash(password);
    const user = new User({
      fullname: fullname,
      email: email,
      password: hashedPassword,
      picture: profilePhoto,
    });
    const token = await generateRegisterOTP(user._id);
    const subject = 'Konectin Technical - Email Verification';
    const msg = `Use this code to verify your Konectin account. It expires in 10 minutes.
			<h1 class="code block text-5xl text-center font-bold tracking-wide my-10">${token}</h1>
			<p class="text-xs my-1 text-center">If you did not request this email, kindly ignore it or reach out to support if you think your account is at risk.</p>
		`;
    await transporter(email, subject, msg);
    await user.save();

    return response
      .status(201)
      .json({ message: 'User created successfully', user });
  } catch (err) {
    console.log(err.message);
    return response
      .status(500)
      .json({ message: 'Server error, try again later!' });
  }
};

const verifyEmailAddress = async (request, response) => {
  try {
    const { OTP } = request.body;
    const userId = request.query.userId;
    console.log(OTP);
    const token = await registerOTP.findOne({ userId: userId, OTP: OTP });
    if (!token) {
      return response.status(400).json({ message: 'User does not exists' });
    }
    const user = await User.findOne({ userId: userId });
    if (!user) {
      return response.status(400).json({ message: 'User does not exists' });
    }

    if (token.expiresIn < new Date().getTime) {
      return new response.status(400).json({
        message: 'Token has expired, please request a new one',
      });
    }

    await User.findByIdAndUpdate(
      { _id: userId },
      { $set: { isEmailVerified: true } },
      { new: true }
    ).exec();
    await user.save();

    return response
      .status(200)
      .json({ message: 'Email verified successfully' });
  } catch (err) {
    console.log(err.message);
    return response
      .status(500)
      .json({ message: 'Some error occured, try again later!' });
  }
};

// endpoint for requesting a new OTP code to verify email address
const requestEmailToken = async (request, response) => {
  try {
    const { email } = request.body;
    const userId = request.query.userId;
    const user = await User.findOne({ email: email });
    if (!user) {
      return response
        .status(400)
        .json({ message: 'Please sign up before requesting a new token' });
    }
    const token = await generateRegisterOTP(user._id);
    const subject = 'Konectin Technical - OTP Code Request';
    const msg = `Use this code to verify your Konectin account. It expires in 10 minutes.
			<h1 class="code block text-5xl text-center font-bold tracking-wide my-10">${token}</h1>
			<p class="text-xs my-1 text-center">If you did not request this email, kindly ignore it or reach out to support if you think your account is at risk.</p>
		`;
    await transporter(email, subject, msg);
    return response
      .status(200)
      .json({ message: 'Check your email for the verification code' });
  } catch (err) {
    return response
      .status(500)
      .json({ message: 'Some error occured, try again later!' });
  }
};

// endpoint for allowing a user to login
const login = async (request, response) => {
  try {
    const { email, password } = request.body;
    if (!email && !password) {
      return response
        .status(400)
        .json({ message: 'Please fill all required fields' });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return response.status(400).json({ message: 'User does not exist' });
    }
    const passwordMatch = await passwordCompare(password, user.password);
    if (!passwordMatch) {
      return response.status(400).json({ message: 'Incorrect password' });
    }

    const payload = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
    };
    const token = jwtSign(payload);

    return response.status(200).json({
      message: 'User logged in successfully!',
      token: token,
      data: payload,
    });
  } catch (err) {
    return response
      .status(500)
      .json({ message: 'Server error, try again later!' });
  }
};

// endpoint for signing in with google
const googleSignin = async (req, res) => {
  const { displayName, email } = req.body;

  const password = 'googlesignup';

  const user = User.findOne({ email }).exec();
  const token = jwtSign(payload);

  if (!user) {
    await new user({
      email: email,
      fullname: displayName,
      password: password,
      typeOfUser: 'Google',
    }).save();

    const payload = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
    };

    return response.status(200).json({
      message: 'User logged in successfully!',
      data: user,
      token: token,
    });
  } else {
    return response.status(200).json({
      message: 'User logged in successfully!',
      data: user,
      token: token,
    });
  }
};

//endpoint for forget password
const forgetPassword = async (request, response) => {
  try {
    const { email } = request.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return response.status(400).json({ message: 'Please sign-up first' });
    }
    const token = await generatePasswordOTP(user._id);
    const subject = 'Konectin Technical - Reset password';
    const msg = ResetPasswordEmail(token);
    await transporter(email, subject, msg);
    return response.status(200).json({
      message: 'Please check email for the code to reset your password',
    });
  } catch (err) {
    return response
      .status(500)
      .json({ message: 'Some error occured, try again later' });
    console.log(err);
  }
};

// Endpoint to verify OTP
const verifyOtp = async (request, response) => {
  try {
    const { OTP } = request.body;

    if (!OTP) {
      return response.status(400).json({ message: 'Please provide OTP' });
    }

    // Check if the OTP exists and is valid
    const token = await passwordOTP.findOne({ OTP: OTP });

    if (!token) {
      return response.status(400).json({ message: 'Invalid OTP' });
    }

    if (token.expiresIn < Date.now()) {
      return response
        .status(400)
        .json({ message: 'The OTP has expired, please request a new one' });
    }
    // OTP is valid
    return response.status(200).json({ message: 'OTP verified successfully' });
  } catch (err) {
    console.error(err);
    return response
      .status(500)
      .json({ message: 'Some error occurred, try again later' });
  }
};

//endpoint to reset password
const resetPassword = async (request, response) => {
  try {
    const { OTP, password, confirmPassword, email } = request.body;
    if (!password || !confirmPassword || !OTP || !email) {
      return response.status(400).json({ message: 'Please fill all fields' });
    }

    if (password !== confirmPassword) {
      return response.status(400).json({ message: 'Passwords do not match' });
    }

    const token = await passwordOTP.findOne({ OTP: OTP });

    if (!token) {
      return response.status(400).json({ message: 'Invalid or expired token' });
    }

    if (token.expiresIn < Date.now()) {
      return response
        .status(400)
        .json({ message: 'The token has expired, please request a new one' });
    }

    // Fetch the user's email from the database
    const user = await User.findById(token.userId).select('email').exec();

    if (!user || user.email !== email) {
      return response.status(400).json({ message: 'Invalid email address' });
    }

    const hashedPassword = await passwordHash(password);

    await User.findByIdAndUpdate(
      { _id: token.userId },
      { $set: { password: hashedPassword } },
      { new: true }
    ).exec();
    return response
      .status(200)
      .json({ message: 'Password updated successfully, please login' });
  } catch (err) {
    console.log(err.message);
    return response
      .status(500)
      .json({ message: 'Some error occured, try again later' });
  }
};

//endpoint for getting user
const getUser = async (request, response) => {
  try {
    const userId = request.query.userId;
    const user = await User.findById({ _id: userId });
    if (!user) {
      return response.status(400).json({ message: 'No such user exists' });
    }
    return response
      .status(200)
      .json({ message: 'User profile fetched successfully', user });
  } catch (err) {
    return response
      .status(500)
      .json({ message: 'Server error, try again later!' });
  }
};

//endpoint to allow a user make a blog post
const makeBlog = async (request, response) => {
  try {
    const { blog } = request.body;
    const userId = request.query.userId;
    const user = await User.findById({ _id: userId });
    if (!user) {
      return response.status(400).json({ message: 'User not found' });
    }
    const post = new Blog({
      userId: userId,
      post: blog,
    });
    await post.save();
    return response.status(201).json({ message: 'Blog uploaded successfully' });
  } catch (err) {
    return response
      .status(500)
      .json({ message: 'Server error, try again later!' });
  }
};

// endpoint to enable a user delete a blog post
const deleteBlog = async (request, response) => {
  try {
    const userId = request.query.userId;
    const blogId = request.query.blogId;
    const user = await User.findById({ _id: userId });
    const blog = await Blog.findById({ _id: blogId });

    if (!user) {
      return response.status(400).json({ message: 'User does not exist' });
    }
    if (!blog) {
      return response
        .status(400)
        .json({ message: 'Blog post does not exists' });
    }
    await Blog.findByIdAndDelete({ _id: blogId });
    await Comment.deleteMany({ postId: blogId });
    await Like.deleteMany({ postId: blogId });

    return response
      .status(200)
      .json({ message: 'Blog post deleted succesfully' });
  } catch (err) {
    return response
      .status(500)
      .json({ message: 'Server error, try again later!' });
  }
};

//endpoint to get all blog post of a particular user
const getPost = async (request, response) => {
  try {
    const userId = request.query.userId;
    const user = await User.findById({ _id: userId });
    if (!user) {
      return response.status(400).json({ message: 'User does not exist' });
    }

    const blogPost = await Blog.find({ userId: user._id });
    return response
      .status(200)
      .json({ message: 'Blog posts fetched successfully', posts: blogPost });
  } catch (err) {
    console.log(err.message);
    return response
      .status(500)
      .json({ message: 'Server error, try again later!' });
  }
};

const updateNumOfReads = async (request, response) => {
  try {
    const blogId = request.query.blogId;
    const blog = await Blog.findById({ _id: blogId });

    if (!blog) {
      return response.status(400).json({ message: 'Blog post not found' });
    }

    const userHasRead = blog.userIP.includes(request.ip);
    if (!userHasRead) {
      blog.userIP.push(request.ip); // add user's IP address to readBy array
      await blog.save();
      const updatedBlog = await blog.updateOne({ $inc: { numOfReads: 1 } });
      return response
        .status(200)
        .json({ message: 'Number of reads updated', updatedBlog });
    } else {
      return response
        .status(200)
        .json({ message: 'Number of reads not updated' });
    }
  } catch (err) {
    console.log(err.message);
    return response
      .status(500)
      .json({ message: 'Server error, try again later' });
  }
};

//endpoint to get all blogs in the database
const getAllBlogs = async (request, response) => {
  try {
    const blogs = await Blog.find().exec();
    return response.status(200).json({ message: 'All blog posts', blogs });
  } catch (err) {
    return response
      .status(500)
      .json({ message: 'Server error, try again later' });
  }
};

// endpoint to comment on a post
const commentPost = async (request, response) => {
  try {
    const { comment } = request.body;
    const userId = request.query.userId;
    const postId = request.query.postId;

    const comment1 = await Comment.findOne({ postId });
    const post = await Blog.findById({ _id: postId });
    const user = await User.findById({ _id: userId });

    if (!post) {
      return response.status(400).json({ message: 'Post not found!' });
    }
    if (!user) {
      return response.status(400).json({ message: 'User not found!' });
    }

    const newComment = new Comment({
      userId: userId,
      postId: postId,
      comment: comment,
    });
    await newComment.save();

    post.comments.push({
      commentId: newComment._id,
      comment: comment,
      user: user._id,
    });
    await post.save();
    return response.status(200).json({
      message: 'Comment posted successfully',
      comment: newComment.comment,
    });
  } catch (err) {
    console.log(err.message);
    return response
      .status(500)
      .json({ message: 'Server error, try again later!' });
  }
};

// endpoint to get all comments under a post
const getComments = async (request, response) => {
  try {
    const blogId = request.query.blogId;
    const blog = await Blog.findById({ _id: blogId });
    if (!blog) {
      return response.status(400).json({ message: 'Blog post not found' });
    }

    const comments = await Comment.find({ postId: blog._id }).sort({
      createdAt: -1,
    });
    return response
      .status(200)
      .json({ message: 'Comments fetched successfully', comments: comments });
  } catch (err) {
    return response
      .status(500)
      .json({ message: 'Server error, try again later!' });
  }
};

// endpoint to delete a comment
const deleteComments = async (request, response) => {
  try {
    const userId = request.query.userId;
    const blogId = request.query.blogId;
    const commentId = request.query.commentId;

    const user = await User.findById({ _id: userId });
    const blog = await Blog.findById({ _id: blogId });
    const comment = await Comment.findById({ _id: commentId });

    if (!user) {
      return response.status(400).json({ message: 'User not found!' });
    }
    if (!blog) {
      return response.status(400).json({ message: 'Blog post not found!' });
    }
    if (!comment) {
      return response.status(400).json({ message: 'Comment not found!' });
    }
    let notInComment = true;

    blog.comments.forEach((comment, index) => {
      if (comment.commentId == commentId) {
        notInComment = false;
        blog.comments.splice(index, 1);
        blog.save();
        return response.status(200).json({ message: 'Comment deleted!' });
      }
    });
    if (notInComment) {
      return response.status(400).json({ message: 'Comment not found!' });
    }
    await Comment.findByIdAndDelete(commentId);
  } catch (err) {
    return response
      .status(500)
      .json({ message: 'Server error, try again later!' });
  }
};

// endpoint to like a blog post
const likePost = async (request, response) => {
  try {
    const { blogId, userId } = request.query;
    const user = await User.findById({ _id: userId });
    const blog = await Blog.findById({ _id: blogId });

    if (!user) {
      return response.status(400).json({ message: 'User not found' });
    }
    if (!blog) {
      return response.status(400).json({ message: 'Blog post not found' });
    }

    const ifLikeExists = await Like.findOne({ userId, postId: blogId });
    if (ifLikeExists) {
      return response
        .status(400)
        .json({ message: 'You already liked this post' });
    }
    const like = new Like({
      userId: userId,
      postId: blogId,
    });
    await like.save();
    const postLikes = await Like.find({ postId: blogId }).count();
    blog.likes = postLikes;
    await blog.save();
    return response.status(200).json({ message: 'Post liked successfully' });
  } catch (err) {
    return response
      .status(500)
      .json({ message: 'Server error, try again later!' });
  }
};

const dislikePost = async (request, response) => {
  try {
    const blogId = request.query.blogId;
    const userId = request.query.userId;

    const like = await Like.findOne({ postId: blogId, userId });
    const blog = await Blog.findById({ _id: blogId });
    const user = await User.findById({ _id: userId });

    if (!blog) {
      return response.status(400), json({ message: 'Blog post not found' });
    }
    await Like.deleteOne({ postId: blogId, userId });
    const postLikes = await Like.find({ postId: blogId }).count();
    blog.likes = postLikes;
    await blog.save();
    return response
      .status(200)
      .json({ message: 'Blog post disliked successfully' });
  } catch (err) {
    return response
      .status(500)
      .json({ message: 'Server error, try again later!' });
  }
};


const resumeBuilder = async (request, response) => {
  try {
    const { userId } = request.query;
    const user = await User.findById({ _id: userId });
    if (!user) {
      return response
        .status(400)
        .json({ message: 'User does not exist, please register' });
    }
    const { error, value } = resumeSchema.validate(request.body);
    if (error) {
      return response.status(400).json({ Error: error.details[0].message });
    }
    const cv = new resume({
      userId,
      ...value,
    });
    await cv.save();
    return response
      .status(201)
      .json({ message: 'Resume created successfully', cv });
  } catch (err) {
    console.error(err);
    return response
      .status(500)
      .json({ message: 'Server error, try again later!' });
  }
};

const konectinInternshipMail = async (request, response) => {
  try {
    const { email } = request.body;
    if (!email) {
      return response.status(400).json({ message: 'Your email is required' });
    }
    const find = await intern.findOne({ email: email });
    if (find) {
      return response.status(400).json({ message: 'You already subscribed' });
    }
    const internship = new intern({
      email: email,
    });
    await internship.save();
    const subject = 'Konectin Technical - Konectin Internship';
    const msg = `This email is to signify that you have requested to be notified when the internship service launch.
			<p class="text-xs my-1 text-center">If you did not request this email, kindly ignore it or reach out to support if you think your account is at risk.</p>
		`;
    await transporter(email, subject, msg);
    return response.status(200).json({
      message:
        'You will be notified accordingly, please check your email for a vverification message',
    });
  } catch (err) {
    return response
      .status(500)
      .json({ message: 'Server error, try again later!' });
  }
};

const subscribeNewsLetter = async (request, response) => {
  try {
    const { email } = request.body;
    if (!email) {
      return response.status(400).json({ message: 'Your email is required' });
    }
    const user = await newsletter.findOne({ email: email });

    if (user) {
      return response.status(400).json({ message: 'You already subscribed' });
    }
    const news = new newsletter({
      email: email,
    });
    await news.save();
    const subject = 'Konectin Technical';
    const msg = `This email is to signify that you have successfully subscribed to our newsletter.
			<p class="text-xs my-1 text-center">If you did not request this email, kindly ignore it or reach out to support if you think your account is at risk.</p>
		`;
    await transporter(email, subject, msg);
    return response.status(200).json({ message: 'Subscribed successfully' });
  } catch (err) {
    return response
      .status(500)
      .json({ message: 'Server error, try again later!' });
  }
};

const unsubscribeNewsLetter = async (request, response) => {
  try {
    const { email } = request.body;
    const user = await newsletter.findOne({ email: email });

    if (!user) {
      return response
        .status(400)
        .json({ message: 'You need to be subscribed first' });
    }
    await user.deleteOne();
    const subject = 'Konectin Technical';
    const msg = `This email is to signify that you have successfully unsubscribed from our newsletter.
			<p class="text-xs my-1 text-center">If you did not request this email, kindly ignore it or reach out to support if you think your account is at risk.</p>
		`;
    await transporter(email, subject, msg);
    return response.status(200).json({
      message: 'You have successfully unsubscribed from the mailing list.',
    });
  } catch (err) {
    return response
      .status(500)
      .json({ message: 'Server error, try again later!' });
  }
};

const getUserResumes = async function (request, response) {
  try {
    const { userId } = request.query;
    const user = await User.findById({ _id: userId });
    if (!user) {
      return response
        .status(400)
        .json({ message: 'User does not exist, please register' });
    }
    cvs = await resume.find({ userId: userId });

    return response
      .status(200)
      .json({ message: 'Resumes retrieved successfully', cvs });
  } catch (err) {
    console.error(err);
    return response
      .status(500)
      .json({ message: 'Server error, try again later!' });
  }
};

const getUserResume = async function (request, response) {
  try {
    const { userId, resumeId } = request.query;
    const user = await User.findById({ _id: userId });
    if (!user) {
      return response
        .status(400)
        .json({ message: 'User does not exist, please register' });
    }
    const cv = await resume.findById(resumeId);
    if (!cv) {
      return response
        .status(400)
        .json({ message: 'Resume with Id does not exist' });
    }

    return response
      .status(200)
      .json({ message: 'Resume retrieved successfully', cv });
  } catch (err) {
    console.error(err);
    return response
      .status(500)
      .json({ message: 'Server error, try again later!' });
  }
};

const createPdf = async function (request, response) {
  try {
    const { userId } = request.query;
    const { html } = request.body;
    const user = await User.findById({ _id: userId });
    if (!user) {
      return response
        .status(400)
        .json({ message: 'User does not exist, please register' });
    }
      pdf.create(html, {
        childProcessOptions: {
          env: {
            OPENSSL_CONF: '/dev/null',
          },
        },
      }).toBuffer((err, buffer) => {
        if (err) {
          console.error(err);
          return response
            .status(500)
            .json({ message: 'Error Generating Pdf, Please Try Again Later' });
        }
        response.type('pdf');
        return response.end(buffer, 'binary');
      });
  } catch (err) {
    console.error(err);
    return response
      .status(500)
      .json({ message: 'Server error, try again later!' });
  }
};

const updateUserResume = async function (request, response) {
  try {
    const { userId, resumeId } = request.query;
    const user = await User.findById({ _id: userId });
    if (!user) {
      return response
        .status(400)
        .json({ message: 'User does not exist, please register' });
    }
    const { error, value } = resumeUpdateSchema.validate(request.body);
    if (error) {
      return response.status(400).json({ Error: error.details[0].message });
    }
    const cv = await resume.findByIdAndUpdate(
      resumeId,
      { ...value },
      { new: true }
    );
    if (!cv) {
      return response
        .status(400)
        .json({ message: 'Resume with Id does not exist' });
    }

    return response
      .status(200)
      .json({ message: 'Resume Updated successfully', cv });
  } catch (err) {
    console.error(err);
    return response
      .status(500)
      .json({ message: 'Server error, try again later!' });
  }
};

const logOut = async function (request, response) {
  try {
    return response
    .status(400)
    .json({ message: 'In development' });
  } catch (err) {
    console.error(err);
    return response
      .status(500)
      .json({ message: 'Server error, try again later!' });
  }
};

module.exports = {
  register,
  login,
  getUser,
  makeBlog,
  deleteBlog,
  getPost,
  commentPost,
  getComments,
  deleteComments,
  likePost,
  dislikePost,
  verifyEmailAddress,
  requestEmailToken,
  googleSignin,
  verifyOtp,
  forgetPassword,
  resetPassword,
  getAllBlogs,
  resumeBuilder,
  updateNumOfReads,
  konectinInternshipMail,
  subscribeNewsLetter,
  unsubscribeNewsLetter,
  getUserResumes,
  getUserResume,
  updateUserResume,
  createPdf,
  logOut,
};
