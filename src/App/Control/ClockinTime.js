// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { borderColor, textColor } from '../../common/CSS'
import { calcTotalTime } from '../../common/util'

type Props = {
  data: Object,
  dateObject: Date
}

export class ClockinTime extends Component<Props> {
  constructor(props: Props) {
    super(props)
    this.formatDate = this.formatDate.bind(this)
  }

  /**
   * @param str ISOString. e.g. '2017-12-10T14:31:10.501Z'
   * @returns {string} human readable string. e.g. '11:31 PM'
   */
  formatDate(str: string): string {
    const dateObj = new Date(str)

    const options = {
      hour: '2-digit',
      minute: '2-digit'
    }

    return dateObj.toLocaleTimeString('en-us', options)
  }

  render() {
    const { data, dateObject } = this.props
    const now: Date = dateObject
    const ClockinTimeISO: string = data.user.clocks[0].clockIn
    const past = new Date(ClockinTimeISO)
    const TotalTime = calcTotalTime(now, past)

    return (
      <Container data-test="clock-in-time">
        <Text>ClockIn</Text>
        <Text>{this.formatDate(ClockinTimeISO)}</Text>
        <Text>TotalTime</Text>
        <Text>{TotalTime}</Text>
      </Container>
    )
  }
}

const Container = styled.div`
  flex-grow: 3;
  color: ${textColor};
  font-size: 1.1em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  border: 1px solid ${borderColor};
  border-radius: 5px;
  margin: 0 10px;
`

const Text = styled.div``

function mapStateToProps(state) {
  return {
    dateObject: state.app.dateObject
  }
}

export default connect(mapStateToProps)(ClockinTime)
