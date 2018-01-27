// @flow
import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { Button } from '../../common/components/Button'
import { red } from '../../common/CSS'

// TODO define flow
type Props = {
  data: Object,
  updateUser: Function,
  updateClock: Object
}

export class ClockoutButton extends Component<Props> {
  recordClockoutTimeToGraphcool: Function

  constructor(props: Props) {
    super(props)
    this.recordClockoutTimeToGraphcool = this.recordClockoutTimeToGraphcool.bind(
      this
    )
  }

  recordClockoutTimeToGraphcool(): void {
    const { data, updateUser, updateClock } = this.props

    const userId = data.user.id
    const clockOut = () => new Date().toISOString()

    updateUser({
      variables: { userId }
    }).catch(() => {
      alert('error occurred when updateUser on clockout')
    })

    updateClock({
      variables: {
        clockId: data.user.clocks[0].id,
        userId: userId,
        clockOut: clockOut()
      }
    }).catch(() => {
      alert('error occurred when updateClock on clockout')
    })
  }

  render() {
    return (
      <Button
        primary
        color={red}
        onClick={this.recordClockoutTimeToGraphcool}
        data-test="clock-out-btn"
      >
        clock out
      </Button>
    )
  }
}

const updateUser = gql`
  mutation($userId: ID!) {
    updateUser(id: $userId, isDuringClockIn: false) {
      isDuringClockIn
    }
  }
`

const updateClock = gql`
  mutation($clockId: ID!, $userId: ID, $clockOut: DateTime) {
    updateClock(id: $clockId, userId: $userId, clockOut: $clockOut) {
      id
      clockIn
      clockOut
    }
  }
`

export default compose(
  graphql(updateUser, {
    name: 'updateUser'
  }),
  graphql(updateClock, {
    name: 'updateClock'
  })
)(ClockoutButton)
