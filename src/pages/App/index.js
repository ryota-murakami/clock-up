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
import styled from 'styled-components'
import History from './History'
import { borderColor } from '../../css'
import { type } from '../../types/ReduxAction'
import Control from './Control'
import type { Dispatch } from 'redux'
import type { Match, Location, RouterHistory } from 'react-router'
import type { SyncDateAction } from '../../types/ReduxAction'
import { parseTime } from '../../util'

const Container = styled.main`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 50px 1fr;
  grid-template-areas:
    'header header header'
    'left left right';
  grid-column-gap: 10px;
`

const Right = styled.div`
  grid-area: right;
  margin: 10px;
  border-radius: 5px;
  border: 1px solid ${borderColor};
`

const Left = styled.div`
  grid-area: left;
  margin: 10px;
  border-radius: 5px;
  border: 1px solid ${borderColor};
`

type Props = {
  data: {
    user: {
      id: string
    },
    loading: boolean
  },
  // TODO Router Shape
  match: Match,
  location: Location,
  history: RouterHistory,
  dispatch: Dispatch
}

export class App extends Component<Props> {
  syncDate = (): SyncDateAction => {
    const time: CurrentTime = parseTime(new Date())
    return {
      type: type.SYNC_DATE,
      currentTime: time
    }
  }

  isAuthenticated(user: User): boolean {
    return !!user
  }

  componentDidMount() {
    setInterval(this.props.dispatch(this.syncDate()), 1000)
  }

  render() {
    const {
      data: { loading, user }
    } = this.props

    if (loading) {
      return <Loading />
    }

    if (!this.isAuthenticated(user)) {
      return <Redirect to="/login" />
    }

    return (
      <Container>
        <Header>
          <LogoutBtn />
        </Header>
        <Left>
          <CurrentDateTime />
          <Control />
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

export default compose(connect(), graphql(query), withRouter)(App)
