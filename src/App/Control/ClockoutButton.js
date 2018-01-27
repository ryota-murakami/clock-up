// @flow
import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { Button } from '../../common/components/Button'
import { red } from '../../common/CSS'
import type { GraphQLMutation } from '../../types/GraphQLMutation'

type User = {
  id: string,
  clocks: Array<{
    id: string
  }>
}

type GraphQLData = {
  user: User,
  loading: boolean
}

type Props = {
  data: GraphQLData,
  updateUser: GraphQLMutation,
  updateClock: GraphQLMutation
}

export class ClockoutButton extends Component<Props> {
  gqlLogic: Function

  constructor(props: Props): void {
    super(props)
    this.gqlLogic = this.gqlLogic.bind(this) // avoid Class properties arrow function bind in order to test mocking
  }

  gqlLogic(): void {
    const { data, updateUser, updateClock } = this.props

    const userId = data.user.id
    const clockOut = () => new Date().toISOString()

    updateUser({
      variables: { userId },
      refetchQueries: [
        {
          query: gql`
            query {
              user {
                id
                isDuringClockIn
              }
            }
          `
        }
      ]
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
    const { data } = this.props
    if (data.loading) return null

    return (
      <Button
        primary
        color={red}
        onClick={this.gqlLogic}
        data-test="clock-out-btn"
      >
        clock out
      </Button>
    )
  }
}

const query = gql`
  query {
    user {
      id
      clocks {
        id
      }
    }
  }
`

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
  graphql(query),
  graphql(updateUser, {
    name: 'updateUser'
  }),
  graphql(updateClock, {
    name: 'updateClock'
  })
)(ClockoutButton)
