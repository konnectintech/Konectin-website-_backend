const router = require("express").Router();
const dashboard = require("../../controllers/user/dashboard.controllers");

router.get("/v2/getUserInfo", dashboard.getUserInfo);
router.get("/v2/getNotificationSettings", dashboard.getNotificationSettings);
router.get("/v2/getSocials", dashboard.getSocials);
router.put("/v2/updateUser", dashboard.updateUser);

module.exports = router;