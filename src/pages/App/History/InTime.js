// @flow
import React, { Component } from 'react'
import { compose, pure } from 'recompose'
import { Td } from '../../../elements/Table'

type State = {
  onInput: boolean
}

type Props = {
  date: string
}

export class InTime extends Component<Props, State> {
  state = {
    onInput: false
  }

  handleClick = () => {
    this.setState({ onInput: true })
  }

  mutation = () => {
    this.setState({ onInput: false })
  }

  render() {
    const { date } = this.props
    return this.state.onInput ? (
      <input
        type="time"
        onKeyPress={e => e.key === 'Enter' && this.mutation()}
      />
    ) : (
      <Td onClick={() => this.setState({ onInput: true })}>{date}</Td>
    )
  }
}

export default compose(pure)(InTime)
