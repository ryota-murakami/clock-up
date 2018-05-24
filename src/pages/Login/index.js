// @flow
import React, { Component } from 'react'
import Auth0Lock from 'auth0-lock'
import { withRouter } from 'react-router-dom'
import LoginButton from './LoginButton'
import { A } from '../../elements/A'
import { Container } from './index.style'
import type { Match, Location, RouterHistory } from 'react-router'

type Props = {
  lock: Auth0Lock,
  match: Match,
  location: Location,
  history: RouterHistory
}

export class Login extends Component<Props> {
  render() {
    const { lock } = this.props

    return (
      <Container>
        <LoginButton lock={lock} />
        <p>
          <A href="https://github.com/ryota-murakami/clock-up" target="_blank">
            Clock Up
          </A>
        </p>
      </Container>
    )
  }
}

export default withRouter(Login)
