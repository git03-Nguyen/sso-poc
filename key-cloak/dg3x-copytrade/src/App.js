import React, { useEffect, useState } from 'react';
import keycloak from './keycloak';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Logout from './pages/Logout';

const App = () => {
  const [keycloakReady, setKeycloakReady] = useState(false);

  useEffect(() => {

    keycloak.init({ onLoad: 'check-sso', checkLoginIframe: false }).then((authenticated) => {
      setKeycloakReady(true);
    });
  }, []);

  if (!keycloakReady) return <div>Initializing SSO...</div>;

  return (
    <>
      <h1>CopyTrade</h1>
      <Router>
        <Routes>
          <Route path="/login" element={!keycloak.authenticated ? <Login /> : <Navigate to="/profile" />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/profile" element={keycloak.authenticated ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
