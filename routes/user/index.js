const router = require("express").Router();

const authRoutes = require("./auth.routes");
const resumeRoutes = require("./resume.routes");
const letterRoutes = require("./letter.routes");

router.use("", authRoutes, resumeRoutes, letterRoutes);

module.exports = router;
