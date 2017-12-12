// @flow
import React, { Component } from 'react'
import { AUTH0_ID_TOKEN } from '../GlobalConst'

type Props = {}

export class LogoutBtn extends Component<Props> {
  logout = () => {
    window.localStorage.removeItem(AUTH0_ID_TOKEN)
    window.location.reload()
  }

  render() {
    return (
      <div onClick={this.logout} data-test="logout-btn">
        Logout
      </div>
    )
  }
}

export default LogoutBtn
