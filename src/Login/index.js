// @flow
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import LoginButton from './LoginButton'
import Auth0Lock from 'auth0-lock'

type Props = {
  lock: Auth0Lock,
  // withRouter()
  match: any,
  location: any,
  history: any
}

export class Login extends Component<Props> {
  render() {
    const { lock } = this.props

    return <LoginButton lock={lock} />
  }
}

export default withRouter(Login)
