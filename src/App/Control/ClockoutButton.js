// @flow
import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { fetchUserQuery } from '../../common/GraphQL'
import { Button } from '../../common/components/Button'
import { red } from '../../common/CSS'

type Props = {
  data: Object,
  updateUser: Function,
  updateClock: Function
}

export class ClockoutButton extends Component<Props> {
  recordClockoutTimeToGraphcool: Function

  constructor(props: Props) {
    super(props)
    this.recordClockoutTimeToGraphcool = this.recordClockoutTimeToGraphcool.bind(
      this
    )
  }

  recordClockoutTimeToGraphcool() {
    const { data, updateUser, updateClock } = this.props

    const userId = data.user.id
    const clockOut = () => new Date().toISOString()

    updateUser({
      variables: { userId },
      refetchQueries: [{ query: fetchUserQuery }]
    }).then(response => {
      // TODO console.log()
      console.log(response)
    })

    updateClock({
      variables: {
        clockId: data.user.clocks[0].id,
        userId: userId,
        clockOut: clockOut()
      }
    }).then(response => {
      // TODO console.log()
      console.log(response)
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
