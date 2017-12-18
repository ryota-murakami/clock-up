// @flow
import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import Loading from '../components/Loading'
import { Header } from '../components/Header'
import CurrentDateTime from './CurrentDateTime'
import LogoutBtn from './LogoutButton'
import styled from 'styled-components'
import History from './History'
import { fetchUserQuery } from '../graphql'
import { borderColor } from '../commonCSS'
import Control from './Control/index'
import { syncDate } from './actions'

type Props = {
  data: Object,
  syncDate: Function,
  // withRouter()
  match: any,
  location: any,
  history: any
}

export class App extends Component<Props> {
  isAuthenticated(): boolean {
    const { data } = this.props

    return !!data.user
  }

  componentDidMount() {
    this.syncDate = setInterval(this.props.syncDate, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.syncDate)
  }

  render() {
    const { data } = this.props

    if (data.loading) {
      return <Loading />
    }

    if (!this.isAuthenticated()) {
      return <Redirect to="/login" />
    }

    return (
      <Container>
        <Header>
          <LogoutBtn />
        </Header>
        <Right>
          <History clocks={data.user.clocks} />
        </Right>
        <Left>
          <CurrentDateTime />
          <Control data={data} />
        </Left>
      </Container>
    )
  }
}

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

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    syncDate: () => {
      dispatch(syncDate())
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(fetchUserQuery, {
    options: {
      fetchPolicy: 'network-only',
      notifyOnNetworkStatusChange: true
    }
  }),
  withRouter
)(App)
