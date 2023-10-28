const router = require('express').Router();
const authRoutes = require("./auth.routes");
const blogRoutes = require("./blog.routes")

router.use("",authRoutes,blogRoutes)

module.exports = router