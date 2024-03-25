const router = require("express").Router();
const letter = require("../../controllers/user/letter.controllers");

const { verifyUserToken } = require("../../helpers/jsonwebtoken");

router.post("/letter", letter.letterBuilder);
router.get("/getLetter", verifyUserToken, letter.getUserLetter);
router.get("/getLetters", verifyUserToken, letter.getUserLetters);
router.delete("/deleteLetter", verifyUserToken, letter.delete);
router.put("/updateLetter", verifyUserToken, letter.updateUserLetter);
router.post("/v2/createLetterPdf", verifyUserToken, letter.createLetterIntoPdf);

module.exports = router;
