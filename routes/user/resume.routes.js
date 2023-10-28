const router = require('express').Router();
const resume = require("../../controllers/user/resume.controllers");

router.post('/resume', resume.resumeBuilder);
router.get('/getResumes', resume.getUserResumes);
router.get('/getResume', resume.getUserResume);
router.put('/updateResume', resume.updateUserResume);
router.post('/createPdf', resume.createPdf);

module.exports = router;