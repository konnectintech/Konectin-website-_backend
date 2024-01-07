const router = require("express").Router();
const resume = require("../../controllers/user/resume.controllers");
const { verifyUserToken } = require("../../helpers/jsonwebtoken");
const { isEmailVerified } = require("../../helpers/isEmailVerified");

router.post("/resume", resume.resumeBuilder);
router.get("/getResumes/:userId", resume.getUserResumes);
router.get("/getResume/:resumeId", resume.getUserResume);
router.put("/updateResume", resume.updateUserResume);
router.post("/createPdf", verifyUserToken, resume.createPdf);
router.delete("/resume/:resumeId", verifyUserToken, resume.delete);

module.exports = router;
