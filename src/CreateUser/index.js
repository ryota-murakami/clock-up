// @flow
import React from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { AUTH0_ID_TOKEN } from '../GlobalConst'
import Loading from '../components/Loading'

type Props = {
  data: Object,
  createUser: Function // GraphQL Mutation
}

export class CreateUser extends React.Component<Props> {
  /**
   * 新規ユーザーかどうか
   * @returns {boolean}
   */
  isFreshUser() {
    const { data } = this.props

    return !data.user || window.localStorage.getItem(AUTH0_ID_TOKEN) !== null
  }

  createUser() {
    const { createUser } = this.props

    const variables = {
      idToken: window.localStorage.getItem(AUTH0_ID_TOKEN)
    }

    createUser({ variables })
      .then(response => {
        // TODO 「ユーザー作成」に成功しました。的なポップアップを表示するActionを発行する
        console.log(response)
      })
      .catch(e => {
        // TODO エラーハンドリング
        console.error(e)
      })
  }

  render() {
    const { data } = this.props

    if (data.loading) {
      return <Loading />
    }

    // 新規ユーザーであればGraphCoolにユーザー情報としてAuth0認証情報を登録する
    if (this.isFreshUser()) {
      this.createUser()
    }

    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    )
  }
}

const createUser = gql`
  mutation($idToken: String!) {
    createUser(authProvider: { auth0: { idToken: $idToken } }) {
      id
    }
  }
`

const userQuery = gql`
  query {
    user {
      id
    }
  }
`

export default graphql(createUser, { name: 'createUser' })(
  graphql(userQuery, {
    options: { fetchPolicy: 'network-only', notifyOnNetworkStatusChange: true }
  })(withRouter(CreateUser))
)
