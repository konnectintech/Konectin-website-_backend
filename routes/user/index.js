const router = require("express").Router();

const authRoutes = require("./auth.routes");
const resumeRoutes = require("./resume.routes");
const dashboardRoutes = require("./dashboard.routes");


router.use("", authRoutes, resumeRoutes, dashboardRoutes);
const contactRoutes = require("./contact-us.routes");

router.use("", authRoutes, resumeRoutes, contactRoutes);

module.exports = router;