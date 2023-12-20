const express = require('express');
const router = express.Router();

const userRoutes = require('./api/users');
const productRoutes = require('./api/products');
const paymentRoutes = require('./api/payments');

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/payments', paymentRoutes);


module.exports = router;