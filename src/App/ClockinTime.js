// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { borderColor, color } from '../cssVariables'

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

  getWorkingTime(latestClockinTime: string): string {
    const { dateObject } = this.props

    const clockin = new Date(latestClockinTime)
    const now = dateObject
    const diff = now - clockin // milliseconds
    var msec = diff
    const hh = Math.floor(msec / 1000 / 60 / 60)
    msec -= hh * 1000 * 60 * 60
    const mm = Math.floor(msec / 1000 / 60)
    msec -= mm * 1000 * 60
    const ss = Math.floor(msec / 1000)
    msec -= ss * 1000

    return hh + 'h' + mm + 'm' + ss + 's'
  }

  render() {
    const { data } = this.props

    const latestClockinTime: string = data.user.clocks[0].clockIn
    return (
      <Container data-test="clock-in-time">
        <Text>ClockIn</Text>
        <Text>{this.formatDate(latestClockinTime)}</Text>
        <Text>WoringTime</Text>
        <Text>{this.getWorkingTime(latestClockinTime)}</Text>
      </Container>
    )
  }
}

const Container = styled.div`
  flex-grow: 3;
  color: ${color};
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
