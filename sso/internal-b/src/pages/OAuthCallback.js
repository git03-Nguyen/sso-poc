import React, { useEffect } from 'react';

const OAuthCallback = () => {
  useEffect(() => {
    console.log('OAuthCallback Component Mounted');
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    // Now send the code to the backend to exchange for the access token
    const AUTH_SERVER_URL = process.env.REACT_APP_AUTH_SERVER_URL;
    const REDIRECT_URI = process.env.REACT_APP_ZOHO_REDIRECT_URI;
    const redirectUri = encodeURIComponent(REDIRECT_URI);
    fetch(`${AUTH_SERVER_URL}/auth/zoho/callback?code=${code}&redirect_uri=${redirectUri}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then((data) => {
        // Handle the data returned from the server
        console.log('OAuth Callback Data:', data);
        window.location.href = '/profile'; // Redirect to the profile page after successful login
      })
      .catch((error) => {
        console.error('Error during OAuth callback:', error);
        window.location.href = '/login'; // Redirect to login on error
      });

  }, []);

  return <div>Loading...</div>;
};

export default OAuthCallback;
