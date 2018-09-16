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
import type { CLOCK_BOARD_QUERY_TYPE } from '../../graphql/query'
import type { ReduxState } from '../../reducer'
import type { ContextRouter } from 'react-router-dom'
import { parseTime } from '../../functions'
import type { ActionToggle, CurrentTime } from '../../dataTypes'

type StateProps = {|
  EDIT_IN_TIME: ActionToggle,
  EDIT_OUT_TIME: ActionToggle
|}

type Props = {
  ...CLOCK_BOARD_QUERY_TYPE,
  ...StateProps,
  ...ContextRouter
}

type State = {|
  currentTime: CurrentTime
|}

export class App extends Component<Props, State> {
  state = {
    currentTime: parseTime(new Date())
  }

  componentDidMount() {
    setInterval(
      () => this.setState({ currentTime: parseTime(new Date()) }),
      1000
    )
  }

  isAuthenticated(user: Object): boolean {
    return !!user
  }

  handleOnClick = (e: SyntheticEvent<HTMLInputElement>) => {
    const { EDIT_IN_TIME, EDIT_OUT_TIME, dispatch } = this.props
    if (!EDIT_IN_TIME && !EDIT_OUT_TIME) return

    if (EDIT_IN_TIME && !EDIT_OUT_TIME) {
      if (
        // $FlowIssue
        typeof e.target.className === 'string' &&
        e.target.className.includes('in-time-input')
      )
        return

      dispatch({ type: 'FINISH_EDIT_HISTORY_IN_TIME' })
    } else if (EDIT_OUT_TIME && !EDIT_IN_TIME) {
      if (
        // $FlowIssue
        typeof e.target.className === 'string' &&
        e.target.className.includes('out-time-input')
      )
        return

      dispatch({ type: 'FINISH_EDIT_HISTORY_OUT_TIME' })
    } else {
      throw new Error('Logic Exception: EDIT TIME State Manage missing.')
    }
  }

  render() {
    const {
      data: { loading, user }
    } = this.props

    if (loading) {
      return <Loading />
    }

    if (!this.isAuthenticated(user)) {
      // $FlowIssue
      return <Redirect to="/login" />
    }

    return (
      <Container onClick={e => this.handleOnClick(e)}>
        <Header>
          <LogoutBtn />
        </Header>
        <Left>
          <Clock currentTime={this.state.currentTime} />
          {/*eslint-disable react/jsx-pascal-case*/}
          <ClockIn_ClockOut_Button currentTime={this.state.currentTime} />
        </Left>
        <Right>
          <History />
        </Right>
      </Container>
    )
  }
}

const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    EDIT_IN_TIME: state.EDIT_IN_TIME,
    EDIT_OUT_TIME: state.EDIT_OUT_TIME
  }
}

export default compose(
  connect(mapStateToProps),
  graphql(CLOCK_BOARD_QUERY),
  withRouter,
  pure
)(App)
