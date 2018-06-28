import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import App from './pages/App'
import CreateUser from './pages/CreateUser'
import Login from './pages/Login'
import Auth0Lock from 'auth0-lock'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider } from 'react-apollo'
import { ApolloLink } from 'apollo-link'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import './index.css.js'
import reducer from './reducer'
import registerServiceWorker from './registerServiceWorker'
import { AUTH0_ID_TOKEN } from './dataTypes'

// redux
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

// apollo-client
const middlewareLink = new ApolloLink((operation, forward) => {
  const auth0IdToken = window.localStorage.getItem(AUTH0_ID_TOKEN)
  operation.setContext({
    headers: {
      authorization: 'Bearer ' + auth0IdToken || null
    }
  })
  return forward(operation)
})
const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHCOOL_ENDPOINT
})
const link = middlewareLink.concat(httpLink)
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache().restore({})
})

// auth0
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID
const domain = process.env.REACT_APP_AUTH0_DOMAIN
const redirectUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/login'
    : 'https://clockup.malloc.tokyo/login'
const option = {
  auth: {
    redirectUrl: redirectUrl
  }
}
const lock = new Auth0Lock(clientId, domain, option)

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Fragment>
          <Route exact path="/" component={App} />
          <Route path="/login" component={() => <Login lock={lock} />} />
          <Route path="/createuser" component={CreateUser} />
        </Fragment>
      </BrowserRouter>
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
