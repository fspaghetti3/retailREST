const axios = require('axios');

const cloverAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');

        // Verify the Clover token
        const response = await axios.get('CLOVER_TOKEN_VERIFICATION_ENDPOINT', {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response || response.status !== 200) {
            throw new Error('Invalid Clover token');
        }

        req.cloverAuthInfo = response.data;

        next();
    } catch (error) {
        res.status(401).send({ error: 'Clover authentication failed' });
    }
};

module.exports = cloverAuth;