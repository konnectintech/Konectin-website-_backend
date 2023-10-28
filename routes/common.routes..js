const router = require('express').Router();
const common = require('../controllers/common.controllers');

router.post('/internshipMail', common.konectinInternshipMail);
router.post('/subscribeMail', common.subscribeNewsLetter);
router.post('/unsubscribeMail', common.unsubscribeNewsLetter);


module.exports = router;
