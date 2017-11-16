// @flow
import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { AUTH0_ID_TOKEN } from '../GlobalConst'

type Props = {
  data: any,
  // withRouter()
  match: any,
  location: any,
  history: any
}

class App extends Component<Props> {
  logout = () => {
    window.localStorage.removeItem(AUTH0_ID_TOKEN)
    window.location.reload()
  }

  isAuthenticated() {
    if (this.props.data.user) {
      return true
    } else {
      return false
    }
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading</div>
    }

    if (!this.isAuthenticated()) {
      return <Redirect to="/signin" />
    }

    return (
      <div>
        <span onClick={this.logout}>Logout</span>
        {!this.props.data.user.isDuringClockIn ? (
          <button>clock in</button>
        ) : (
          <button>clock out</button>
        )}
      </div>
    )
  }
}

const userQuery = gql`
  query {
    user {
      id
      isDuringClockIn
    }
  }
`

export default graphql(userQuery, { options: { fetchPolicy: 'network-only' } })(
  withRouter(App)
)
