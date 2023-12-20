const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct } = require('../../controllers/productController');

// Get all products
router.get('/', getAllProducts);

// Get a single product by ID
router.get('/:id', getProductById);

// Add
router.post('/', addProduct);

// Update
router.put('/:id', updateProduct);

// Delete
router.delete('/:id', deleteProduct);

module.exports = router;