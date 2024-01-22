const letterRouter = require("express").Router();
const { createLetter } = require("../../controllers/user/coverLetter.controller");
const { verifyUserToken } = require("../../helpers/jsonwebtoken");

letterRouter.post("/cover-letter", verifyUserToken, createLetter);

module.exports = letterRouter;
