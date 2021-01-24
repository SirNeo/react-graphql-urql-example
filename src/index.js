import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import App from './domains/App'

import { Provider, Client, dedupExchange, fetchExchange } from 'urql'
import { cacheExchange } from '@urql/exchange-graphcache'

import { getToken } from './components/Token'

const cache = cacheExchange({})

const client = new Client({
  url: 'http://localhost:8080/api/',
  exchanges: [dedupExchange, cache, fetchExchange],
  requestPolicy: 'network-only',
  fetchOptions: () => {
    const token = getToken()
    return {
      headers: { 
        authorization: token ? `Bearer ${token}` : '',
        Prueba: 'palma'
      }
    }
  },
})

ReactDOM.render(
  <Provider value={client}>
    <App />
  </Provider>,
  document.getElementById('root')
)