const router = require("express").Router();
const letter = require("../../controllers/user/letter.controllers");

const { verifyUserToken } = require("../../helpers/jsonwebtoken");

router.post("/letter", letter.letterBuilder);
router.get("/getLetter", verifyUserToken, letter.getUserLetter);
router.get("/getLetters", verifyUserToken, letter.getUserLetters);
router.delete("/letter", verifyUserToken, letter.delete);
router.put("/updateLetter", verifyUserToken, letter.updateUserLetter);
router.post(
  "/createLetterIntoPdf",
  verifyUserToken,
  letter.createLetterIntoPdf
);

module.exports = router;
