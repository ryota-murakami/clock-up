// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { compose } from 'redux'
import { borderColor, textColor } from '../../css'
import { calcTotalTime, ISOtoYmd, ISOtoHm } from '../../util'
import { Table, Tr, Td, Tbody, Th } from '../../elements/Table'
import { Select } from '../../elements/Select'
import { type } from '../../types/ReduxAction'
import type { Dispatch } from 'redux'
import type { HistoryQueryParameter } from '../../types/ReduxState'
import type { RootReduxState } from '../../types/ReduxState'
import type { Period, ReduxAction } from '../../types/ReduxAction'

const Container = styled.div`
  color: ${textColor};
`
const SelectBoxWrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`
const Header = styled.div`
  padding: 10px 0;
  text-align: center;
  font-size: 1.2em;
  border-bottom: 1px solid ${borderColor};
`

type Clocks = Array<{
  id: string,
  clockIn: string,
  clockOut: string,
  createdAt: string,
  updatedAt: string
}>

type Props = {
  data: {
    user: { clocks: Clocks },
    loading: boolean
  },
  historyQueryParameter: HistoryQueryParameter,
  dispatch: Dispatch<ReduxAction>
}

export class History extends Component<Props> {
  renewGQL(value: Period) {
    this.props.dispatch({
      type: type.CHANGE_HISTORY,
      period: value
    })
  }

  render() {
    const { loading } = this.props.data
    if (loading) return null

    const { clocks } = this.props.data.user

    var history = []
    if (clocks.length) {
      history = clocks
        // must have complate clock in/out. not allow only clock in data of first time.
        .filter(v => {
          return v.clockOut !== null // during clock-in data. can not calculate totalTime when clockout was null.
        })
        .map((v, i) => {
          const clockIn = v.clockIn
          const clockout = v.clockOut
          const createdAt = v.createdAt
          const small = new Date(clockIn)
          const large = new Date(clockout)
          const total = calcTotalTime(large, small)

          return (
            <tr key={i}>
              <Td>{ISOtoYmd(createdAt)}</Td>
              <Td>{total}</Td>
              <Td>{ISOtoHm(clockIn)}</Td>
              <Td>{ISOtoHm(clockout)}</Td>
            </tr>
          )
        })
    }

    // clocks.length == 0 or clocks.lengh ===1 and clocks.[0] only has clockIn value without clockOut.
    if (history.length === 0) {
      history = (
        <Tr>
          <Td>N/A</Td>
          <Td>N/A</Td>
          <Td>N/A</Td>
          <Td>N/A</Td>
        </Tr>
      )
    }

    return (
      <Container>
        <Header>History</Header>
        <SelectBoxWrapper>
          <Select
            onChange={e => this.renewGQL(e.target.value)}
            defaultValue={'1week'}
          >
            <option value="1week">1week</option>
            <option value="1month">1month</option>
            <option value="all">all</option>
          </Select>
        </SelectBoxWrapper>
        <Table>
          <Tbody>
            <Tr>
              <Th>date</Th>
              <Th>total</Th>
              <Th>in</Th>
              <Th>out</Th>
            </Tr>
            {history}
          </Tbody>
        </Table>
      </Container>
    )
  }
}

const UserClocksQuery = gql`
  query FetchUserClocks($first: Int, $orderBy: ClockOrderBy) {
    user {
      id
      clocks(first: $first, orderBy: $orderBy) {
        id
        clockIn
        clockOut
        createdAt
        updatedAt
      }
    }
  }
`

const mapStateToProps = (state: RootReduxState) => {
  return { historyQueryParameter: state.app.historyQueryParameter }
}

export default compose(
  connect(mapStateToProps),
  graphql(UserClocksQuery, {
    options: ({ historyQueryParameter }) => {
      return {
        variables: {
          first: historyQueryParameter.first,
          orderBy: historyQueryParameter.orderBy
        }
      }
    }
  })
)(History)
