// @flow
import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { fetchUserQuery } from '../../common/GraphQL'
import { Button } from '../../common/components/Button'
import { green } from '../../common/CSS'
import type { GraphQLMutation } from '../../types/GraphQLMutation'
import type { GraphQLQueryResult } from '../../types/GraphQLQueryResult'

type Props = {
  data: GraphQLQueryResult,
  updateUser: GraphQLMutation,
  createClock: GraphQLMutation
}

export class ClockinButton extends Component<Props> {
  recordClockinTimeToGraphcool: Function

  constructor(props: Props) {
    super(props)
    this.recordClockinTimeToGraphcool = this.recordClockinTimeToGraphcool.bind(
      this
    )
  }

  recordClockinTimeToGraphcool(): void {
    const { data, updateUser, createClock } = this.props

    const userId = data.user.id
    const clockIn = () => new Date().toISOString()

    updateUser({
      variables: { userId },
      refetchQueries: [{ query: fetchUserQuery }]
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
  graphql(updateUser, {
    name: 'updateUser'
  }),
  graphql(createClock, {
    name: 'createClock'
  })
)(ClockinButton)
