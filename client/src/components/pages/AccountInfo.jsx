import React, { useState } from 'react';

const AccountInfo = ({ userId }) => {
    const [userDetails, setUserDetails] = useState(null);
    const [error, setError] = useState('');

    const fetchUserDetails = () => {
        console.log('User ID in AccountInfo:', userId);
    
        fetch(`/api/user/${userId}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('User not found');
                } else if (response.status === 401) {
                    throw new Error('Unauthorized access');
                } else if (response.status === 500) {
                    throw new Error('Internal server error');
                } else {
                    throw new Error('Network response was not ok');
                }
            }
            return response.json();
        })
        .then(data => {
            setUserDetails(data);
        })
        .catch(error => {
            setError(`Error: ${error.message}`);
            console.error('There was an error!', error);
        });
    };

    console.log('User ID in AccountInfo:', userId);


    return (
        <div>
            <button onClick={fetchUserDetails}>Load Account Details</button>
            {error && <p>Error: {error}</p>}
            {userDetails && (
                <div>
                    <p>Email: {userDetails.email}</p>
                    <p>Account Created: {new Date(userDetails.createdAt).toLocaleDateString()}</p>
                </div>
            )}
        </div>
    );
};

export default AccountInfo;