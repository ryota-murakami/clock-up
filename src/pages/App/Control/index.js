// @flow
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { ClockBoardQuery } from '../../../graphql/query'
import ClockinButton from './ClockinButton'
import ClockinTime from './ClockinTime'
import ClockoutButton from './ClockoutButton'
import { ClockinContainer, ClockoutContainer } from './index.style'
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
        <ClockoutContainer>
          {/* $FlowIssue */}
          <ClockinTime enzyme-testid="clock-in-time" data={data} />
          <ClockoutButton />
        </ClockoutContainer>
      )
    } else {
      return (
        <ClockinContainer>
          <ClockinButton />
        </ClockinContainer>
      )
    }
  }
}

export default graphql(ClockBoardQuery)(Control)
