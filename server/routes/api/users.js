const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, updateUser, deleteUser, createUser, getUserDetails } = require('../../controllers/userController');

// Get all users
router.get('/', getAllUsers);

// Create
router.post('/create-customer', createUser);

// Get a single user by ID
router.get('/:id', getUserById);

// Update
router.put('/:id', updateUser);

// Delete
router.delete('/:id', deleteUser);

module.exports = router;