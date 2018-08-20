// @flow
import React, { Component } from 'react'
import { compose, pure } from 'recompose'
import { connect } from 'react-redux'
import { calcTotalTime } from '../../../functions'
import { Container } from './InTime.style'
import type { CurrentTime } from '../../../dataTypes'
import type { ReduxState } from '../../../reducer'
import type { CLOCK_BOARD_QUERY_TYPE } from '../../../graphql/query'

type StateProps = {|
  currentTime: CurrentTime
|}

type Props = {
  ...StateProps,
  ...CLOCK_BOARD_QUERY_TYPE
}

export class InTime extends Component<Props> {
  /**
   * @param str ISOString. e.g. '2017-12-10T14:31:10.501Z'
   * @returns {string} human readable string. e.g. '11:31 PM'
   */
  formatDate = (str: string): string => {
    const dateObj = new Date(str)

    const options = {
      hour: '2-digit',
      minute: '2-digit'
    }

    return dateObj.toLocaleTimeString('en-us', options)
  }

  render() {
    const { data } = this.props
    if (data.loading) return null

    const { user } = data
    const currentTime: CurrentTime = this.props.currentTime

    const now: Date = currentTime.dateObject
    const ClockinTimeISO: string = user.clocks[0].clockIn
    const past = new Date(ClockinTimeISO)

    const TotalTime = calcTotalTime(now, past)

    return (
      <Container enzyme-testid="clock-in-time">
        <div>ClockIn</div>
        <div>{this.formatDate(ClockinTimeISO)}</div>
        <div>TotalTime</div>
        <div>{TotalTime}</div>
      </Container>
    )
  }
}

const mapStateProps = (state: ReduxState): StateProps => {
  return {
    currentTime: state.currentTime
  }
}

export default compose(
  connect(mapStateProps),
  pure
)(InTime)
