import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import App from './domains/App'

import { Provider, Client, dedupExchange, fetchExchange } from 'urql'
import { cacheExchange } from '@urql/exchange-graphcache'
import { authExchange } from '@urql/exchange-auth';

import { Auth0Provider } from "@auth0/auth0-react";
import config from "./auth_config.json";
//import history from "./utils/history.js";

// import AuthExchange from './components/Authentication'

const cache = cacheExchange({})

const client = new Client({
  url: 'http://localhost:8080/api/',
  exchanges: [
    dedupExchange, 
    cache, 
    fetchExchange,
    authExchange({
    //  AuthExchange
    }),],
  requestPolicy: 'network-only'
})

const onRedirectCallback = (appState) => {
  console.log('callback');
  console.log('appSate:'); 
  console.log(appState);
  // history.push(
  //   appState && appState.returnTo
  //     ? appState.returnTo
  //     : window.location.pathname
  // );
}

ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    clientId={config.clientId}
    // audience={config.audience}
    redirectUri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    <Provider value={client}>
      <App />
    </Provider>
  </Auth0Provider>
  ,
  document.getElementById('root')
)