const router = require("express").Router()

const {register, login, getUser} = require('../controllers/user.controller')

router.post('/register', register)
router.post('/login', login)
router.get('/getUser', getUser)

module.exports = router