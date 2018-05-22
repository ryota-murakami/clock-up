// @flow
import React, { Component } from 'react'
import { Td } from '../../../elements/Table'

type Props = {|
  date: string
|}

export class InTime extends Component<Props> {
  handleClick() {
    // TODO show nunber input & timepicker
    return () => alert('click')
    // TODO when decided, throw gql mutation
  }

  render() {
    const { date } = this.props
    return <Td onClick={this.handleClick()}>{date}</Td>
  }
}

export default InTime
