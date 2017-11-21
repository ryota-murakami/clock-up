// @flow
import React, { Component, PropTypes } from 'react'
import Auth0Lock from 'auth0-lock'
import { withRouter } from 'react-router-dom'
import { AUTH0_ID_TOKEN } from '../GlobalConst'

type Props = {
  // withRouter()
  match: any,
  location: any,
  history: any
}

class LoginButton extends Component<Props> {
  lock: Auth0Lock

  constructor(props) {
    super(props)

    // TODO constructor injection & add test
    const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID
    const domain = process.env.REACT_APP_AUTH0_DOMAIN
    this.lock = new Auth0Lock(clientId, domain)
  }

  componentDidMount() {
    // Auth0のログインモーダルで認証 -> コールバックURLへ帰還した時の処理
    this.lock.on('authenticated', authResult => {
      window.localStorage.setItem(AUTH0_ID_TOKEN, authResult.idToken)
      this.props.history.push(`/signup`)
    })
  }

  /**
   * Auth0のログインモーダルを表示
   */
  showLogin = () => {
    this.lock.show({
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
        <span onClick={this.showLogin} data-test="sign-in-btn">Google Login</span>
      </div>
    )
  }
}

export default withRouter(LoginButton)
