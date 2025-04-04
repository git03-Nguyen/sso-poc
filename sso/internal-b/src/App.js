import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Logout from './pages/Logout';
import OAuthCallback from './pages/OAuthCallback';

const App = () => {
  return (
    <>
      <h2>Internal B</h2>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Navigate to="/profile" />} />
          <Route path="/auth/zoho/callback" element={<OAuthCallback />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
