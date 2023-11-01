const router = require('express').Router();
const common = require('../controllers/common.controllers');
const { isEmailVerified } = require('../helpers/isEmailVerified');
const { verifyUserToken } = require('../helpers/jsonwebtoken');

router.post('/internshipMail', common.konectinInternshipMail);
router.post('/subscribeMail', common.subscribeNewsLetter);
router.post('/unsubscribeMail', common.unsubscribeNewsLetter);
router.post('/subscribeIntern', verifyUserToken, isEmailVerified, common.subscribeIntern)


module.exports = router;
