const router = require("express").Router()

const {register, login, getUser,
        makeBlog, deleteBlog, getPost} = require('../controllers/user.controller')

router.post('/register', register)
router.post('/login', login)
router.get('/getUser', getUser)
router.post('/makeBlog', makeBlog)
router.delete('/deleteBlog', deleteBlog)
router.get('/getBlog', getPost)

module.exports = router