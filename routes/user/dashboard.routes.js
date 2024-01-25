const router = require("express").Router();
const dashboard = require("../../controllers/user/dashboard.controllers");

router.get("/getUserInfo", dashboard.getUserInfo);
router.get("/getNotificationSettings", dashboard.getNotificationSettings);
router.get("/getSocials", dashboard.getSocials);
router.put("/updateUser", dashboard.updateUser);

module.exports = router;