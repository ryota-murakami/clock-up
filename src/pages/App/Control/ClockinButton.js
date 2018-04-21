// @flow
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { compose } from 'redux'
import gql from 'graphql-tag'
import { Button } from '../../../elements/Button'
import { theme } from '../../../const'
import type { GraphQL } from '../../../types/GraphQL'

type Props = {
  data: {
    loading: boolean,
    user: {
      id: string
    }
  },
  mutation: GraphQL
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
    const { loading } = this.props.data
    if (loading) return null

    return (
      <Button
        primary
        color={theme.green}
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
      clocks(first: 1, orderBy: createdAt_DESC) {
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
