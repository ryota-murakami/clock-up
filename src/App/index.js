// @flow
import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Loading from '../components/Loading'
import CurrentDateTime from './CurrentDateTime'
import LogoutBtn from './LogoutBtn'
import styled from 'styled-components'
import History from './History'
import { ClockoutBtn } from './ClockoutBtn'

type Props = {
  data: Object,
  // withRouter()
  match: any,
  location: any,
  history: any,
  // graphql()
  clockInMutation1: Function,
  clockInMutation2: Function
}

export class App extends Component<Props> {
  isAuthenticated(): boolean {
    const { data } = this.props

    return !!data.user
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

  /**
   * @param str ISOString. e.g. '2017-12-10T14:31:10.501Z'
   * @returns {string} human readable string. e.g. '11:31 PM'
   */
  formatDate(str: string): string {
    const dateObj = new Date(str)

    const options = {
      hour: '2-digit',
      minute: '2-digit'
    }

    return dateObj.toLocaleTimeString('en-us', options)
  }

  render() {
    const { data } = this.props

    if (data.loading) {
      return <Loading />
    }

    if (!this.isAuthenticated()) {
      return <Redirect to="/login" />
    }

    return (
      <Main>
        <CurrentDateTime />
        <LogoutBtn />
        {data.user.isDuringClockIn ? (
          <div>
            <ClockoutBtn />
            <div data-test="clock-in-time">
              {this.formatDate(data.user.clocks[0].clockIn)}
            </div>
          </div>
        ) : (
          <button onClick={this.clockIn} data-test="clock-in-btn">
            clock in
          </button>
        )}
        <History />
      </Main>
    )
  }
}

const Main = styled.main``

const userQuery = gql`
  query {
    user {
      id
      isDuringClockIn
      clocks(last: 1) {
        id
        clockIn
        clockOut
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

export default graphql(clockInMutation1, {
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
