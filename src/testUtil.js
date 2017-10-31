import React from 'react'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'

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
