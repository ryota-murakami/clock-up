// @flow
import React, { Component } from 'react'
import ClockinBtn from './ClockinBtn'
import ClockinTime from './ClockinTime'
import ClockoutBtn from './ClockoutBtn'

type Props = {
  data: Object
}

export class Control extends Component<Props> {
  render() {
    const { data } = this.props

    if (data.user.isDuringClockIn) {
      return (
        <div>
          <ClockoutBtn data={data} />
          <ClockinTime data={data} />
        </div>
      )
    } else {
      return <ClockinBtn data={data} />
    }
  }
}

export default Control
