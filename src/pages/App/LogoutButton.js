// @flow
import React, { Component } from 'react'
import { pure } from 'recompose'
import { AUTH0_ID_TOKEN } from '../../constants'
import { Button } from '../../components/Button'
import { theme } from '../../theme'

type Props = {}

export class LogoutButton extends Component<Props> {
  logout = (): void => {
    window.localStorage.removeItem(AUTH0_ID_TOKEN)
    window.location.reload()
  }

  render() {
    return (
      <Button color={theme.gray} onClick={this.logout}>
        Logout
      </Button>
    )
  }
}

export default pure<*>(LogoutButton)
