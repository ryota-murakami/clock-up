// @flow
import React, { Component } from 'react'
import { compose, pure } from 'recompose'
import { graphql } from 'react-apollo'
import { ClockBoardQuery } from '../../../graphql/query'
import ClockInButton from './ClockInButton'
import InTime from './InTime'
import ClockOutButton from './ClockOutButton'
import { ClockInContainer, ClockOutContainer } from './index.style'
import type { ClockBoardQueryType } from '../../../graphql/query'

type Props = {
  data: ClockBoardQueryType
}

export class Control extends Component<Props> {
  render() {
    const { data } = this.props
    if (data.loading) return null

    if (data.user.isDuringClockIn) {
      return (
        <ClockOutContainer>
          {/* $FlowIssue */}
          <InTime enzyme-testid="clock-in-time" data={data} />
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
  graphql(ClockBoardQuery),
  pure
)(Control)
