const router = require("express").Router();
const dashboard = require("../../controllers/user/dashboard.controllers");
const { verifyUserToken } = require("../../helpers/jsonwebtoken");

router.get("/v2/getUserInfo", verifyUserToken, dashboard.getUserInfo); //WE ALREADY HAVE THE  ENDPONT FOR THIS IN THE AUTH ROUTES AS router.get("/getUser", auth.getUser);
router.get(
  "/v2/getNotificationSettings",
  verifyUserToken,
  dashboard.getNotificationSettings
);
router.get("/v2/getSocials", verifyUserToken, dashboard.getSocials);
router.put("/v2/updateUser", verifyUserToken, dashboard.updateUser);

module.exports = router;
