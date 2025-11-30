import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadUser } from '../../actions/userAction';

const OAuthCallback = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        const handleOAuthCallback = () => {
            const urlParams = new URLSearchParams(location.search);
            const token = urlParams.get('token');
            const success = urlParams.get('success');
            const error = urlParams.get('error');
            const isNewUser = urlParams.get('isNewUser') === 'true';

            console.log('OAuth Callback - Token received:', token ? 'Yes' : 'No');
            console.log('OAuth Callback - Success:', success);
            console.log('OAuth Callback - Error:', error);
            console.log('OAuth Callback - New User:', isNewUser);

            if (error) {
                console.error('OAuth authentication failed:', error);
                navigate('/login', { 
                    state: { error: 'Google authentication failed. Please try again.' },
                    replace: true
                });
                return;
            }

            if (success && token) {
                // Store the token in localStorage
                localStorage.setItem('token', token);
                console.log('Token stored in localStorage');
                
                // Dispatch loadUser to get user data
                dispatch(loadUser());
                
                // Show welcome message for new users
                if (isNewUser) {
                    navigate('/', { 
                        replace: true,
                        state: { message: 'Welcome! Your account has been created successfully.' }
                    });
                } else {
                    navigate('/', { 
                        replace: true,
                        state: { message: 'Successfully logged in with Google!' }
                    });
                }
            } else {
                // If no token or success, redirect to login
                navigate('/login', { 
                    replace: true,
                    state: { error: 'Authentication failed. Please try again.' }
                });
            }
        };

        handleOAuthCallback();
    }, [location, navigate, dispatch]);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Completing authentication...</p>
            </div>
        </div>
    );
};

export default OAuthCallback;