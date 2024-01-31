import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cartItems, removeFromCart, updateQuantity }) => {
    const navigate = useNavigate();

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const createPaymentIntent = async () => {
        const amount = calculateTotal();
    
        try {
            const response = await fetch('/api/stripe/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cartItems }) // Send the cart items to the server
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const { url } = await response.json();
            window.location.href = url; // Redirect to Stripe's checkout page
        } catch (error) {
            console.error('Error during checkout:', error);
            // Handle error in UI
        }
    };
    
    return (
        <div>
            <h2>Shopping Cart</h2>
            <ul>
                {cartItems.map(item => (
                    <li key={item.id}>
                        {item.name} - ${item.price} x {item.quantity}
                        <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                        <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                        <button onClick={() => removeFromCart(item.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <div>Total: ${calculateTotal().toFixed(2)}</div>
            <button onClick={createPaymentIntent}>Proceed to Checkout</button>
        </div>
    );
};

export default Cart;