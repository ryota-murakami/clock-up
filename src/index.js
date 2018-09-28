import React from 'react'
import ReactDOM from 'react-dom'
import Loadable from 'react-loadable'
import Auth0Lock from 'auth0-lock'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider } from 'react-apollo'
import { ApolloLink } from 'apollo-link'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './index.css.js'
import reducer from './reducer'
import registerServiceWorker from './registerServiceWorker'
import { AUTH0_ID_TOKEN } from './constants'
import ErrorBoudary from './pages/Error/ErrorBoudary'
import Loading from './components/Loading'

// react-loadable
const App = Loadable({
  loader: () => import('./pages/App' /* webpackChunkName: "App" */),
  loading: ({ isLoading }) => isLoading && Loading
})

const CreateUser = Loadable({
  loader: () =>
    import('./pages/CreateUser' /* webpackChunkName: "CreateUser" */),
  loading: ({ isLoading }) => isLoading && Loading
})

const Login = Loadable({
  loader: () => import('./pages/Login' /* webpackChunkName: "Login" */),
  loading: ({ isLoading }) => isLoading && Loading
})

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
    ? 'http://localhost:3000'
    : 'https://clockup.malloc.tokyo'
const option = {
  auth: {
    redirectUrl: redirectUrl
  }
}
const lock = new Auth0Lock(clientId, domain, option)

ReactDOM.render(
  <ErrorBoudary>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={App} />
            <Route path="/login" component={() => <Login lock={lock} />} />
            <Route path="/createuser" component={CreateUser} />
          </Switch>
        </BrowserRouter>
      </ApolloProvider>
    </Provider>
  </ErrorBoudary>,
  document.getElementById('root')
)

registerServiceWorker()
