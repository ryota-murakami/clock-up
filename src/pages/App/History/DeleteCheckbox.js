// @flow
import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { theme } from '../../../theme'

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
    `} &:hover {
    background-color: ${theme.red};
  }
`
type Props = {
  clockId: string
}

type State = {
  clicked: boolean
}

class DeleteCheckbox extends Component<Props, State> {
  state = {
    clicked: false
  }

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked })
  }

  render() {
    return <Checkbox onClick={this.handleClick} clicked={this.state.clicked} />
  }
}

export default DeleteCheckbox
