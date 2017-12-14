// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { borderColor } from '../cssVariables'
import { connect } from 'react-redux'

type Props = {
  year: number,
  month: string,
  days: string,
  date: number,
  hour: number,
  minutes: number,
  seconds: number
}

export class CurrentDateTime extends Component<Props> {
  flush() {
    const { seconds } = this.props

    if (seconds % 2 === 0) {
      return true
    } else {
      return false
    }
  }

  render() {
    const { year, month, days, date, hour, minutes } = this.props

    return (
      <Container>
        <Day>
          {days} {month} {date} {year}
        </Day>
        <Time>
          {hour}
          <span style={{ visibility: this.flush() ? 'visible' : 'hidden' }}>
            :
          </span>
          {minutes}
        </Time>
      </Container>
    )
  }
}

const color = '#616161'

const Container = styled.div`
  height: 25%;
  border: 1px solid ${borderColor};
  margin: 20px;
  padding: 60px;
  border-radius: 5px;
`

const Day = styled.div`
  height: 30%;
  color: ${color};
  font-size: 1.5em;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Time = styled.div`
  height: 70%;
  color: ${color};
  font-size: 7em;
  text-align: center;
`

function mapStateToProps(state) {
  return {
    year: state.app.year,
    month: state.app.month,
    days: state.app.days,
    date: state.app.date,
    hour: state.app.hour,
    minutes: state.app.minutes,
    seconds: state.app.seconds
  }
}

export default connect(mapStateToProps)(CurrentDateTime)
