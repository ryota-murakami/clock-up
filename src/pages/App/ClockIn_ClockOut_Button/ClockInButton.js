// @flow
import React, { Component } from 'react'
import { compose, pure } from 'recompose'
import { graphql } from 'react-apollo'
import type { MutationFunc } from 'react-apollo'
import { CLOCK_IN_MUTATION } from '../../../graphql/mutation'
import { CLOCK_BOARD_QUERY } from '../../../graphql/query'
import { StyledButton } from './ClockInButton.style'
import { theme } from '../../../theme'
import type { CLOCK_BOARD_QUERY_TYPE } from '../../../graphql/query'

type Props = {
  ...CLOCK_BOARD_QUERY_TYPE,
  ClockInMutation: MutationFunc<*, *>
}

export class ClockInButton extends Component<Props> {
  gqlLogic = () => {
    const { data, ClockInMutation } = this.props
    const userId = data.user.id

    // $FlowIssue
    ClockInMutation({
      variables: { userId: userId, clockIn: new Date().toISOString() },
      update: (cache, { data: { updateUser } }) => {
        const data = cache.readQuery({ query: CLOCK_BOARD_QUERY })
        // $FlowIssue
        data.user = updateUser
        cache.writeQuery({ query: CLOCK_BOARD_QUERY, data })
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
