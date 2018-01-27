// @flow
import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { Button } from '../../common/components/Button'
import { green } from '../../common/CSS'
import type { GraphQLMutation } from '../../types/GraphQLMutation'

type User = {
  id: string
}

type GraphQLData = {
  user: User
}

type Props = {
  data: GraphQLData,
  updateUser: GraphQLMutation,
  createClock: GraphQLMutation
}

export class ClockinButton extends Component<Props> {
  recordClockinTimeToGraphcool: Function

  constructor(props: Props) {
    super(props)
    this.recordClockinTimeToGraphcool = this.recordClockinTimeToGraphcool.bind(
      this
    ) // avoid Class properties arrow function bind in order to test mocking
  }

  recordClockinTimeToGraphcool(): void {
    const { data, updateUser, createClock } = this.props
    const userId = data.user.id
    const clockIn = () => new Date().toISOString()

    updateUser({
      variables: { userId }
    }).then(response => {
      console.log(response)
    })

    createClock({
      variables: { userId: userId, clockIn: clockIn() }
    }).then(response => {
      console.log(response)
    })
  }

  render() {
    return (
      <Button
        primary
        color={green}
        onClick={this.recordClockinTimeToGraphcool}
        data-test="clock-in-btn"
      >
        Clock In
      </Button>
    )
  }
}

const query = gql`
  query {
    user {
      id
    }
  }
`

const updateUser = gql`
  mutation($userId: ID!) {
    updateUser(id: $userId, isDuringClockIn: true) {
      isDuringClockIn
    }
  }
`

const createClock = gql`
  mutation($userId: ID!, $clockIn: DateTime) {
    createClock(userId: $userId, clockIn: $clockIn) {
      id
      clockIn
      clockOut
    }
  }
`

export default compose(
  graphql(query),
  graphql(updateUser, {
    name: 'updateUser'
  }),
  graphql(createClock, {
    name: 'createClock'
  })
)(ClockinButton)
