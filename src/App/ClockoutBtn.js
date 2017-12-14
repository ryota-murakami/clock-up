// @flow
import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { fetchUserQuery } from '../graphql'

type Props = {
  data: Object,
  mutation1: Function,
  mutation2: Function
}

export class ClockoutBtn extends Component<Props> {
  constructor(props: Props) {
    super(props)
    this.recordClockoutTimeToGraphcool = this.recordClockoutTimeToGraphcool.bind(
      this
    )
  }

  recordClockoutTimeToGraphcool() {
    const { data, mutation1, mutation2 } = this.props

    const userId = data.user.id
    const clockOut = () => new Date().toISOString()

    mutation1({
      variables: { userId },
      refetchQueries: [{ query: fetchUserQuery }]
    }).then(response => {
      // TODO console.log()
      console.log(response)
    })

    mutation2({
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
        onClick={this.recordClockoutTimeToGraphcool}
        data-test="clock-out-btn"
      >
        clock out
      </Button>
    )
  }
}

const Button = styled.div`
  width: 70px;
  color: #ffffff;
  font-size: 1em;
  background-color: #e57373;
  line-height: 28px;
  padding: 0.25em 1em;
  border: 2px solid #e57373;
  border-radius: 3px;
  cursor: pointer;
`

const mutation1 = gql`
  mutation($userId: ID!) {
    updateUser(id: $userId, isDuringClockIn: false) {
      isDuringClockIn
    }
  }
`

const mutation2 = gql`
  mutation($clockId: ID!, $userId: ID, $clockOut: DateTime) {
    updateClock(id: $clockId, userId: $userId, clockOut: $clockOut) {
      id
      clockIn
      clockOut
    }
  }
`

export default compose(
  graphql(mutation1, {
    name: 'mutation1'
  }),
  graphql(mutation2, {
    name: 'mutation2'
  })
)(ClockoutBtn)
