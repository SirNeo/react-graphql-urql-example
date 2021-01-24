import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import App from './domains/App'

import { Provider, Client, dedupExchange, fetchExchange } from 'urql'
import { cacheExchange } from '@urql/exchange-graphcache'

const cache = cacheExchange({})

var headers = { 'Access-Control-Allow-Origin': '*' };

const client = new Client({
  url: 'http://localhost:8080/api/',
  exchanges: [dedupExchange, cache, fetchExchange],
  requestPolicy: 'network-only',
  fetchOptions: () => {
    return {
      headers: { headers },
    };
  },
})

ReactDOM.render(
  <Provider value={client}>
    <App />
  </Provider>,
  document.getElementById('root')
)