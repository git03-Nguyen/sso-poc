import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log('Profile component mounted');

    const idToken = Cookies.get('zoho_id_token');
    console.log('ID Token:', idToken);

    if (!idToken) {
      // No id_token found, redirect to login page
      window.location.href = '/login';
      return;
    }

    try {
      // Decode the id_token to extract user information
      const decodedToken = jwtDecode(idToken);
      const userData = {
        sub: decodedToken.sub,
        email: decodedToken.email,
        firstName: decodedToken.given_name,
        lastName: decodedToken.family_name
      };

      setUser(userData);
    } catch (error) {
      // Invalid token, redirect to login
      window.location.href = '/login';
    }
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, {user.firstName} {user.lastName}</h2>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={() => window.location.href = '/logout'}>Logout</button>
    </div>
  );
};

export default Profile;
