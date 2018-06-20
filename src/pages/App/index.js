// @flow
import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { compose } from 'redux'
import gql from 'graphql-tag'
import { connect } from 'react-redux'
import Loading from '../../elements/Loading'
import { Header } from '../../elements/Header'
import CurrentDateTime from './CurrentDateTime'
import LogoutBtn from './LogoutButton'
import History from './History/index'
import { type } from '../../types/ReduxAction'
import Control from './Control'
import { Container, Left, Right } from './index.style'
import { parseTime } from '../../function'
import type { Dispatch } from 'redux'
import type { ReduxAction, SyncDateAction } from '../../types/ReduxAction'
import type { CurrentTime } from '../../reducer'

type Props = {
  data: {
    user: {
      id: string
    },
    loading: boolean
  },
  dispatch: Dispatch<ReduxAction>
}

export class App extends Component<Props> {
  syncDate = (): SyncDateAction => {
    const time: CurrentTime = parseTime(new Date())
    return {
      type: type.SYNC_DATE,
      currentTime: time
    }
  }

  isAuthenticated(user: Object): boolean {
    return !!user
  }

  componentDidMount() {
    setInterval(() => this.props.dispatch(this.syncDate()), 1000)
  }

  render() {
    const {
      data: { loading, user }
    } = this.props

    if (loading) {
      return <Loading enzyme-testid="app-loading" />
    }

    if (!this.isAuthenticated(user)) {
      // $FlowIssue
      return <Redirect to="/login" enzyme-testid="app-redirect" />
    }

    return (
      <Container enzyme-testid="app-page">
        <Header>
          <LogoutBtn enzyme-testid="app-logoutBtn" />
        </Header>
        <Left>
          <CurrentDateTime />
          <Control enzyme-testid="app-control" />
        </Left>
        <Right>
          <History />
        </Right>
      </Container>
    )
  }
}

export const query = gql`
  query {
    user {
      id
    }
  }
`

export default compose(
  connect(),
  graphql(query),
  withRouter
)(App)
