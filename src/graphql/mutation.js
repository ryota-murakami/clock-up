import gql from 'graphql-tag'

export const CreateUserMutation = gql`
  mutation CreateUserMutation($idToken: String!) {
    createUser(authProvider: { auth0: { idToken: $idToken } }) {
      id
    }
  }
`
