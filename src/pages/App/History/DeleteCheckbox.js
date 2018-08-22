// @flow
import React, { Component } from 'react'
import { pure, compose } from 'recompose'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'
import { theme } from '../../../theme'
import type { Dispatch } from 'redux'
import type {
  AddDeleteClockIdAction,
  RemoveDeleteClockIdAction
} from '../../../actionTypes'
import type { ReduxState } from '../../../reducer'
import type { MapStateToProps } from '../../../dataTypes'

const Checkbox = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 100%;
  border-style: solid;
  border-width: 1px;
  border-color: ${props => (props.checked ? theme.red : 'rgba(0, 0, 0, 0.2)')};
  ${props =>
    props.checked &&
    css`
      background-color: ${theme.red};
    `}
  }
`

type StateProps = {
  checkedHistoryIdList: Array<string>
}

type Props = {
  ...StateProps,
  clockId: string,
  dispatch: Dispatch<AddDeleteClockIdAction | RemoveDeleteClockIdAction>
}

class DeleteCheckbox extends Component<Props> {
  isChecked = (clockId: string): boolean => {
    const { checkedHistoryIdList } = this.props
    // $FlowIssue
    return checkedHistoryIdList.includes(clockId)
  }

  handleClick = () => {
    const { dispatch, clockId } = this.props

    if (this.isChecked(clockId)) {
      dispatch({
        type: 'UNCHECK_DELETE_HISTORY',
        clockId: clockId
      })
    } else {
      dispatch({
        type: 'CHECK_DELETE_HISTORY',
        clockId: clockId
      })
    }
  }

  render() {
    return (
      <Checkbox
        onClick={this.handleClick}
        checked={this.isChecked(this.props.clockId)}
      />
    )
  }
}

const mapStateToProps: MapStateToProps<StateProps> = (
  state: ReduxState
): StateProps => {
  return { checkedHistoryIdList: state.checkedHistoryIdList }
}

export default compose(
  connect(mapStateToProps),
  pure
)(DeleteCheckbox)
