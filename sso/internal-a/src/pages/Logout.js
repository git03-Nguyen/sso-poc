import { useEffect } from 'react';

const Logout = () => {
  useEffect(() => {
    const AUTH_SERVER_URL = process.env.REACT_APP_AUTH_SERVER_URL;

    fetch(`${AUTH_SERVER_URL}/auth/zoho/logout`, {
      method: 'POST',
      credentials: 'include', // Send cookies with the request
    })
      .then((response) => {
        if (response.ok) {
          console.log('Logout successful');
        } else {
          console.error('Logout failed');
        }
      })
      .catch((error) => console.error('Error during logout:', error))
      .finally(() => {
        // Redirect to login page
        window.location.href = '/login';
      });
  }, []);

  return <div>Logging out...</div>;
};

export default Logout;
