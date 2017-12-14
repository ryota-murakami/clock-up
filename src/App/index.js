// @flow
import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { graphql } from 'react-apollo'
import Loading from '../components/Loading'
import CurrentDateTime from './CurrentDateTime'
import LogoutBtn from './LogoutBtn'
import styled from 'styled-components'
import History from './History'
import { fetchUserQuery } from '../graphql'
import { borderColor } from '../cssVariables'
import Control from './Control'

type Props = {
  data: Object,
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
          <History />
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

const Header = styled.div`
  grid-area: header;
  border-bottom: 1px solid ${borderColor};
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

export default graphql(fetchUserQuery, {
  options: {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    options: { pollInterval: 1000 }
  }
})(withRouter(App))
