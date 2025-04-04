import React from 'react';
import keycloak from '../keycloak';

const Login = () => {
  const handleLogin = () => {
    keycloak.login(); // this redirects to Keycloak
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
