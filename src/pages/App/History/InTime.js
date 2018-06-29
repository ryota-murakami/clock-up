// @flow
import React, { Component } from 'react'
import { compose, pure } from 'recompose'
import { connect } from 'react-redux'
import { Td } from '../../../elements/Table'
import type { Dispatch } from 'redux'
import type { ReduxAction } from '../../../actionTypes'
import type { ReduxState } from '../../../reducer'

type State = {
  onInput: boolean
}

type StateProps = {
  isInTimeEditing: boolean
}

type Props = {
  date: string,
  ...StateProps,
  dispatch: Dispatch<ReduxAction>
}

export class InTime extends Component<Props, State> {
  state = {
    onInput: false
  }

  mutation = () => {
    this.props.dispatch({ type: 'FINISH_IN_TIME_INPUT' })
  }

  handleClick = () => {
    this.props.dispatch({ type: 'EDIT_IN_TIME_INPUT' })
    this.setState({ onInput: true })
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.isInTimeEditing === true) {
      if (this.props.isInTimeEditing === false) {
        if (this.state.onInput === true) {
          this.setState({ onInput: false })
        }
      }
    }
  }

  render() {
    const { date } = this.props

    return this.state.onInput ? (
      <input
        type="time"
        onKeyPress={e => e.key === 'Enter' && this.mutation()}
      />
    ) : (
      <Td onClick={this.handleClick}>{date}</Td>
    )
  }
}

const mapStateToProps = (state: ReduxState): StateProps => {
  return { isInTimeEditing: state.isInTimeEditing }
}

export default compose(
  connect(mapStateToProps),
  pure
)(InTime)
