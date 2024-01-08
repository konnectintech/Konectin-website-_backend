const router = require("express").Router();
const resume = require("../../controllers/user/resume.controllers");
const { verifyUserToken } = require("../../helpers/jsonwebtoken");

router.post("/resume", resume.resumeBuilder);
router.get("/getResumes/:userId", resume.getUserResumes);
router.get("/getResume/:resumeId", resume.getUserResume);
router.put("/updateResume/:resumeId", verifyUserToken, resume.updateUserResume);
router.post("/createPdf/:resumeId", resume.createPdf);
router.delete("/resume/:resumeId", verifyUserToken, resume.delete);

module.exports = router;
