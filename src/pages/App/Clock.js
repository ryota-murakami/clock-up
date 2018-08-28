// @flow
import React, { Component } from 'react'
import { compose, pure } from 'recompose'
import { Container, Day, Time } from './Clock.style'
import type { CurrentTime } from '../../dataTypes'

type Props = {
  currentTime: CurrentTime
}

export class Clock extends Component<Props> {
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

export default compose(pure)(Clock)
