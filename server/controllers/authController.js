const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const authController = {

    // User registration
    register: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            // Hash password
            const hashedPassword = await bcrypt.hash(password, 12);

            // Create new user
            const newUser = new User({ username, email, password: hashedPassword });
            await newUser.save();

            // Generate token
            const token = jwt.sign({ userId: newUser._id }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });

            res.status(201).json({ message: 'User created', token });
        } catch (error) {
            res.status(500).json({ message: 'Error registering new user' });
        }
    },

    // User login
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ userId: user._id }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });
            res.json({ token });
        } catch (error) {
            res.status(500).json({ message: 'Error logging in' });
        }
    },

    // User logout
    logout: async (req, res) => {
        res.json({ message: 'Logout successful' });
    }
};

module.exports = authController;