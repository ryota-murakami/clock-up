// @flow
import React, { Component } from 'react'
import { pure, compose } from 'recompose'
import Auth0Lock from 'auth0-lock'
import { withRouter } from 'react-router-dom'
import { AUTH0_ID_TOKEN } from '../../dataTypes'
import { Button } from '../../elements/Button'
import { theme } from '../../theme'
import type { ContextRouter } from 'react-router'

const StyledButton = Button.extend`
  width: 200px;
  height: 50px;
`

type Props = {
  ...ContextRouter,
  lock: Auth0Lock
}

export class LoginButton extends Component<Props> {
  componentDidMount() {
    const { lock } = this.props
    // success Auth0 modal authentication -> come back to callback url from auth0
    lock.on('authenticated', authResult => {
      window.localStorage.setItem(AUTH0_ID_TOKEN, authResult.idToken)
      this.props.history.push(`/createuser`)
    })
  }

  showAuth0LoginModal = () => {
    const { lock } = this.props
    lock.show({
      auth: {
        params: {
          responseType: 'id_token token'
        }
      }
    })
  }

  render() {
    return (
      <StyledButton
        color={theme.green}
        onClick={this.showAuth0LoginModal}
        enzyme-testid="login-btn"
      >
        Login
      </StyledButton>
    )
  }
}

export default compose(
  withRouter,
  pure
)(LoginButton)
