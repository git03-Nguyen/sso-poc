import React, { useEffect } from 'react';
import keycloak from '../keycloak';

const Logout = () => {
  useEffect(() => {
    keycloak.logout({ redirectUri: window.location.origin + '/login' });
  }, []);

  return <div>Logging out...</div>;
};

export default Logout;
