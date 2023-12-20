require('dotenv').config();

const mongoose = require('mongoose');
const Product = require('../models/Product');
const products = require('./seedData');

const db = process.env.MONGO_URI;

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB Connected');
        return Product.insertMany(products);
    })
    .then(() => {
        console.log('Data seeded successfully');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error(err);
        mongoose.connection.close();
    });