// @flow
import React, { Component } from 'react'
import { pure, compose } from 'recompose'
import styled from 'styled-components'
import Auth0Lock from 'auth0-lock'
import { withRouter } from 'react-router-dom'
import LoginButton from './LoginButton'
import { A } from '../../elements/A'
import type { WithRouterProps } from '../../propTypes'

export const Container = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

type Props = WithRouterProps & {
  lock: Auth0Lock
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

export default compose(
  withRouter,
  pure
)(Login)
