const router = require('express').Router();
const comment = require("../../controllers/blog/comment.controllers")
const { verifyUserToken } = require('../../helpers/jsonwebtoken');
const { isEmailVerified } = require('../../helpers/isEmailVerified');

router.post('/commentPost', isEmailVerified, comment.commentPost);
router.delete('/deleteComment', verifyUserToken, isEmailVerified, comment.deleteComments);
router.get('/getComments', comment.getComments);
router.post('/likeComment', verifyUserToken, isEmailVerified, comment.likeComment);

module.exports = router;