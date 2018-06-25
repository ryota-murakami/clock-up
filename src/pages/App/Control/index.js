// @flow
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { ClockBoardQuery } from '../../../graphql/query'
import ClockinButton from './ClockinButton'
import ClockinTime from './ClockinTime'
import ClockoutButton from './ClockoutButton'
import { ClockInContainer, ClockOutContainer } from './index.style'
import type { ClockBoardQueryType } from '../../../graphql/query'

type Props = {|
  data: ClockBoardQueryType
|}

export class Control extends Component<Props> {
  render() {
    const { data } = this.props
    if (data.loading) return null

    if (data.user.isDuringClockIn) {
      return (
        <ClockOutContainer>
          {/* $FlowIssue */}
          <ClockinTime enzyme-testid="clock-in-time" data={data} />
          <ClockoutButton />
        </ClockOutContainer>
      )
    } else {
      return (
        <ClockInContainer>
          <ClockinButton />
        </ClockInContainer>
      )
    }
  }
}

export default graphql(ClockBoardQuery)(Control)
