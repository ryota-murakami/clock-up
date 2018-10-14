// @flow
import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { compose, pure } from 'recompose'
import { graphql } from 'react-apollo'
import { CLOCK_BOARD_QUERY } from '../../graphql/query'
import { connect } from 'react-redux'
import Loading from '../../components/Loading'
import Header from './Header'
import Clock from './Clock'
import History from './History/index'
import ClockIn_ClockOut_Button from './ClockIn_ClockOut_Button'
import { Container, Left, Right } from './index.style'
import type { Dispatch } from 'redux'
import type { CLOCK_BOARD_QUERY_TYPE } from '../../graphql/query'
import type { ReduxState } from '../../reducer'
import type { ContextRouter } from 'react-router-dom'
import { parseTime } from '../../functions'
import type { CurrentTime, MapStateToProps } from '../../types/data'
import type {
  EDIT_IN_TIME__FALSE,
  EDIT_OUT_TIME__FALSE
} from '../../types/action'

type StateProps = {|
  EDIT_IN_TIME: $PropertyType<ReduxState, 'EDIT_IN_TIME'>,
  EDIT_OUT_TIME: $PropertyType<ReduxState, 'EDIT_OUT_TIME'>
|}

type Props = {
  data: CLOCK_BOARD_QUERY_TYPE,
  ...StateProps,
  ...ContextRouter,
  dispatch: Dispatch<EDIT_IN_TIME__FALSE | EDIT_OUT_TIME__FALSE>
}

type State = {|
  currentTime: CurrentTime
|}

export class App extends Component<Props, State> {
  // Timer
  state = {
    currentTime: parseTime(new Date())
  }

  componentDidMount() {
    // Update every sec
    setInterval(
      () => this.setState({ currentTime: parseTime(new Date()) }),
      1000
    )
  }

  isAuthenticated = (user: Object): boolean => !!user

  /**
   * this managing History Editing status.
   * If user clicked somewhere on screen during editing html input, the function have to change status to EDIT_IN_TIME__TRUE | EDIT_OUT_TIME__TRUE === "false".
   */
  handleOnClick = (e: SyntheticEvent<HTMLInputElement>): void => {
    const { EDIT_IN_TIME, EDIT_OUT_TIME, dispatch } = this.props
    if (!EDIT_IN_TIME && !EDIT_OUT_TIME) return

    if (EDIT_IN_TIME && !EDIT_OUT_TIME) {
      if (e.currentTarget.className.includes('in-time-input')) return

      // prettier-ignore
      dispatch({ type: ('EDIT_IN_TIME__FALSE': $PropertyType<EDIT_IN_TIME__FALSE, 'type'>)})
    } else if (EDIT_OUT_TIME && !EDIT_IN_TIME) {
      if (e.currentTarget.className.includes('out-time-input')) return

      // prettier-ignore
      dispatch({ type: ('EDIT_OUT_TIME__FALSE': $PropertyType<EDIT_OUT_TIME__FALSE, 'type'>)})
    } else {
      throw new Error('Logic Exception: EDIT TIME State Manage missing.')
    }
  }

  render() {
    const data: CLOCK_BOARD_QUERY_TYPE = this.props.data
    if (data.loading) {
      return <Loading />
    }

    if (!this.isAuthenticated(data.user)) {
      return <Redirect to="/login" />
    }

    return (
      <Container onClick={this.handleOnClick}>
        <Header />
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

const map: MapStateToProps<StateProps> = (state: ReduxState): StateProps => {
  return {
    EDIT_IN_TIME: state.EDIT_IN_TIME,
    EDIT_OUT_TIME: state.EDIT_OUT_TIME
  }
}

export default compose(
  connect(map),
  graphql(CLOCK_BOARD_QUERY),
  withRouter,
  pure
)(App)
