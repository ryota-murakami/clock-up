// @flow
import React from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { compose, pure } from 'recompose'
import { graphql } from 'react-apollo'
import type { MutationFunc } from 'react-apollo'
import { CREATE_USER_MUTATION } from '../../graphql/mutation'
import { CLOCK_BOARD_QUERY } from '../../graphql/query'
import { AUTH0_ID_TOKEN } from '../../dataTypes'
import Loading from '../../elements/Loading'
import type { ContextRouter } from 'react-router'
import type { CLOCK_BOARD_QUERY_TYPE } from '../../graphql/query'

type Props = {
  ...ContextRouter,
  ...CLOCK_BOARD_QUERY_TYPE,
  CreateUserMutation: MutationFunc<*, *>
}

class CreateUser extends React.Component<Props> {
  isNotExistUserInAuth0(): boolean {
    const { data } = this.props

    return !data.user || window.localStorage.getItem(AUTH0_ID_TOKEN) !== null
  }

  insertUserDataToAuth0(): void {
    const { CreateUserMutation } = this.props

    const variables = {
      idToken: window.localStorage.getItem(AUTH0_ID_TOKEN)
    }

    // $FlowIssue
    CreateUserMutation({ variables }).catch(e => {
      if (
        // supress
        e.message === 'GraphQL error: User already exists with that information'
      )
        return

      throw e
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
  graphql(CREATE_USER_MUTATION, { name: 'CreateUserMutation' }),
  graphql(CLOCK_BOARD_QUERY, {
    // $FlowIssue
    options: { fetchPolicy: 'network-only', notifyOnNetworkStatusChange: true }
  }),
  // $FlowIssue @see https://github.com/flowtype/flow-typed/issues/1914
  withRouter,
  pure
)(CreateUser)
