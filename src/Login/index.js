// @flow
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import LoginButton from './LoginButton'
import Auth0Lock from 'auth0-lock'

type Props = {
  data: any,
  // withRouter()
  match: any,
  location: any,
  history: any
}

class SignIn extends Component<Props> {
  render() {
    const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID
    const domain = process.env.REACT_APP_AUTH0_DOMAIN
    const lock = new Auth0Lock(clientId, domain)

    return <LoginButton lock={lock} />
  }
}

export default withRouter(SignIn)
