// @flow
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import LoginButton from './LoginButton'

type Props = {
  data: any,
  // withRouter()
  match: any,
  location: any,
  history: any
}

class SignIn extends Component<Props> {
  render() {
    return <LoginButton />
  }
}

export default withRouter(SignIn)
