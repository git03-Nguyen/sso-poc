import React, { useEffect } from 'react';

const Login = () => {
  const ZOHO_CLIENT_ID = process.env.REACT_APP_ZOHO_CLIENT_ID;
  const ZOHO_REDIRECT_URI = process.env.REACT_APP_ZOHO_REDIRECT_URI;
  const ZOHO_AUTH_URL = process.env.REACT_APP_ZOHO_AUTH_URL;
  const ZOHO_SCOPES = process.env.REACT_APP_ZOHO_SCOPES;

  useEffect(() => {
    console.log('Login Component Mounted');
  });

  return (
    <div>
      <h1>Login</h1>
      <a href={`${ZOHO_AUTH_URL}?response_type=code&client_id=${ZOHO_CLIENT_ID}&redirect_uri=${encodeURIComponent(ZOHO_REDIRECT_URI)}&scope=${encodeURIComponent(ZOHO_SCOPES)}`}>
        <button>Login with Zoho</button>
      </a>
    </div>
  );
};

export default Login;
