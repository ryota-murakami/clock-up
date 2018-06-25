// @flow
import React, { Component } from 'react'
import { compose, pure } from 'recompose'
import { Container, Day, Time } from './ClockBoard.style'
import { connect } from 'react-redux'
import type { CurrentTime } from '../../DataType'
import type { ReduxState } from '../../reducer'

type StateProps = {|
  currentTime: CurrentTime
|}

type Props = StateProps

export class ClockBoard extends Component<Props> {
  // TODO write test
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

const mapStateProps = (state: ReduxState): StateProps => {
  return {
    currentTime: state.currentTime
  }
}

export default compose(
  connect(mapStateProps),
  pure
)(ClockBoard)
