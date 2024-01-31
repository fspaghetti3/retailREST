import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    let navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Login attempt:', { email, password }); // Log login attempt
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('Login error:', data.message);
                setError(data.message);
                return;
            }

            console.log('Login successful:', data);
            localStorage.setItem('token', data.token);


            onLogin(data.userId);
            navigate('/'); // Navigate to home on successful login
        } catch (err) {
            console.error('Request failed:', err);
            setError('Login request failed. Please try again.');
        }
    };

    const handleCreateAccount = () => {
        navigate('/create-account');
    };

    const goToHome = () => {
        navigate('/');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <button type="submit">Login</button>
                <button type="button" onClick={handleCreateAccount}>Create Account</button>
                {error && <div>{error}</div>}
            </form>
        </div>
    );
};

export default Login;