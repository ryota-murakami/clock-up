// @flow
import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { ClockBoardQuery } from '../../graphql/query'
import { compose } from 'redux'
import { connect } from 'react-redux'
import Loading from '../../elements/Loading'
import { Header } from '../../elements/Header'
import CurrentDateTime from './ClockBoard'
import LogoutBtn from './LogoutButton'
import History from './History/index'
import Control from './Control'
import { Container, Left, Right } from './index.style'
import { parseTime } from '../../function'
import type { Dispatch } from 'redux'
import type { ReduxAction, SyncDateAction } from '../../ActionType'
import type { CurrentTime } from '../../DataType'
import type { ClockBoardQueryType } from '../../graphql/query'

type Props = {
  data: ClockBoardQueryType,
  dispatch: Dispatch<ReduxAction>
}

export class App extends Component<Props> {
  syncDate = (): SyncDateAction => {
    const time: CurrentTime = parseTime(new Date())
    return {
      type: 'SYNC_DATE',
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

export default compose(
  connect(),
  graphql(ClockBoardQuery),
  withRouter
)(App)
