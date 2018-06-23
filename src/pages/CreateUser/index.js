// @flow
import React from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { CreateUserMutation } from '../../graphql/mutation'
import { ClockBoardQuery } from '../../graphql/query'
import { compose } from 'redux'
import { AUTH0_ID_TOKEN } from '../../const'
import Loading from '../../elements/Loading'

type Props = {
  data: Object,
  createUser: Function
}

export class CreateUser extends React.Component<Props> {
  isNotExistUserInAuth0(): boolean {
    const { data } = this.props

    return !data.user || window.localStorage.getItem(AUTH0_ID_TOKEN) !== null
  }

  insertUserDataToAuth0(): void {
    const { createUser } = this.props

    const variables = {
      idToken: window.localStorage.getItem(AUTH0_ID_TOKEN)
    }

    createUser({ variables }).catch(e => {
      if (
        e.message === 'GraphQL error: User already exists with that information'
      )
        return

      alert('error occurred when createUser')
    })
  }

  render() {
    const { data } = this.props

    if (data.loading) {
      return <Loading enzyme-testid="Loading" />
    }

    if (this.isNotExistUserInAuth0()) {
      this.insertUserDataToAuth0()
    }

    return (
      // $FlowIssue
      <Redirect
        to={{
          pathname: '/'
        }}
        enzyme-testid="Redirect"
      />
    )
  }
}

export default compose(
  graphql(CreateUserMutation, { name: 'createUser' }),
  graphql(ClockBoardQuery, {
    // $FlowIssue
    options: { fetchPolicy: 'network-only', notifyOnNetworkStatusChange: true }
  }),
  // $FlowIssue @see https://github.com/flowtype/flow-typed/issues/1914
  withRouter
)(CreateUser)
