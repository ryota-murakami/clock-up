// @flow
import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { fetchUserQuery } from '../graphql'
import { Button } from '../components/Button'

type Props = {
  data: Object,
  mutation1: Function,
  mutation2: Function
}

export class ClockinBtn extends Component<Props> {
  constructor(props: Props) {
    super(props)
    this.recordClockinTimeToGraphcool = this.recordClockinTimeToGraphcool.bind(
      this
    )
  }

  recordClockinTimeToGraphcool() {
    const { data, mutation1, mutation2 } = this.props

    const userId = data.user.id
    const clockIn = () => new Date().toISOString()

    mutation1({
      variables: { userId },
      refetchQueries: [{ query: fetchUserQuery }]
    }).then(response => {
      console.log(response)
    })

    mutation2({
      variables: { userId: userId, clockIn: clockIn() }
    }).then(response => {
      console.log(response)
    })
  }

  render() {
    return (
      <MyButton
        onClick={this.recordClockinTimeToGraphcool}
        data-test="clock-in-btn"
      >
        Clock In
      </MyButton>
    )
  }
}

const MyButton = Button.extend`
  color: #ffffff;
  background-color: #66bb6a;
  border: 2px solid #66bb6a;
`

const mutation1 = gql`
  mutation($userId: ID!) {
    updateUser(id: $userId, isDuringClockIn: true) {
      isDuringClockIn
    }
  }
`

const mutation2 = gql`
  mutation($userId: ID!, $clockIn: DateTime) {
    createClock(userId: $userId, clockIn: $clockIn) {
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
)(ClockinBtn)
