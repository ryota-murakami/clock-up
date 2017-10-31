// @flow
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import LoginAuth0 from './LoginAuth0'
import { AUTH0_ID_TOKEN } from '../GlobalConst'

type Props = {
  data: any
}

class App extends Component<Props> {
  _logout = () => {
    window.localStorage.removeItem(AUTH0_ID_TOKEN)
    window.location.reload()
  }

  _isLoggedIn = () => {
    return this.props.data.user
  }

  render() {
    if (this.props.data.loding) {
      return <div>Loading</div>
    }

    if (this._isLoggedIn()) {
      return this.renderLoggedIn()
    } else {
      return this.renderAuth0()
    }
  }

  renderLoggedIn() {
    return (
      <div>
        <span onClick={this._logout}>Logout</span>
      </div>
    )
  }

  renderAuth0() {
    return <LoginAuth0 />
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
