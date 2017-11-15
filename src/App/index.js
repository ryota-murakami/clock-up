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
    return this.props.data.user
  }

  // TODO to be later
  isDuringClockIn() {
    return false
  }

  render() {
    if (this.props.data.loding) {
      return <div>Loading</div>
    }

    if (this.props.data.loding && !this.isAuthenticated()) {
      return <Redirect to="/signin" />
    }

    return (
      <div>
        <span onClick={this.logout}>Logout</span>
        <div>{this.isDuringClockIn() ? 'clock out' : 'clock in'}</div>
      </div>
    )
  }
}

const userQuery = gql`
  query {
    user {
      id
    }
  }
`

export default graphql(userQuery, { options: { fetchPolicy: 'network-only' } })(
  withRouter(App)
)
