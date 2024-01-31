const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        // Check for the token in the request header
        console.log('Auth middleware triggered');

        const token = req.cookies['authToken'];

        console.log('Token from cookie:', token);

        if (!token) {
            throw new Error('Token not found');
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            throw new Error();
        }

        req.user = user;
        req.token = token;
        req.user.cloverCustomerId = user.cloverCustomerId

        next();
    } catch (error) {
        console.error('Error in auth middleware:', error.message);
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

module.exports = auth;