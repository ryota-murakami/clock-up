// @flow
import React, { Component } from 'react'
import Auth0Lock from 'auth0-lock'
import { withRouter } from 'react-router-dom'
import { AUTH0_ID_TOKEN } from '../common/const'
import { Button } from '../common/components/Button'
import { green } from '../common/CSS'

type Props = {
  lock: Auth0Lock,
  // withRouter()
  match: any,
  location: any,
  history: any
}

export class LoginButton extends Component<Props> {
  showAuth0LoginModal: Function

  constructor(props: Props) {
    super(props)
    this.showAuth0LoginModal = this.showAuth0LoginModal.bind(this)
  }

  componentDidMount() {
    const { lock } = this.props
    // Auth0のログインモーダルで認証 -> コールバックURLへ帰還した時の処理
    lock.on('authenticated', authResult => {
      window.localStorage.setItem(AUTH0_ID_TOKEN, authResult.idToken)
      this.props.history.push(`/createuser`)
    })
  }

  showAuth0LoginModal() {
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
      <MyButton
        color={green}
        onClick={this.showAuth0LoginModal}
        data-test="login-btn"
      >
        Login
      </MyButton>
    )
  }
}

const MyButton = Button.extend`
  width: 200px;
  height: 50px;
`

export default withRouter(LoginButton)
