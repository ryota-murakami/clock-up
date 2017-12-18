// @flow
import React, { Component } from 'react'
import Auth0Lock from 'auth0-lock'
import { withRouter } from 'react-router-dom'
import { AUTH0_ID_TOKEN } from '../globalConst'
import { Button } from '../components/Button'

type Props = {
  lock: Auth0Lock,
  // withRouter()
  match: any,
  location: any,
  history: any
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
      <MyButton onClick={this.showLogin} data-test="login-btn">
        Login
      </MyButton>
    )
  }
}

const MyButton = Button.extend`
  width: 200px;
  height: 50px;
  color: #66bb6a;
  border: 2px solid #66bb6a;
`

export default withRouter(LoginButton)
