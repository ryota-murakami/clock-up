// @flow
import React, { Component } from 'react'
import { compose, pure } from 'recompose'
import type { MutationFunc } from 'react-apollo'
import { CLOCK_BOARD_QUERY } from '../../../graphql/query'
import { graphql } from 'react-apollo'
import { CLOCK_OUT_MUTATION } from '../../../graphql/mutation'
import { StyledButton } from './ClockOutButton.style'
import { theme } from '../../../theme'
import type { CLOCK_BOARD_QUERY_TYPE } from '../../../graphql/query'

type Props = {
  ...CLOCK_BOARD_QUERY_TYPE,
  ClockOutMutation: MutationFunc<*, *>
}

export class ClockOutButton extends Component<Props> {
  gqlLogic = () => {
    const { data, ClockOutMutation } = this.props

    const userId = data.user.id
    const clockId = data.user.clocks[0].id

    // $FlowIssue
    ClockOutMutation({
      variables: {
        clockId: clockId,
        userId: userId,
        clockOut: new Date().toISOString()
      }
    }).catch(e => {
      console.log(e)
      alert('error occurred when updateClock on clockout')
    })
  }

  render() {
    const { data } = this.props
    if (data.loading) return null

    return (
      <StyledButton
        primary
        color={theme.red}
        onClick={this.gqlLogic}
        enzyme-testid="clock-out-btn"
      >
        clock out
      </StyledButton>
    )
  }
}

export default compose(
  graphql(CLOCK_BOARD_QUERY),
  graphql(CLOCK_OUT_MUTATION, {
    name: 'ClockOutMutation'
  }),
  pure
)(ClockOutButton)
