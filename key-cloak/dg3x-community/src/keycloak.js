import Keycloak from 'keycloak-js';

const REACT_APP_KEYCLOAK_URL = process.env.REACT_APP_KEYCLOAK_URL;
const REACT_APP_KEYCLOAK_REALM = process.env.REACT_APP_KEYCLOAK_REALM;
const REACT_APP_KEYCLOAK_CLIENT_ID = process.env.REACT_APP_KEYCLOAK_CLIENT_ID;

const keycloak = new Keycloak({
  url: REACT_APP_KEYCLOAK_URL,
  realm: REACT_APP_KEYCLOAK_REALM,
  clientId: REACT_APP_KEYCLOAK_CLIENT_ID,
});

export default keycloak;
