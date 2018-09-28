// @flow
import React, { Component } from 'react'
import { compose, pure } from 'recompose'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { EDIT_CLOCK_IN_MUTATON } from '../../../graphql/mutation'
import { ISOtoHm } from '../../../functions'
import { Td } from '../../../components/Table'
import type { Dispatch } from 'redux'
import type { MutationFunc } from 'react-apollo'
import type { ReduxAction } from '../../../actionTypes'
import type { ReduxState } from '../../../reducer'
import type { MapStateToProps } from '../../../dataTypes'

type State = {
  onInput: boolean
}

type StateProps = {
  EDIT_IN_TIME: boolean
}

type Props = {
  clockIn: string,
  clockId: string,
  ...StateProps,
  EDIT_CLOCK_IN_MUTATON: MutationFunc<*, *>,
  dispatch: Dispatch<ReduxAction>
}

export class InTime extends Component<Props, State> {
  state = {
    onInput: false
  }

  mutation = (value: string) => {
    if (value.length === 0) return
    this.props.dispatch({ type: 'DONE_EDIT_IN_TIME' })

    this.props
      // $FlowIssue
      .EDIT_CLOCK_IN_MUTATON({
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
    this.props.dispatch({ type: 'EDIT_IN_TIME' })
    this.setState({ onInput: true })
  }

  componentDidUpdate(prevProps: Props) {
    // Clicked anywhere of view during editing, app should decide "user discontinued update InTime".
    if (
      prevProps.EDIT_IN_TIME === true &&
      this.props.EDIT_IN_TIME === false &&
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
  return { EDIT_IN_TIME: state.EDIT_IN_TIME }
}

export default compose(
  graphql(EDIT_CLOCK_IN_MUTATON, {
    name: 'EDIT_CLOCK_IN_MUTATON'
  }),
  connect(map),
  pure
)(InTime)
