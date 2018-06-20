// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import ClockinButton from './ClockinButton'
import ClockinTime from './ClockinTime'
import ClockoutButton from './ClockoutButton'

const ClockoutContainer = styled.div`
  width: 93.4%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0 20px;
`

const ClockinContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 0 20px;
`

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

    if (data.loading) return null

    if (data.user.isDuringClockIn) {
      return (
        <ClockoutContainer>
          <ClockinTime />
          <ClockoutButton />
        </ClockoutContainer>
      )
    } else {
      return (
        <ClockinContainer>
          <ClockinButton />
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

export default graphql(query)(Control)
