const express = require('express');
const router = express.Router();

const userRoutes = require('./api/users');
const productRoutes = require('./api/products');
const stripeRoutes = require('./api/stripe')


router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/stripe', stripeRoutes)

module.exports = router;