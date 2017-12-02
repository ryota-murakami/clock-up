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
  clockInMutation2: Function,
  clockOutMutation1: Function,
  clockOutMutation2: Function
}

export class App extends Component<Props> {
  logout = () => {
    window.localStorage.removeItem(AUTH0_ID_TOKEN)
    window.location.reload()
  }

  isAuthenticated() {
    const { data } = this.props

    if (data.user) {
      return true
    } else {
      return false
    }
  }

  clockIn = () => {
    const { data, clockInMutation1, clockInMutation2 } = this.props

    const userId = data.user.id
    const clockIn = () => new Date().toISOString()

    clockInMutation1({
      variables: { userId },
      refetchQueries: [{ query: userQuery }]
    }).then(response => {
      console.log(response)
    })

    clockInMutation2({
      variables: { userId: userId, clockIn: clockIn() }
    }).then(response => {
      console.log(response)
    })
  }

  clockOut = () => {
    const { data, clockOutMutation1, clockOutMutation2 } = this.props

    const userId = data.user.id
    const clockOut = () => new Date().toISOString()

    clockOutMutation1({
      variables: { userId },
      refetchQueries: [{ query: userQuery }]
    }).then(response => {
      console.log(response)
    })

    clockOutMutation2({
      variables: {
        clockId: data.user.clocks[0].id,
        userId: userId,
        clockOut: clockOut()
      }
    }).then(response => {
      console.log(response)
    })
  }

  render() {
    const { data } = this.props

    if (data.loading) {
      return <div>Loading</div>
    }

    if (!this.isAuthenticated()) {
      return <Redirect to="/login" />
    }

    return (
      <div>
        <span onClick={this.logout} data-test="logout-btn">
          Logout
        </span>
        {!data.user.isDuringClockIn ? (
          <button onClick={this.clockIn} data-test="clock-in-btn">
            clock in
          </button>
        ) : (
          <button onClick={this.clockOut} data-test="clock-out-btn">
            clock out
          </button>
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
      clocks(last: 1) {
        id
      }
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

const clockOutMutation2 = gql`
  mutation($clockId: ID!, $userId: ID, $clockOut: DateTime) {
    updateClock(id: $clockId, userId: $userId, clockOut: $clockOut) {
      id
      clockIn
      clockOut
    }
  }
`

const clockOutMutation1 = gql`
  mutation($userId: ID!) {
    updateUser(id: $userId, isDuringClockIn: false) {
      isDuringClockIn
    }
  }
`

export default graphql(clockOutMutation1, {
  name: 'clockOutMutation1',
  notifyOnNetworkStatusChange: true
})(
  graphql(clockOutMutation2, {
    name: 'clockOutMutation2',
    notifyOnNetworkStatusChange: true
  })(
    graphql(clockInMutation1, {
      name: 'clockInMutation1',
      notifyOnNetworkStatusChange: true
    })(
      graphql(clockInMutation2, {
        name: 'clockInMutation2',
        notifyOnNetworkStatusChange: true
      })(
        graphql(userQuery, {
          options: {
            fetchPolicy: 'network-only',
            notifyOnNetworkStatusChange: true,
            options: { pollInterval: 1000 }
          }
        })(withRouter(App))
      )
    )
  )
)
