import React from 'react';
import keycloak from '../keycloak';

const Profile = () => {
  const tokenParsed = keycloak.tokenParsed;

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Email: {tokenParsed?.email || 'No email found'}</p>
      <button onClick={() => keycloak.logout()}>Logout</button>
    </div>
  );
};

export default Profile;
