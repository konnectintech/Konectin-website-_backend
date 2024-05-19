const router = require("express").Router();
const letter = require("../../controllers/user/letter.controllers");

const { verifyUserToken } = require("../../helpers/jsonwebtoken");

router.post("/letter", letter.letterBuilder);
router.get("/getLetter", letter.getUserLetter);
router.get("/getLetters", verifyUserToken, letter.getUserLetters);
router.delete("/deleteLetter", verifyUserToken, letter.delete);
router.put("/updateLetter", letter.updateUserLetter);
router.post("/v2/createLetterDocx", letter.createLetterIntoDocx);

module.exports = router;
