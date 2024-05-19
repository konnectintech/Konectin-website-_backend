const router = require("express").Router();

const authRoutes = require("./auth.routes");
const resumeRoutes = require("./resume.routes");
const letterRoutes = require("./letter.routes");
const dashboardRoutes = require("./dashboard.routes");
const contactRoutes = require("./contact-us.routes");
const internshipRoutes = require("./internship.routes");

router.use(
  "",
  authRoutes,
  resumeRoutes,
  dashboardRoutes,
  letterRoutes,
  contactRoutes,
  internshipRoutes
);

module.exports = router;
