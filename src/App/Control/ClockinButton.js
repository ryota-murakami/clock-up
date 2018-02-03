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
  changeToTrueIsDuringClockIn: GraphQLMutation,
  createClock: GraphQLMutation
}

export class ClockinButton extends Component<Props> {
  gqlLogic: Function

  constructor(props: Props) {
    super(props)
    this.gqlLogic = this.gqlLogic.bind(this) // avoid Class properties arrow function bind in order to test mocking
  }

  gqlLogic(): void {
    const { data, changeToTrueIsDuringClockIn, createClock } = this.props
    const userId = data.user.id

    changeToTrueIsDuringClockIn({
      variables: { userId }
    }).then(response => {
      console.log(response)
    })

    createClock({
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

const changeToTrueIsDuringClockIn = gql`
  mutation($userId: ID!) {
    updateUser(id: $userId, isDuringClockIn: true) {
      id
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
  graphql(changeToTrueIsDuringClockIn, {
    name: 'changeToTrueIsDuringClockIn'
  }),
  graphql(createClock, {
    name: 'createClock'
  })
)(ClockinButton)
