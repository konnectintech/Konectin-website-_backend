const express = require('express');
const router = express.Router();
const contactController = require('../../controllers/user/contact-us.controllers');

router.post('/contact', contactController.sendContactEmail);

module.exports = router;