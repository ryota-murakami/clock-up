import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import CreateUser from './CreateUser'
import Login from './Login'
import Auth0Lock from 'auth0-lock'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider } from 'react-apollo'
import { ApolloLink } from 'apollo-link'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware
} from 'react-router-redux'
import { AUTH0_ID_TOKEN } from './common/const'
import './index.css'
import appReducer from './App/appReducer'
import registerServiceWorker from './registerServiceWorker'

// react-router
const history = createHistory()
const middleware = routerMiddleware(history)

// redux
const store = createStore(
  combineReducers({
    router: routerReducer,
    app: appReducer
  }),
  compose(
    applyMiddleware(middleware),
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )
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
      <ConnectedRouter history={history}>
        <div>
          <Route exact path="/" component={App} />
          <Route path="/login" component={() => <Login lock={lock} />} />
          <Route path="/createuser" component={CreateUser} />
        </div>
      </ConnectedRouter>
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
