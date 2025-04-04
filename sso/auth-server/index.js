const express = require('express');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ID = process.env.ZOHO_CLIENT_ID;
const CLIENT_SECRET = process.env.ZOHO_CLIENT_SECRET;
const ZOHO_REDIRECT_URL = process.env.ZOHO_REDIRECT_URL;
const ZOHO_AUTH_URL = process.env.ZOHO_AUTH_URL;
const ZOHO_TOKEN_URL = process.env.ZOHO_TOKEN_URL;
const ZOHO_REVOKE_URL = process.env.ZOHO_REVOKE_URL;
const ZOHO_SCOPES = process.env.ZOHO_SCOPES;

const URL_INTERNAL_A = process.env.URL_INTERNAL_A;
const URL_INTERNAL_B = process.env.URL_INTERNAL_B;

app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: [URL_INTERNAL_A, URL_INTERNAL_B], credentials: true }));

function urlEncode(str) {
  return encodeURIComponent(str).replace(/%20/g, '+');
}

// Logout URL
app.post('/auth/zoho/logout', (req, res) => {
  const token = req.cookies.zoho_token;
  if (!token) return res.status(401).json({ error: 'Not authenticated' });

  axios.post(ZOHO_REVOKE_URL, new URLSearchParams({
    token,
  }))
    .then(() => {
      res.clearCookie('zoho_token', {
        maxAge: 0,
        domain: '.backoffice.com',
      });
      res.clearCookie('zoho_id_token', {
        maxAge: 0,
        domain: '.backoffice.com',
      });
      console.log('Logout successful, redirecting to internal app...');
      res.status(200).json({ message: 'Logout successful' });
    })
    .catch(error => {
      console.error('Logout error:', error);
      res.status(500).json({ error: 'Logout failed' });
    });
});

// Login URL
app.get('/auth/zoho/login', (req, res) => {
  const authUrl = `${ZOHO_AUTH_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${urlEncode(ZOHO_REDIRECT_URL)}&scope=${urlEncode(ZOHO_SCOPES)}&prompt=consent`;
  res.redirect(authUrl);
});

// OAuth Callback
app.post('/auth/zoho/callback', async (req, res) => {
  const { code, redirect_uri } = req.query;
  console.log("Callback Code:", code);
  console.log("Callback Redirect URI:", redirect_uri);
  if (!code) {
    return res.status(400).json({ error: 'Authorization code is required' });
  }

  try {
    const response = await axios.post(ZOHO_TOKEN_URL, new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code'
    }));

    console.log('Token Response:', response.data);

    const { access_token, refresh_token, id_token } = response.data;
    console.log('Access Token:', access_token);
    console.log('ID Token:', id_token);
    console.log('Refresh Token:', refresh_token);

    // Set cookie for SSO
    res.cookie('zoho_token', access_token, {
      maxAge: 3600000, // 1 hour
      domain: '.backoffice.com',
    });

    res.cookie('zoho_id_token', id_token, {
      maxAge: 3600000, // 1 hour
      domain: '.backoffice.com',
    });

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'OAuth failed' });
  }
});

app.listen(PORT, () => console.log(`SSO Server running on http://localhost:${PORT}`));