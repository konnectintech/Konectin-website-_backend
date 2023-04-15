const router = require("express").Router()
const {login, makeBlog, register, deleteBlog, getAllBlogs} = require('../controllers/admin.controller')

router.post("/register", register)
router.post("/login", login)
router.post("/makeBlog", makeBlog)
router.get("/getBlogs", getAllBlogs)
router.delete("/deleteBlog", deleteBlog)

module.exports = router