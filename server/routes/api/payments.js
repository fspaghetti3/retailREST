const express = require('express');
const router = express.Router();
const { processPayment, getPaymentStatus } = require('../../controllers/paymentController');

// Processing
router.post('/process', processPayment);

// Status
router.get('/status/:paymentId', getPaymentStatus);

module.exports = router;