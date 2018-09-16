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
import type { ActionToggle, MapStateToProps } from '../../../dataTypes'

type State = {
  onInput: boolean
}

type StateProps = {
  DURING_EDIT_HISTORY_IN_TIME: ActionToggle
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
    this.props.dispatch({ type: 'FINISH_EDIT_HISTORY_IN_TIME' })

    this.props
      // $FlowIssue
      .EditClockInMutation({
        variables: {
          clockIn: new Date( // $FlowIssue
            new Date(this.props.clockIn).setHours(...value.split(':'))
          ).toISOString(),
          clockId: this.props.clockId
        }
      })
      .then()
      .catch(e => {
        console.log(e)
      })
  }

  startEdit = () => {
    this.props.dispatch({ type: 'DURING_EDIT_HISTORY_IN_TIME' })
    this.setState({ onInput: true })
  }

  componentDidUpdate(prevProps: Props) {
    // Clicked anywhere of view during editing, app should decide "user discontinued update InTime".
    if (
      prevProps.DURING_EDIT_HISTORY_IN_TIME === true &&
      this.props.DURING_EDIT_HISTORY_IN_TIME === false &&
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

const map: MapStateToProps<StateProps> = (state: ReduxState): StateProps => {
  return { DURING_EDIT_HISTORY_IN_TIME: state.DURING_EDIT_HISTORY_IN_TIME }
}

export default compose(
  graphql(EDIT_CLOCK_IN_MUTATON, {
    name: 'EditClockInMutation'
  }),
  connect(map),
  pure
)(InTime)
