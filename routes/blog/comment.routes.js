const router = require('express').Router();
const comment = require("../../controllers/blog/comment.controllers")
const { verifyUserToken } = require('../../helpers/jsonwebtoken');
const { isEmailVerified } = require('../../helpers/isEmailVerified');

router.post('/commentPost', verifyUserToken, isEmailVerified, comment.commentPost);
router.delete('/deleteComment', verifyUserToken, isEmailVerified, comment.deleteComments);
router.get('/getComments', comment.getComments);
router.get('/getComment', comment.getComment);
router.patch('/updateComment', comment.updateComment);
router.patch('/updateCommentShare', comment.updateCommentshare);
router.post('/likeComment', verifyUserToken, isEmailVerified, comment.likeComment);
router.post('/replyComment', verifyUserToken, isEmailVerified, comment.replyComment);

module.exports = router;