// @flow
import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { graphql } from 'react-apollo'
import Loading from '../components/Loading'
import CurrentDateTime from './CurrentDateTime'
import LogoutBtn from './LogoutBtn'
import styled from 'styled-components'
import History from './History'
import ClockoutBtn from './ClockoutBtn'
import { fetchUserQuery } from '../graphql'
import ClockinBtn from './ClockinBtn'
import ClockinTime from './ClockinTime'
import { borderColor } from '../cssVariables'

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
      <Main>
        <Right>
          <CurrentDateTime />
          <LogoutBtn />
          {data.user.isDuringClockIn ? (
            <div>
              <ClockoutBtn data={data} />
              <ClockinTime data={data} />
            </div>
          ) : (
            <ClockinBtn data={data} />
          )}
        </Right>
        <Left>
          <History />
        </Left>
      </Main>
    )
  }
}

const Main = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`

const Right = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  margin: 10px;
  border-radius: 5px;
  border: 1px solid ${borderColor};
`

const Left = styled.div`
  width: 40%;
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
