// @flow
import React, { Component } from 'react'
import { AUTH0_ID_TOKEN } from '../globalConst'
import styled from 'styled-components'

type Props = {}

export class LogoutBtn extends Component<Props> {
  logout = () => {
    window.localStorage.removeItem(AUTH0_ID_TOKEN)
    window.location.reload()
  }

  render() {
    return (
      <Button onClick={this.logout} data-test="logout-btn">
        Logout
      </Button>
    )
  }
}

const Button = styled.div`
  color: #78909c;
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid #78909c;
  border-radius: 3px;
  cursor: pointer;
`

export default LogoutBtn
