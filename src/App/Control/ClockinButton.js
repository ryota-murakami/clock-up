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
  mutation: GraphQLMutation
}

export class ClockinButton extends Component<Props> {
  gqlLogic: Function

  constructor(props: Props) {
    super(props)
    this.gqlLogic = this.gqlLogic.bind(this) // avoid Class properties arrow function bind in order to test mocking
  }

  gqlLogic(): void {
    const { data, mutation } = this.props
    const userId = data.user.id

    mutation({
      variables: { userId: userId, clockIn: new Date().toISOString() }
    }).then(response => {
      console.log(response)
    })
  }

  render() {
    return (
      <Button
        primary
        color={green}
        onClick={this.gqlLogic}
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

const mutation = gql`
  mutation($userId: ID!, $clockIn: DateTime) {
    createClock(userId: $userId, clockIn: $clockIn) {
      id
      clockIn
      clockOut
    }
    updateUser(id: $userId, isDuringClockIn: true) {
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

export default compose(
  graphql(query),
  graphql(mutation, {
    name: 'mutation'
  })
)(ClockinButton)
