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

  mutation = (value: string) => {
    if (value.length === 0) return
    this.props.dispatch({ type: 'FINISH_IN_TIME_INPUT' })
  }

  startEdit = () => {
    this.props.dispatch({ type: 'EDIT_IN_TIME_INPUT' })
    this.setState({ onInput: true })
  }

  componentDidUpdate(prevProps: Props) {
    // Clicked anywhere of view during editing, app should decide "user discontinued update InTime".
    if (
      prevProps.isInTimeEditing === true &&
      this.props.isInTimeEditing === false &&
      this.state.onInput === true
    ) {
      this.setState({ onInput: false })
    }
  }

  render() {
    const { date } = this.props

    return this.state.onInput ? (
      <Td>
        <input
          type="time"
          autoFocus
          className="in-time-input"
          onKeyPress={e => e.key === 'Enter' && this.mutation(e.target.value)}
        />
      </Td>
    ) : (
      <Td onClick={this.startEdit}>{date}</Td>
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
