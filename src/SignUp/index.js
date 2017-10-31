import React from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { AUTH0_ID_TOKEN } from '../GlobalConst'

type Props = {
  data: any
}

class CreateUser extends React.Component<Props> {
  render() {
    if (this.props.data.loading) {
      return <div>Loading</div>
    }

    // redirect if user is logged in or did not finish Auth0 Lock dialog
    if (
      this.props.data.user ||
      window.localStorage.getItem(AUTH0_ID_TOKEN) === null
    ) {
      console.warn('not a new user or already logged in')
      return (
        <Redirect
          to={{
            pathname: '/'
          }}
        />
      )
    }

    return (
      <div>
        <div>
          <button onClick={this.createUser}>Sign up</button>
        </div>
      </div>
    )
  }

  createUser = () => {
    const variables = {
      idToken: window.localStorage.getItem(AUTH0_ID_TOKEN)
    }

    this.props
      .createUser({ variables })
      .then(response => {
        this.props.history.replace('/')
      })
      .catch(e => {
        console.error(e)
        this.props.history.replace('/')
      })
  }
}

const createUser = gql`
  mutation($idToken: String!) {
    createUser(authProvider: { auth0: { idToken: $idToken } }) {
      id
    }
  }
`

const userQuery = gql`
  query {
    user {
      id
    }
  }
`

export default graphql(createUser, { name: 'createUser' })(
  graphql(userQuery, { options: { fetchPolicy: 'network-only' } })(
    withRouter(CreateUser)
  )
)
