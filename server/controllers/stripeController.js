require('dotenv').config();
const axios = require('axios');
const User = require('../models/User')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (req, res) => {
    try {
        const { cartItems } = req.body;

        const lineItems = cartItems.map(item => {
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: Math.round(item.price * 100),
                },
                quantity: item.quantity,
            };
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${req.headers.origin}/payment-success`,
            cancel_url: `${req.headers.origin}/cart`,
        });

        res.json({ url: session.url });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
