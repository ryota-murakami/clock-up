// @flow
import React, { Component } from 'react'
import { compose, pure } from 'recompose'
import { graphql } from 'react-apollo'
import type { MutationFunc } from 'react-apollo'
import { CLOCK_IN_MUTATION } from '../../../graphql/mutation'
import { CLOCK_BOARD_QUERY } from '../../../graphql/query'
import { StyledButton } from './ClockInButton.style'
import { theme } from '../../../theme'
import type { ClockBoardQueryType } from '../../../graphql/query'

type Props = {
  ...ClockBoardQueryType,
  ClockInMutation: MutationFunc<*, *>
}

export class ClockInButton extends Component<Props> {
  gqlLogic: Function

  constructor(props: Props) {
    super(props)
    this.gqlLogic = this.gqlLogic.bind(this) // avoid Class properties arrow function bind in order to test mocking
  }

  gqlLogic(): void {
    const { data, ClockInMutation } = this.props
    const userId = data.user.id

    // $FlowIssue
    ClockInMutation({
      variables: { userId: userId, clockIn: new Date().toISOString() },
      update: (proxy, { data: { updateUser } }) => {
        const data = proxy.readQuery({ query: CLOCK_BOARD_QUERY })
        // $FlowIssue
        data.user = updateUser
        proxy.writeQuery({ query: CLOCK_BOARD_QUERY, data })
      }
    })
  }

  render() {
    const { loading } = this.props.data
    if (loading) return null

    return (
      <StyledButton
        primary
        color={theme.green}
        onClick={this.gqlLogic}
        enzyme-testid="clock-in-btn"
      >
        Clock In
      </StyledButton>
    )
  }
}

export default compose(
  graphql(CLOCK_BOARD_QUERY),
  graphql(CLOCK_IN_MUTATION, {
    name: 'ClockInMutation'
  }),
  pure
)(ClockInButton)
