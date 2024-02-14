const router = require("express").Router();
const auth = require("../../controllers/user/auth.controllers");

const multer = require("multer");
const upload = multer({ dest: "tmp/" });

router.post("/register", auth.register);
router.post("/login", auth.login);
router.get("/getUser", auth.getUser);
router.post("/requestEmail", auth.requestEmailToken);
router.post("/verify-otp", auth.verifyOtp);
router.post("/verifyEmail", auth.verifyEmailAddress);
router.post("/forgotPassword", auth.forgetPassword);
router.post("/resetPassword", auth.resetPassword);
router.post("/microsoft/login", auth.microsoftLogin);
router.post("/googleSignIn", auth.googleLogin);

router.delete("/logout", auth.logOut);

module.exports = router;
