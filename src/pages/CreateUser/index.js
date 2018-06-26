// @flow
import React from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { compose, pure } from 'recompose'
import { graphql } from 'react-apollo'
import { CreateUserMutation } from '../../graphql/mutation'
import { ClockBoardQuery } from '../../graphql/query'
import { AUTH0_ID_TOKEN } from '../../index'
import Loading from '../../elements/Loading'
import type { WithRouterProps } from '../../propTypes'
import type { ClockBoardQueryType } from '../../graphql/query'

type Props = WithRouterProps & {
  data: ClockBoardQueryType,
  CreateUserMutation: Function
}

export class CreateUser extends React.Component<Props> {
  isNotExistUserInAuth0(): boolean {
    const { data } = this.props

    return !data.user || window.localStorage.getItem(AUTH0_ID_TOKEN) !== null
  }

  insertUserDataToAuth0(): void {
    const { CreateUserMutation } = this.props

    const variables = {
      idToken: window.localStorage.getItem(AUTH0_ID_TOKEN)
    }

    CreateUserMutation({ variables }).catch(e => {
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
  graphql(CreateUserMutation, { name: 'CreateUserMutation' }),
  graphql(ClockBoardQuery, {
    // $FlowIssue
    options: { fetchPolicy: 'network-only', notifyOnNetworkStatusChange: true }
  }),
  // $FlowIssue @see https://github.com/flowtype/flow-typed/issues/1914
  withRouter,
  pure
)(CreateUser)
