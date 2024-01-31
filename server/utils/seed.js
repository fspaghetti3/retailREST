require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User'); // Adjust the path as necessary
const Product = require('../models/Product'); // Adjust the path as necessary
const bcrypt = require('bcrypt');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const products = [
    {
        name: "Product 1",
        price: 19.99,
        color: "red",
        weight: 0.5,
        description: "This is product 1 description."
    },
    {
        name: "Product 2",
        price: 29.99,
        color: "blue",
        weight: 0.75,
        description: "This is product 2 description."
    }
];

const users = [
    {
        email: "user1@example.com",
        password: "password123" // Ensure this is hashed in the script
    },
    {
        email: "user2@example.com",
        password: "password456"
    }
];

const seedDB = async () => {
    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});

    // Seed Users
    for (let userData of users) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const newUser = new User({ ...userData, password: hashedPassword });
        await newUser.save();
    }

    // Seed Products
    for (let productData of products) {
        const newProduct = new Product(productData);
        await newProduct.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
    console.log('Database seeded!');
});