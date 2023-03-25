const router = require("express").Router()

const {register, login, getUser,
        makeBlog, deleteBlog, getPost,
        commentPost, deleteComments, getComments,
        likePost, dislikePost} = require('../controllers/user.controller')

router.post('/register', register)
router.post('/login', login)
router.get('/getUser', getUser)
router.post('/makeBlog', makeBlog)
router.delete('/deleteBlog', deleteBlog)
router.get('/getBlog', getPost)
router.post('/commentPost', commentPost)
router.delete('/deleteComment', deleteComments)
router.get('/getComments', getComments)
router.post('/likePost', likePost)
router.delete('/dislikePost', dislikePost)

module.exports = router