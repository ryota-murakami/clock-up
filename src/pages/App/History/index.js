// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { compose } from 'redux'
import { calcTotalTime, ISOtoYmd, ISOtoHm } from '../../../function'
import { Table, Tr, Td, Tbody, Th } from '../../../elements/Table'
import { Select } from '../../../elements/Select'
import InTime from './InTime'
import OutTime from './OutTime'
import { Container, SelectBoxWrapper, Header } from './index.style'
import type { Dispatch } from 'redux'
import type { Period } from '../../../dataType'
import type { ReduxAction } from '../../../action'
import type { HistoryQueryParameter } from '../../../dataType'
import type { ReduxState } from '../../../reducer'

type Clocks = Array<{
  id: string,
  clockIn: string,
  clockOut: string,
  createdAt: string,
  updatedAt: string
}>

type StateProps = {|
  historyQueryParameter: HistoryQueryParameter
|}

type Props = StateProps & {
  data: {
    user: { clocks: Clocks },
    loading: boolean
  },
  dispatch: Dispatch<ReduxAction>
}

export class History extends Component<Props> {
  renewGQL(value: Period) {
    this.props.dispatch({
      type: 'CHANGE_HISTORY',
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
            <tr key={i} enzyme-testid={`history-table-time-${i}`}>
              <Td>{ISOtoYmd(createdAt)}</Td>
              <Td>{total}</Td>
              <InTime date={ISOtoHm(clockIn)} />
              <OutTime date={ISOtoHm(clockout)} />
            </tr>
          )
        })
    }

    // clocks.length == 0 or clocks.lengh ===1 and clocks.[0] only has clockIn value without clockOut.
    if (history.length === 0) {
      history = (
        <Tr enzyme-testid="history-table-na">
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
        <Table enzyme-testid="history-table">
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

const mapStateProps = (state: ReduxState): StateProps => {
  return { historyQueryParameter: state.historyQueryParameter }
}

export default compose(
  connect(mapStateProps),
  graphql(UserClocksQuery, {
    options: ({ historyQueryParameter }) => {
      // $FlowFixMe
      return {
        variables: {
          first: historyQueryParameter.first,
          orderBy: historyQueryParameter.orderBy
        }
      }
    }
  })
)(History)
