// @flow
import React, { Component } from 'react'
import { compose, pure } from 'recompose'
import { AUTH0_ID_TOKEN } from '../../dataTypes'
import { Button } from '../../elements/Button'
import { theme } from '../../theme'

type Props = {}

export class LogoutButton extends Component<Props> {
  logout = () => {
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

export default compose(pure)(LogoutButton)
