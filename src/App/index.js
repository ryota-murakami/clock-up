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
  history: any,
  clockInMutation1: Function,
  clockInMutation2: Function
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

  clockIn = () => {
    const { data, clockInMutation1, clockInMutation2 } = this.props

    const userId = data.user.id
    const clockIn = () => new Date().toISOString()

    clockInMutation1({ variables: { userId } }).then(response => {
      console.log(response)
    })

    clockInMutation2({
      variables: { userId: userId, clockIn: clockIn() }
    }).then(response => {
      console.log(response)
    })
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
          <button onClick={this.clockIn}>clock in</button>
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

const clockInMutation2 = gql`
  mutation($userId: ID!, $clockIn: DateTime) {
    createClock(userId: $userId, clockIn: $clockIn) {
      id
      clockIn
      clockOut
    }
  }
`

const clockInMutation1 = gql`
  mutation($userId: ID!) {
    updateUser(id: $userId, isDuringClockIn: true) {
      isDuringClockIn
    }
  }
`

export default graphql(clockInMutation1, { name: 'clockInMutation1' })(
  graphql(clockInMutation2, { name: 'clockInMutation2' })(
    graphql(userQuery, { options: { fetchPolicy: 'network-only' } })(
      withRouter(App)
    )
  )
)
