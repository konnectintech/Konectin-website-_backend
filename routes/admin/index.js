const router = require('express').Router();
const authRoutes = require("./auth.routes");
const blogRoutes = require("./blog.routes");
const userRoutes = require("./user.routes");
const internRoutes = require("./intern.routes");
const resumeRoutes = require("./resume.routes")

router.use("",
    authRoutes,
    blogRoutes,
    userRoutes,
    internRoutes,
    resumeRoutes
)

module.exports = router