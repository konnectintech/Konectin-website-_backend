const router = require("express").Router();

const authRoutes = require("./auth.routes");
const resumeRoutes = require("./resume.routes");
const coverLetterRoutes = require("./coverLetter.routes")

router.use("",authRoutes, resumeRoutes, coverLetterRoutes);

module.exports = router;