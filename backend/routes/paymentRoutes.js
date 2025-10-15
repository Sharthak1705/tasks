const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const paymentController = require('../controllers/paymentController');

router.post('/create-checkout-session', paymentController.createCheckoutSession);
router.post('/webhook', bodyParser.raw({ type: 'application/json' }), paymentController.handleWebhook);

module.exports = router;
