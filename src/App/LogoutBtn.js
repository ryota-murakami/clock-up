// @flow
import React, { Component } from 'react'
import { AUTH0_ID_TOKEN } from '../GlobalConst'
import styled from 'styled-components'

type Props = {}

export class LogoutBtn extends Component<Props> {
  logout = () => {
    window.localStorage.removeItem(AUTH0_ID_TOKEN)
    window.location.reload()
  }

  render() {
    return (
      <Main onClick={this.logout} data-test="logout-btn">
        Logout
      </Main>
    )
  }
}

const Main = styled.div`
  margin: 0 auto;
`

export default LogoutBtn
