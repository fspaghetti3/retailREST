require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const authController = {

    // User registration
    register: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            console.log("Registering user:", { username, email, password });
    
            // Hash password
            const hashedPassword = await bcrypt.hash(password, 12);
            console.log("Original password:", password);
            console.log("Hashed password:", hashedPassword);
    
            // Create new user
            console.log("Original password:", password);
            const newUser = new User({ username, email: email.toLowerCase(), password: hashedPassword });
            await newUser.save();
            console.log("Password after save:", newUser.password);
    
            // Generate token
            const token = jwt.sign({ userId: newUser._id }, 'TOKEN', { expiresIn: '1h' });
    
            res.status(201).json({ message: 'User created', token });
        } catch (error) {
            console.error('Error in user registration:', error.message);
            res.status(500).json({ message: 'Error registering new user' });
        }
    },

// User login
login: async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Login attempt:", { email });

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            console.log("User not found:", { email });
            return res.status(401).json({ message: 'Invalid login credentials' });
        }

        console.log("Plaintext password:", password);
        console.log("Hashed password from DB:", user.password);
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match result:", isMatch);

        if (!isMatch) {
            console.log("Password does not match:", { email });
            return res.status(401).json({ message: 'Invalid login credentials' });
        }

        if (!user._id) {
            console.error('User ID not found for:', email);
            return res.status(500).json({ message: 'Error retrieving user ID' });
        }

        console.log("User ID:", user._id);

        const token = jwt.sign({ userId: user._id }, 'TOKEN', { expiresIn: '1h' });

        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000,
            sameSite: 'strict'
        });

        res.json({ 
            message: 'Login successful', 
            token: token, 
            userId: user._id.toString(),
            cloverCustomerId: user.cloverCustomerId
        });

    } catch (error) {
        console.error('Error in user login:', error.message);
        res.status(500).json({ message: 'Error logging in' });
    }
    },

    // User logout
    logout: async (req, res) => {
        console.log("User logged out");
        res.json({ message: 'Logout successful' });
    }
};

module.exports = authController;