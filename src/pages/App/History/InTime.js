// @flow
import React, { Component } from 'react'
import { compose, pure } from 'recompose'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { EDIT_CLOCK_IN_MUTATON } from '../../../graphql/mutation'
import { ISOtoHm } from '../../../functions'
import { Td } from '../../../elements/Table'
import type { Dispatch } from 'redux'
import type { MutationFunc } from 'react-apollo'
import type { ReduxAction } from '../../../actionTypes'
import type { ReduxState } from '../../../reducer'

type State = {
  onInput: boolean
}

type StateProps = {
  isInTimeEditing: boolean
}

type Props = {
  clockIn: string,
  clockId: string,
  ...StateProps,
  EditClockInMutation: MutationFunc<*, *>,
  dispatch: Dispatch<ReduxAction>
}

export class InTime extends Component<Props, State> {
  state = {
    onInput: false
  }

  mutation = (value: string) => {
    if (value.length === 0) return
    const s = value.split(':')
    const time = new Date(
      // $FlowIssue
      new Date(this.props.clockIn).setHours(s[0], [1])
    ).toISOString()
    this.props.dispatch({ type: 'FINISH_IN_TIME_INPUT' })
    // $FlowIssue
    this.props.EditClockInMutation({
      variable: {
        time: time,
        clockId: this.props.clockId
      }
    })
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
    const { clockIn } = this.props

    return this.state.onInput ? (
      <Td>
        <input
          type="time"
          autoFocus
          className="in-time-input"
          onKeyPress={(
            e // $FlowIssue
          ) => e.key === 'Enter' && this.mutation(e.target.value)}
        />
      </Td>
    ) : (
      // $FlowIssue
      <Td onClick={this.startEdit}>{ISOtoHm(clockIn)}</Td>
    )
  }
}

const mapStateToProps = (state: ReduxState): StateProps => {
  return { isInTimeEditing: state.isInTimeEditing }
}

export default compose(
  graphql(EDIT_CLOCK_IN_MUTATON, {
    name: 'EditClockInMutation'
  }),
  connect(mapStateToProps),
  pure
)(InTime)
