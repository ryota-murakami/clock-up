// @flow
import React, { Component } from 'react'

type Props = {
  data: Object
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
    const { data } = this.props

    return (
      <div data-test="clock-in-time">
        {this.formatDate(data.user.clocks[0].clockIn)}
      </div>
    )
  }
}

export default ClockinTime
