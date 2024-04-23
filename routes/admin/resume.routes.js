const router = require("express").Router();
const resume = require("../../controllers/admin/resume.controllers");
const { verifyAdmin } = require("../../helpers/jsonwebtoken")

router.get("/resumes", verifyAdmin, resume.getResumes);
router.get("/resumes/:resumeId", verifyAdmin, resume.getResume);


module.exports = router;