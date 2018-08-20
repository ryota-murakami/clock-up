// @flow
import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { compose, pure } from 'recompose'
import { graphql } from 'react-apollo'
import { CLOCK_BOARD_QUERY } from '../../graphql/query'
import { connect } from 'react-redux'
import Loading from '../../elements/Loading'
import { Header } from '../../elements/Header'
import Clock from './Clock'
import LogoutBtn from './LogoutButton'
import History from './History/index'
import ClockIn_ClockOut_Button from './ClockIn_ClockOut_Button'
import { Container, Left, Right } from './index.style'
import { parseTime } from '../../functions'
import type { Dispatch } from 'redux'
import type { ReduxAction, SyncDateAction } from '../../actionTypes'
import type { CurrentTime } from '../../dataTypes'
import type { CLOCK_BOARD_QUERY_TYPE } from '../../graphql/query'
import type { ReduxState } from '../../reducer'

type StateProps = {
  isInTimeEditing: boolean
}

type Props = {
  ...CLOCK_BOARD_QUERY_TYPE,
  ...StateProps,
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

  handleOnClick = (e: SyntheticEvent<HTMLElement>) => {
    const { isInTimeEditing, dispatch } = this.props
    if (!isInTimeEditing) return
    if (
      // $FlowIssue
      typeof e.target.className === 'string' &&
      e.target.className.includes('in-time-input')
    )
      return

    dispatch({ type: 'FINISH_IN_TIME_INPUT' })
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
      <Container onClick={e => this.handleOnClick(e)} enzyme-testid="app-page">
        <Header>
          <LogoutBtn enzyme-testid="app-logoutBtn" />
        </Header>
        <Left>
          <Clock />
          <ClockIn_ClockOut_Button enzyme-testid="app-control" />
        </Left>
        <Right>
          <History />
        </Right>
      </Container>
    )
  }
}

const mapStateToProps = (state: ReduxState): StateProps => {
  return { isInTimeEditing: state.isInTimeEditing }
}

export default compose(
  connect(mapStateToProps),
  graphql(CLOCK_BOARD_QUERY),
  withRouter,
  pure
)(App)
