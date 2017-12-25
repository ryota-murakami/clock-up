// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import Auth0Lock from 'auth0-lock'
import { withRouter } from 'react-router-dom'
import LoginButton from './LoginButton'
import { A } from '../common/components/A'

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

const Container = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default withRouter(Login)
