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
import Control from './Control/index'
import { syncDate } from './actionCreator'
import type { Match, Location, RouterHistory } from 'react-router'
import type { Dispatch } from 'redux'
import type { ReduxAction } from '../../types/ReduxAction'

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

type User = {
  id: string
}

type GraphQLData = {
  user: User,
  loading: boolean
}

type Props = {
  data: GraphQLData,
  syncDate: Function,
  match: Match,
  location: Location,
  history: RouterHistory
}

export class App extends Component<Props> {
  syncDate: IntervalID

  isAuthenticated(user: User): boolean {
    return !!user
  }

  componentDidMount() {
    this.syncDate = setInterval(this.props.syncDate, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.syncDate)
  }

  render() {
    const { loading, user } = this.props.data

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

const mapDispatchToProps = (dispatch: Dispatch<ReduxAction>) => {
  return {
    syncDate: () => {
      dispatch(syncDate())
    }
  }
}

export default compose(
  connect(null, mapDispatchToProps),
  graphql(query),
  withRouter
)(App)
