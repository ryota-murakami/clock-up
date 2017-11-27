// @flow
import React, { Component } from 'react'
import Auth0Lock from 'auth0-lock'
import { withRouter } from 'react-router-dom'
import { AUTH0_ID_TOKEN } from '../GlobalConst'

type Props = {
  // withRouter()
  match: any,
  location: any,
  history: any,
  lock: Auth0Lock
}

export class LoginButton extends Component<Props> {
  showLogin: Function

  constructor(props: Props) {
    super(props)
    this.showLogin = this.showLogin.bind(this)
  }

  componentDidMount() {
    const { lock } = this.props
    // Auth0のログインモーダルで認証 -> コールバックURLへ帰還した時の処理
    lock.on('authenticated', authResult => {
      window.localStorage.setItem(AUTH0_ID_TOKEN, authResult.idToken)
      this.props.history.push(`/createuser`)
    })
  }

  /**
   * Auth0のログインモーダルを表示
   */
  showLogin() {
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
      <div>
        <span onClick={this.showLogin} data-test="login-btn">
          Google Login
        </span>
      </div>
    )
  }
}

export default withRouter(LoginButton)
