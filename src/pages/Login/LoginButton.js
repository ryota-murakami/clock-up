// @flow
import React, { Component } from 'react'
import Auth0Lock from 'auth0-lock'
import { withRouter } from 'react-router-dom'
import { AUTH0_ID_TOKEN } from '../../const'
import { Button } from '../../elements/Button'
import { theme } from '../../const'
import type { RouterHistory } from 'react-router'

type Props = {
  lock: Auth0Lock,
  history: RouterHistory
}

export class LoginButton extends Component<Props> {
  showAuth0LoginModal: Function

  constructor(props: Props) {
    super(props)
    this.showAuth0LoginModal = this.showAuth0LoginModal.bind(this)
  }

  componentDidMount() {
    const { lock } = this.props
    // success Auth0 modal authentication -> come back to callback url from auth0
    lock.on('authenticated', authResult => {
      window.localStorage.setItem(AUTH0_ID_TOKEN, authResult.idToken)
      this.props.history.push(`/createuser`)
    })
  }

  showAuth0LoginModal() {
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
        data-testid="login-btn"
      >
        Login
      </StyledButton>
    )
  }
}

const StyledButton = Button.extend`
  width: 200px;
  height: 50px;
`

export default withRouter(LoginButton)
