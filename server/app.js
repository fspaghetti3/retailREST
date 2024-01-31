require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const allRoutes = require('./routes/index');
const authRoutes = require('./routes/api/auth')
const userRoutes = require('./routes/api/users')
const stripeRoutes = require('./routes/api/stripe');
const productRoutes = require('./routes/api/products');
const cors = require('cors');

const app = express();
app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

app.use((error, req, res, next) => {
    console.error('Global error handler:', error.message);
    res.status(500).send('Internal Server Error');
});

app.get('/api/test', (req, res) => {
    res.send('Test route reached');
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api', allRoutes);

const db = process.env.MONGO_URI;

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server running on port ${port}`));