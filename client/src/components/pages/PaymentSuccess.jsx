import React from 'react';
import { useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
    const location = useLocation();

    // Assuming you pass the necessary details via location state or query parameters
    const { paymentIntentId, amount } = location.state || {};

    return (
        <div>
            <h2>Payment Successful</h2>
            {paymentIntentId ? (
                <div>
                    <p>Payment ID: {paymentIntentId}</p>
                    <p>Amount Paid: ${amount / 100}</p> {/* Convert to dollars if amount is in cents */}
                    {/* Display more payment details as needed */}
                </div>
            ) : (
                <p>Loading payment details...</p>
            )}
        </div>
    );
};

export default PaymentSuccess;