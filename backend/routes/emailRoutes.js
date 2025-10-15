const express = require('express');
const router = express.Router();
const { saveEmail, getEmails } = require('../controllers/emailController');
router.post('/', saveEmail);

router.get('/', getEmails);

module.exports = router;
