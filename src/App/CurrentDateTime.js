// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { borderColor, textColor } from '../common/CSS'
import { connect } from 'react-redux'

type Props = {
  year: string,
  month: string,
  days: string,
  date: string,
  hour: string,
  minutes: string,
  seconds: string
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

const Container = styled.div`
  height: 25%;
  border: 1px solid ${borderColor};
  margin: 20px;
  padding: 60px;
  border-radius: 5px;
`

const Day = styled.div`
  height: 30%;
  color: ${textColor};
  font-size: 1.5em;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Time = styled.div`
  height: 70%;
  color: ${textColor};
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
