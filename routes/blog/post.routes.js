const router = require('express').Router();
const { verifyUserToken } = require('../../helpers/jsonwebtoken');
const { isEmailVerified } = require('../../helpers/isEmailVerified');
const post = require("../../controllers/blog/post.controllers")

router.post('/makeBlog', verifyUserToken, isEmailVerified, post.createPost);
router.get('/getBlog', post.getPost);
router.get('/getAllBlogs', post.getPosts);
router.delete('/deleteBlog', verifyUserToken, isEmailVerified, post.deletePost);

router.post('/likePost', verifyUserToken, isEmailVerified, post.likePost);

router.put('/updateNumOfReads', post.updateNumOfReads);
router.get('/getBlogActions', post.getBlogActions);
router.put('/updateNumOfShares', post.updateNumOfShares);

module.exports = router;