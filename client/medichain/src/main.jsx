import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
        domain='dev-e8yp6sp464fgsn24.us.auth0.com'
        clientId='R8fkPduEfZJzTI3MDh9StZ4fYC45RCdL'
        authorizationParams={{
          redirect_uri: 'http://localhost:5173/dashboard'
        }}
      >
        <App />
    </Auth0Provider>
  </React.StrictMode>,
)
