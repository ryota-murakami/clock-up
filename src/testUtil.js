import React from 'react'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { MemoryRouter } from 'react-router'

/**
 * @see https://github.com/apollographql/react-apollo/blob/master/test/react-web/client/ApolloProvider.test.tsx
 */
export function apolloWarapper(Component) {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new ApolloLink((o, f) => f(o))
  })

  return (
    <ApolloProvider client={client}>
      <Component />
    </ApolloProvider>
  )
}

/**
 * @see https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/testing.md#context
 */
export function memoryRouterHOC(Component) {
  return class extends React.Component {
    render() {
      return (
        <MemoryRouter>
          <Component {...this.props} />
        </MemoryRouter>
      )
    }
  }
}
