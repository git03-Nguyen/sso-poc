import React from 'react';
import keycloak from '../keycloak';

const Profile = () => {
  const tokenParsed = keycloak.tokenParsed;

  const REACT_APP_KEYCLOAK_CLIENT_ID = process.env.REACT_APP_KEYCLOAK_CLIENT_ID;
  const email = tokenParsed?.email || 'No email found';
  const username = tokenParsed?.preferred_username || 'No username found';
  const firstName = tokenParsed?.given_name || 'No first name found';
  const lastName = tokenParsed?.family_name || 'No last name found';
  const roles = tokenParsed?.realm_access?.roles || [];
  const clientRoles = tokenParsed?.resource_access?.[REACT_APP_KEYCLOAK_CLIENT_ID]?.roles || [];

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Email: {email}</p>
      <p>Username: {username}</p>
      <p>First Name: {firstName}</p>
      <p>Last Name: {lastName}</p>

      <h3>Roles:</h3>
      {roles.length > 0 ? (
        <ul>
          {roles.map((role, index) => (
            <li key={index}>{role}</li>
          ))}
        </ul>
      ) : (
        <p>No realm roles assigned</p>
      )}

      <h3>Client Roles:</h3>
      {clientRoles.length > 0 ? (
        <ul>
          {clientRoles.map((role, index) => (
            <li key={index}>{role}</li>
          ))}
        </ul>
      ) : (
        <p>No client roles assigned</p>
      )}

      <button onClick={() => keycloak.logout()}>Logout</button>
    </div>
  );
};

export default Profile;
