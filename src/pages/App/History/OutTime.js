// @flow
import React, { Component } from 'react'
import { compose, pure } from 'recompose'
import { Td } from '../../../elements/Table'

type Props = {
  date: string
}

export class OutTime extends Component<Props> {
  handleClick() {
    // TODO show nunber input & timepicker
    return () => alert('OutTime')
    // TODO when decided, throw gql mutation
  }

  render() {
    const { date } = this.props
    return <Td onClick={this.handleClick()}>{date}</Td>
  }
}

export default compose(pure)(OutTime)
