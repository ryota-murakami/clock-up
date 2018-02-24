// @flow
import React from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { AUTH0_ID_TOKEN } from '../common/const'
import Loading from '../common/components/Loading'

type Props = {
  data: Object,
  createUser: Function
}

export class CreateUser extends React.Component<Props> {
  isNotExistUserInAuth0(): boolean {
    const { data } = this.props

    return !data.user || window.localStorage.getItem(AUTH0_ID_TOKEN) !== null
  }

  InsertUserDataToAuth0(): void {
    const { createUser } = this.props

    const variables = {
      idToken: window.localStorage.getItem(AUTH0_ID_TOKEN)
    }

    createUser({ variables }).catch(e => {
      if (
        e.message === 'GraphQL error: User already exists with that information'
      )
        return

      alert('error occurred when createUser')
    })
  }

  render() {
    const { data } = this.props

    if (data.loading) {
      return <Loading />
    }

    if (this.isNotExistUserInAuth0()) {
      this.InsertUserDataToAuth0()
    }

    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    )
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
  graphql(userQuery, {
    options: { fetchPolicy: 'network-only', notifyOnNetworkStatusChange: true }
  })(withRouter(CreateUser))
)
