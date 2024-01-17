const router = require("express").Router();
const resume = require("../../controllers/user/resume.controllers");
const { verifyUserToken } = require("../../helpers/jsonwebtoken");

router.post("/resume", resume.resumeBuilder);
router.get("/getResumes", verifyUserToken, resume.getUserResumes);
router.get("/getResume", verifyUserToken, resume.getUserResume);
router.put("/updateResume", verifyUserToken, resume.updateUserResume);
router.post("/createPdf", verifyUserToken, resume.createPdf); //this endpoint is still under implementation
router.delete("/resume", verifyUserToken, resume.delete);

module.exports = router;
