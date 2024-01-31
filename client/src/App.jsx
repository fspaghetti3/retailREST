import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Products from './components/Products';
import Cart from './components/Cart';
import Login from './components/pages/Login';
import CreateAccount from './components/pages/CreateAccount';
import AccountInfo from './components/pages/AccountInfo';
import PaymentSuccess from './components/pages/PaymentSuccess';
import PaymentInfo from './components/pages/PaymentInfo';

const stripePromise = loadStripe('pk_test_51OJevYJlq2w2yV3KDC91sgpY2TtPdzjs4PcjlCUAFuXfe7aSg4QbsYAbobEjrGKNgnimWXsMnZEufTEEEtvxeyZM003VVtfHvY');


function App() {
    const [cartItems, setCartItems] = useState([]);
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);

    const addToCart = (product) => {
        setCartItems(currentItems => {
            const existingItem = currentItems.find(item => item._id === product._id);
            if (existingItem) {
                return currentItems.map(item =>
                    item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...currentItems, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(currentItems => currentItems.filter(item => item._id !== productId));
    };

    const updateQuantity = (productId, amount) => {
        setCartItems(currentItems => currentItems.map(item => {
            if (item._id === productId) {
                const updatedQuantity = item.quantity + amount;
                return { ...item, quantity: Math.max(0, updatedQuantity) };
            }
            return item;
        }));
    };

    const handleLogin = (userId) => {
        console.log('Received User ID:', userId);
        setUserId(userId);
        setUser(true);
        console.log('User ID in App:', userId);
    };

    return (
        <Elements stripe={stripePromise}>
        <Router>
            <div>
                <Header />
                <nav>
                    <ul>
                        <li>
                            <Link to="/login" className="login-button">Login</Link>
                        </li>
                        <li>
                        <Link to="/" className="home-button">Home</Link>
                        </li>
                        {user && (
                            <li>
                                <Link to="/account">Account</Link>
                            </li>
                        )}
                    </ul>
                </nav>
                <Routes>
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/create-account" element={<CreateAccount />} />
                    <Route path="/account" element={user ? <AccountInfo userId={userId} /> : <Navigate replace to="/login" />} />
                    <Route path="/payment-success" element={<PaymentSuccess />} />
                    <Route path="/payment-info" element={<PaymentInfo />} />
                    <Route path="/" element={
                        <>
                            <Products addToCart={addToCart} />
                            <Cart cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
                        </>
                    } />
                </Routes>
                <Footer />
            </div>
        </Router>
        </Elements>
    );
}

export default App;