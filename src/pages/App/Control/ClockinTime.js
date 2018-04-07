// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { graphql } from 'react-apollo'
import { compose } from 'redux'
import gql from 'graphql-tag'
import { borderColor, textColor } from '../../../css'
import { calcTotalTime } from '../../../util'
import type { CurrentTime } from '../../../types/CurrentTime'

const Container = styled.div`
  flex-basics: max-content;
  flex-grow: 3;
  color: ${textColor};
  font-size: 1.1em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  border: 1px solid ${borderColor};
  border-radius: 5px;
  margin: 0 10px;
`

const Text = styled.div``

type User = {
  id: string,
  clocks: Array<{
    id: string,
    clockIn: string
  }>
}

type GraphQLdata = {
  user: User,
  loading: boolean
}

type Props = {
  data: GraphQLdata,
  currentTime: CurrentTime
}

export class ClockinTime extends Component<Props> {
  formatDate: Function

  constructor(props: Props) {
    super(props)
    this.formatDate = this.formatDate.bind(this)
  }

  /**
   * @param str ISOString. e.g. '2017-12-10T14:31:10.501Z'
   * @returns {string} human readable string. e.g. '11:31 PM'
   */
  formatDate(str: string): string {
    const dateObj = new Date(str)

    const options = {
      hour: '2-digit',
      minute: '2-digit'
    }

    return dateObj.toLocaleTimeString('en-us', options)
  }

  render() {
    const { data } = this.props
    if (data.loading) return null

    const { user } = data
    const currentTime: CurrentTime = this.props.currentTime // from redux

    const now: Date = currentTime.dateObject
    const ClockinTimeISO: string = user.clocks[0].clockIn
    const past = new Date(ClockinTimeISO)

    const TotalTime = calcTotalTime(now, past)

    return (
      <Container data-test="clock-in-time">
        <Text>ClockIn</Text>
        <Text>{this.formatDate(ClockinTimeISO)}</Text>
        <Text>TotalTime</Text>
        <Text>{TotalTime}</Text>
      </Container>
    )
  }
}

const query = gql`
  query {
    user {
      id
      clocks(last: 1) {
        id
        clockIn
      }
    }
  }
`

const mapStateToProps = state => {
  return {
    currentTime: state.app.currentTime
  }
}

export default compose(connect(mapStateToProps), graphql(query))(ClockinTime)
