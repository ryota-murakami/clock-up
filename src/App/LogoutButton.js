// @flow
import React, { Component } from 'react'
import { AUTH0_ID_TOKEN } from '../common/Const'
import { Button } from '../common/components/Button'
import { gray } from '../common/CSS'

type Props = {}

export class LogoutButton extends Component<Props> {
  logout = () => {
    window.localStorage.removeItem(AUTH0_ID_TOKEN)
    window.location.reload()
  }

  render() {
    return (
      <Button color={gray} onClick={this.logout} data-test="logout-btn">
        Logout
      </Button>
    )
  }
}

export default LogoutButton
