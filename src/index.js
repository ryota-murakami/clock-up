import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import CreateUser from './CreateUser'
import Login from './Login'
import registerServiceWorker from './registerServiceWorker'
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
import { AUTH0_ID_TOKEN } from './GlobalConst'
import './GlobalCSS'

// react-router
const history = createHistory()
const middleware = routerMiddleware(history)

// redux
const store = createStore(
  combineReducers({
    router: routerReducer
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
  operation.setContext({
    headers: {
      authorization:
        'Bearer ' + window.localStorage.getItem(AUTH0_ID_TOKEN) || null
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

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <ConnectedRouter history={history}>
        <div>
          <Route exact path="/" component={App} />
          <Route
            path="/login"
            component={() => {
              return (
                <Login
                  clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
                  domain={process.env.REACT_APP_AUTH0_DOMAIN}
                />
              )
            }}
          />
          <Route path="/createuser" component={CreateUser} />
        </div>
      </ConnectedRouter>
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
