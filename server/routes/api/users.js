const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, updateUser, deleteUser } = require('../../controllers/userController');

// Get all users
router.get('/', getAllUsers);

// Get a single user by ID
router.get('/:id', getUserById);

// Update
router.put('/:id', updateUser);

// Delete
router.delete('/:id', deleteUser);

module.exports = router;