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
        <History />
      </Main>
    )
  }
}

const Main = styled.main``

export default graphql(fetchUserQuery, {
  options: {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    options: { pollInterval: 1000 }
  }
})(withRouter(App))
