const router = require("express").Router();

const authRoutes = require("./auth.routes");
const resumeRoutes = require("./resume.routes");

router.use("",authRoutes, resumeRoutes);

module.exports = router;