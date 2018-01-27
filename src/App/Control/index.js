// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import Loading from '../../common/components/Loading'
import ClockinButton from './ClockinButton'
import ClockinTime from './ClockinTime'
import ClockoutBtn from './ClockoutButton'

type User = {
  id: string,
  isDuringClockIn: boolean
}

type GraphQLData = {
  user: User,
  loading: boolean
}

type Props = {
  data: GraphQLData
}

export class Control extends Component<Props> {
  render() {
    const { data } = this.props

    if (data.loading) return <Loading />

    if (data.user.isDuringClockIn) {
      return (
        <ClockoutContainer>
          <p>ClockinTime</p>
          <p>ClockoutBtn</p>
        </ClockoutContainer>
      )
    } else {
      return (
        <ClockinContainer>
          <p>ClockinButton</p>
        </ClockinContainer>
      )
    }
  }
}

const query = gql`
  query {
    user {
      id
      isDuringClockIn
    }
  }
`

export default graphql(query, { options: { fetchPolicy: 'network-only' } })(
  Control
)

const ClockoutContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 20px;
`

const ClockinContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 0 20px;
`
