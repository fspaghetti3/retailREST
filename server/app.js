const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cloverAuthMiddleware = require('./middleware/cloverAuth');

const userRoutes = require('./routes/api/users');
const paymentRoutes = require('./routes/api/payments');

const db = process.env.MONGO_URI;
const cloverCredentials = {
    apiKey: process.env.CLOVER_API_KEY,
    merchantId: process.env.CLOVER_MERCHANT_ID,
};

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/payments', cloverAuthMiddleware(cloverCredentials));

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.use('/api/users', userRoutes);
app.use('/api/payments', paymentRoutes);

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server running on port ${port}`));