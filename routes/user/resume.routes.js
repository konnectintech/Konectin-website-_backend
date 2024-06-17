const router = require("express").Router();
const resume = require("../../controllers/user/resume.controllers");
const { verifyUserToken } = require("../../helpers/jsonwebtoken");

router.post("/resume", resume.resumeBuilder);
router.get("/getResumes", verifyUserToken, resume.getUserResumes);
router.get("/getResume", verifyUserToken, resume.getUserResume);
router.get("/getResumeProfilePictures", verifyUserToken, resume.getResumePictures);
router.put("/updateResume", verifyUserToken, resume.updateUserResume);
router.post("/duplicateResume", verifyUserToken, resume.duplicateResume);
router.post("/v2/createPdf", verifyUserToken, resume.downloadPDF);
router.delete("/delete/resume", verifyUserToken, resume.delete);
router.get("/resumesDownloaded", resume.numberOfDownloadeResumes);
router.post('/uploadResumeProfilePicture', verifyUserToken, resume.uploadResumeProfilePicture);

module.exports = router;
