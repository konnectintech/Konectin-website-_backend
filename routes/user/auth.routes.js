const router = require("express").Router();
const auth = require("../../controllers/user/auth.controllers");

router.post("/register", auth.register);
router.post("/login", auth.login);
router.get("/getUser", auth.getUser);
router.post("/microsoft/login", auth.microsoftLogin);
router.post("/verify-otp", auth.verifyOtp);
router.post("/requestEmail", auth.requestEmailToken);
router.post("/forgotPassword", auth.forgetPassword);
router.post("/resetPassword", auth.resetPassword);
router.post("/googleSignIn", auth.googleLogin);
router.post("/verifyEmail", auth.verifyEmailAddress);
router.delete("/logout", auth.logOut);

module.exports = router;
