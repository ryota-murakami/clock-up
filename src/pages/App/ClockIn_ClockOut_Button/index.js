// @flow
import React, { Component } from 'react'
import { compose, pure } from 'recompose'
import { graphql } from 'react-apollo'
import { CLOCK_BOARD_QUERY } from '../../../graphql/query'
import ClockInButton from './ClockInButton'
import InTime from './InTime'
import ClockOutButton from './ClockOutButton'
import { ClockInContainer, ClockOutContainer } from './index.style'
import type { CLOCK_BOARD_QUERY_TYPE } from '../../../graphql/query'

type Props = {
  ...CLOCK_BOARD_QUERY_TYPE
}

export class Control extends Component<Props> {
  render() {
    const { data } = this.props
    if (data.loading) return null

    if (data.user.isDuringClockIn) {
      return (
        <ClockOutContainer>
          {/* $FlowIssue */}
          <InTime data={data} />
          <ClockOutButton />
        </ClockOutContainer>
      )
    } else {
      return (
        <ClockInContainer>
          <ClockInButton />
        </ClockInContainer>
      )
    }
  }
}

export default compose(
  graphql(CLOCK_BOARD_QUERY),
  pure
)(Control)
