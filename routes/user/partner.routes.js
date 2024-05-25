const router = require("express").Router();
const partner = require("../../controllers/user/partnership.controller");

router.post("/partner", partner.partnershipApplication);

module.exports = router;
