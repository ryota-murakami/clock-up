// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { theme } from '../../const'
import { connect } from 'react-redux'
import type { CurrentTime } from '../../types/ReduxState'

const Container = styled.div`
  height: 25%;
  border: 1px solid ${theme.borderColor};
  margin: 20px;
  padding: 60px;
  border-radius: 5px;
`

const Day = styled.div`
  height: 30%;
  color: ${theme.textColor};
  font-size: 1.5em;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Time = styled.div`
  height: 70%;
  color: ${theme.textColor};
  font-size: 7em;
  text-align: center;
`

type Props = {
  currentTime: CurrentTime
}

export class CurrentDateTime extends Component<Props> {
  flush(seconds: string): boolean {
    if (Number.parseInt(seconds, 10) % 2 === 0) {
      return true
    } else {
      return false
    }
  }

  render() {
    const currentTime: CurrentTime = this.props.currentTime
    const { year, month, days, date, hour, minutes, seconds } = currentTime

    return (
      <Container>
        <Day>
          {days} {month} {date} {year}
        </Day>
        <Time>
          {hour}
          <span
            style={{ visibility: this.flush(seconds) ? 'visible' : 'hidden' }}
          >
            :
          </span>
          {minutes}
        </Time>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentTime: state.app.currentTime
  }
}

export default connect(mapStateToProps)(CurrentDateTime)
