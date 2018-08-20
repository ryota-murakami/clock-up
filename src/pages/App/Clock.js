// @flow
import React, { Component } from 'react'
import { compose, pure } from 'recompose'
import { Container, Day, Time } from './Clock.style'
import { connect } from 'react-redux'
import type { CurrentTime } from '../../dataTypes'
import type { ReduxState } from '../../reducer'

type StateProps = {|
  currentTime: CurrentTime
|}

type Props = {
  ...StateProps
}

export class Clock extends Component<Props> {
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

const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    currentTime: state.currentTime
  }
}

export default compose(
  connect(mapStateToProps),
  pure
)(Clock)
