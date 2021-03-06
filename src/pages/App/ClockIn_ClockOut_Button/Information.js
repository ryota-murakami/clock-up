// @flow
import React, { Component, Fragment } from 'react'
import { pure } from 'recompose'
import { calcTotalTime } from '../../../functions'
import { Container, Text, Time } from './Information.style'
import type { CurrentTime } from '../../../types/data'
import type { CLOCK_BOARD_QUERY_TYPE } from '../../../graphql/query'

type Props = {
  data: CLOCK_BOARD_QUERY_TYPE,
  currentTime: CurrentTime
}

export class Information extends Component<Props> {
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
      <Fragment>
        <Container>
          <Text>ClockIn</Text>
          <Time>{this.formatDate(ClockinTimeISO)}</Time>
        </Container>
        <Container>
          <Text>TotalTime</Text>
          <Time>{TotalTime}</Time>
        </Container>
      </Fragment>
    )
  }
}

export default pure<*>(Information)
