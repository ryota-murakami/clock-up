// @flow
import React, { Component } from 'react'
import { pure, compose } from 'recompose'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'
import { theme } from '../../../theme'
import type { Dispatch } from 'redux'
import type {
  CHECK_DELETE_HISTORY,
  UNCHECK_DELETE_HISTORY
} from '../../../types/action'
import type { ReduxState } from '../../../reducer'

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

type StateProps = {|
  checkedHistoryIdList: Array<string>
|}

type Props = {
  ...StateProps,
  clockId: string,
  dispatch: Dispatch<CHECK_DELETE_HISTORY | UNCHECK_DELETE_HISTORY>
}

class DeleteCheckbox extends Component<Props> {
  isChecked = (clockId: string): boolean => {
    const { checkedHistoryIdList } = this.props

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

const map: MapStateToProps = (state: ReduxState): StateProps => {
  return { checkedHistoryIdList: state.checkedHistoryIdList }
}

export default compose(
  connect(map),
  pure
)(DeleteCheckbox)
