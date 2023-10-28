const router = require("express").Router();
const blog = require("../../controllers/admin/blog.controllers");

router.post("/makeBlog", blog.makeBlog);
router.get("/getBlogs", blog.getAllBlogs);
router.get("/getBlog", blog.getBlogById);
router.delete("/deleteBlog", blog.deleteBlog);

module.exports = router;