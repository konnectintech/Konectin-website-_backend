const router = require("express").Router()

const {register, login, getUser,
        makeBlog, deleteBlog, getPost,
        commentPost, deleteComments, getComments,
        likePost, dislikePost,
        verifyEmailAddress, requestEmailToken, googleSignin, forgetPassword,
        resetPassword, getAllBlogs, resumeBuilder, updateNumOfReads,
        konectinInternshipMail, subscribeNewsLetter, unsubscribeNewsLetter} = require('../controllers/user.controller')

const {verifyUserToken} = require("../helpers/jsonwebtoken")
const {isEmailVerified} = require("../helpers/isEmailVerified")

router.post('/register', register)
router.post('/verifyEmail', verifyEmailAddress)
router.post('/requestEmail', requestEmailToken)
router.post('/googleSignIn', googleSignin)
router.post('/login', login)
router.post("/forgotPassword", forgetPassword)
router.post("/resetPassword", resetPassword)
router.get('/getUser', getUser)
router.post('/makeBlog', verifyUserToken, isEmailVerified, makeBlog)
router.delete('/deleteBlog', verifyUserToken, isEmailVerified, deleteBlog)
router.get('/getBlog', verifyUserToken, isEmailVerified, getPost)
router.get('/getAllBlogs', getAllBlogs)
router.post('/commentPost', /*verifyUserToken,*/ isEmailVerified, commentPost)
router.delete('/deleteComment', verifyUserToken, isEmailVerified, deleteComments)
router.get('/getComments', isEmailVerified, getComments)
router.post('/likePost', verifyUserToken, isEmailVerified, likePost)
router.delete('/dislikePost', verifyUserToken, isEmailVerified, dislikePost)
router.post("/resume", resumeBuilder)
router.put("/updateNumOfReads", updateNumOfReads)
router.post("/internshipMail", konectinInternshipMail)
router.post("/subscribeMail", subscribeNewsLetter)
router.post("/unsubscribeMail", unsubscribeNewsLetter)

module.exports = router