// @flow
import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import ClockinButton from './ClockinButton'
import ClockinTime from './ClockinTime'
import ClockoutButton from './ClockoutButton'
import { ClockinContainer, ClockoutContainer } from './index.style'

type User = {
  id: string,
  isDuringClockIn: boolean,
  clocks: Array<{
    id: string,
    clockIn: string
  }>
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
          {/* $FlowIssue */}
          <ClockinTime enzyme-testid="clock-in-time" data={data} />
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
      clocks(last: 1) {
        id
        clockIn
      }
    }
  }
`

export default graphql(query)(Control)
