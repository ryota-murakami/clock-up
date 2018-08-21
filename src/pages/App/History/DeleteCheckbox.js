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

const Checkbox = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 100%;
  border-style: solid;
  border-width: 1px;
  border-color: ${props => (props.clicked ? theme.red : 'rgba(0, 0, 0, 0.2)')};
  ${props =>
    props.clicked &&
    css`
      background-color: ${theme.red};
    `}
  }
`

type Props = {
  clockId: string,
  dispatch: Dispatch<AddDeleteClockIdAction | RemoveDeleteClockIdAction>
}

type State = {
  clicked: boolean
}

// TODO unmount?
class DeleteCheckbox extends Component<Props, State> {
  state = {
    clicked: false
  }

  handleClick = () => {
    const { dispatch } = this.props
    const clicked = this.state.clicked

    this.setState({ clicked: !clicked })

    if (clicked) {
      dispatch({
        type: 'REMOVE_DElETE_CLOCK_ID',
        clockId: this.props.clockId
      })
    } else {
      dispatch({
        type: 'ADD_DElETE_CLOCK_ID',
        clockId: this.props.clockId
      })
    }
  }

  render() {
    return <Checkbox onClick={this.handleClick} clicked={this.state.clicked} />
  }
}

export default compose(
  connect(),
  pure
)(DeleteCheckbox)
