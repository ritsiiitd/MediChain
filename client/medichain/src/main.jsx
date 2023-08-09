import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';
import { ThirdwebProvider } from '@thirdweb-dev/react'
import { StateContextProvider } from './context';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThirdwebProvider
    activeChain="goerli"
    clientId='3ab6716be21a21b3d32b3903936e1ecf'>

      <Auth0Provider
          domain='dev-e8yp6sp464fgsn24.us.auth0.com'
          clientId='R8fkPduEfZJzTI3MDh9StZ4fYC45RCdL'
          authorizationParams={{
            redirect_uri: 'http://localhost:5173/dashboard'
          }}
          >
          <StateContextProvider>
            <App />
          </StateContextProvider>
      </Auth0Provider>

    </ThirdwebProvider>
  </React.StrictMode>,
)
