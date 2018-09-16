// @flow
import React, { Component } from 'react'
import { compose, pure } from 'recompose'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { EDIT_CLOCK_OUT_MUTATION } from '../../../graphql/mutation'
import { ISOtoHm } from '../../../functions'
import { Td } from '../../../elements/Table'
import type { Dispatch } from 'redux'
import type { MutationFunc } from 'react-apollo'
import type { ReduxAction } from '../../../actionTypes'
import type { ReduxState } from '../../../reducer'
import type { ActionToggle, MapStateToProps } from '../../../dataTypes'

type State = {|
  onInput: boolean
|}

type StateProps = {|
  DURING_EDIT_HISTORY_OUT_TIME: ActionToggle
|}

type Props = {
  clockOut: string,
  clockId: string,
  ...StateProps,
  EDIT_CLOCK_OUT_MUTATION: MutationFunc<*, *>,
  dispatch: Dispatch<ReduxAction>
}

export class OutTime extends Component<Props, State> {
  state = {
    onInput: false
  }

  mutation = (value: string) => {
    if (value.length === 0) return
    this.props.dispatch({ type: 'FINISH_EDIT_HISTORY_OUT_TIME' })

    this.props
      .EDIT_CLOCK_OUT_MUTATION({
        variables: {
          clockOut: new Date( // $FlowIssue
            new Date(this.props.clockOut).setHours(...value.split(':'))
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
    this.props.dispatch({ type: 'DURING_EDIT_HISTORY_OUT_TIME' })
    this.setState({ onInput: true })
  }

  componentDidUpdate(prevProps: Props) {
    // Clicked anywhere of view during editing, app should decide "user discontinued update OutTime".
    if (
      prevProps.DURING_EDIT_HISTORY_OUT_TIME === true &&
      this.props.DURING_EDIT_HISTORY_OUT_TIME === false &&
      this.state.onInput === true
    ) {
      this.setState({ onInput: false })
    }
  }

  render() {
    const { clockOut } = this.props

    return this.state.onInput ? (
      <Td>
        <input
          type="time"
          autoFocus
          className="out-time-input"
          onKeyPress={e => e.key === 'Enter' && this.mutation(e.target.value)}
        />
      </Td>
    ) : (
      // $FlowIssue
      <Td onClick={this.startEdit}>{ISOtoHm(clockOut)}</Td>
    )
  }
}

const map: MapStateToProps<StateProps> = (state: ReduxState): StateProps => {
  return { DURING_EDIT_HISTORY_OUT_TIME: state.DURING_EDIT_HISTORY_OUT_TIME }
}

export default compose(
  graphql(EDIT_CLOCK_OUT_MUTATION, { name: 'EDIT_CLOCK_OUT_MUTATION' }),
  connect(map),
  pure
)(OutTime)
