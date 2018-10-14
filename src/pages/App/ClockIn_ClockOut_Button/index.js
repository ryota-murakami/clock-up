// @flow
import React, { Component } from 'react'
import { compose, pure } from 'recompose'
import { graphql } from 'react-apollo'
import { CLOCK_BOARD_QUERY } from '../../../graphql/query'
import ClockInButton from './ClockInButton'
import Information from './Information'
import ClockOutButton from './ClockOutButton'
import { ClockInContainer, ClockOutContainer } from './index.style'
import type { CLOCK_BOARD_QUERY_TYPE } from '../../../graphql/query'
import type { CurrentTime } from '../../../types/data'

type Props = {
  data: CLOCK_BOARD_QUERY_TYPE,
  currentTime: CurrentTime
}

export class ClockIn_ClockOut_Button extends Component<Props> {
  render() {
    const { data } = this.props
    if (data.loading) return null

    if (data.user.isDuringClockIn) {
      return (
        <ClockOutContainer>
          <Information data={data} currentTime={this.props.currentTime} />
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
)(ClockIn_ClockOut_Button)
