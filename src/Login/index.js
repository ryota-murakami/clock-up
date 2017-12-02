// @flow
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import LoginButton from './LoginButton'
import Auth0Lock from 'auth0-lock'

type Props = {
  clientId: string,
  domain: string,
  // withRouter()
  match: any,
  location: any,
  history: any
}

export class Login extends Component<Props> {
  render() {
    const { clientId, domain } = this.props
    const lock = new Auth0Lock(clientId, domain)

    return <LoginButton lock={lock} />
  }
}

export default withRouter(Login)
