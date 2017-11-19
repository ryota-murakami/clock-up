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
          <button onClick={this.clockOut}>clock out</button>
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
