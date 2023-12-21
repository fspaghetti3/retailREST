require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cloverAuthMiddleware = require('./middleware/cloverAuth');
const allRoutes = require('./routes/index');
const cors = require('cors');

const cloverCredentials = {
    apiKey: process.env.CLOVER_API_KEY,
    merchantId: process.env.CLOVER_MERCHANT_ID,
};



const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/payments', cloverAuthMiddleware);

app.use('/api', allRoutes);

const db = process.env.MONGO_URI;

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server running on port ${port}`));