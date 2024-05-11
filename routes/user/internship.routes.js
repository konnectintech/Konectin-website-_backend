const router = require("express").Router();
const internship = require("../../controllers/user/internshipApplication.controller");

router.post("/internshipApplication", internship.internshipApplication);

module.exports = router;
