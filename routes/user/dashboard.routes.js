const router = require("express").Router();
const dashboard = require("../../controllers/user/dashboard.controllers");
const { verifyUserToken } = require("../../helpers/jsonwebtoken");

router.get(
  "/v2/getNotificationSettings",
  verifyUserToken,
  dashboard.getNotificationSettings
);
router.get("/v2/getSocials", verifyUserToken, dashboard.getSocials);
router.put("/v2/updateUser", verifyUserToken, dashboard.updateUser);
router.put('/v2/updateNotificationSettings', verifyUserToken, dashboard.updateNotificationSettings);
router.put("/v2/updateUserPicture", dashboard.updateUserPicture);

module.exports = router;
