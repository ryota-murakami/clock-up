import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider, graphql } from 'react-apollo'

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.graph.cool/simple/v1/cj9fb5po51o070117u0p3z4s0'
  }),
  cache: new InMemoryCache().restore({})
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
registerServiceWorker()
