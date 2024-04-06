const router = require("express").Router();
const intern = require("../../controllers/admin/intern.controllers");
const { verifyAdmin } = require("../../helpers/jsonwebtoken")

router.get("/interns", verifyAdmin, intern.getInterns);
router.get("/interns/:internId", verifyAdmin, intern.getIntern);


module.exports = router;