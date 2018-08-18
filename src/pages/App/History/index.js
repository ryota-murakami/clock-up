// @flow
import React, { Component } from 'react'
import { compose, pure } from 'recompose'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { HISTORY_BOARD_QUERY } from '../../../graphql/query'
import { calcTotalTime, ISOtoYmd, ISOtoHm } from '../../../functions'
import { Table, Tr, Td, Tbody, Th } from '../../../elements/Table'
import InTime from './InTime'
import OutTime from './OutTime'
import Select from './Select'
import DeleteCheckbox from './DeleteCheckbox'
import DeleteButton from './DeleteButton'
import {
  Container,
  ControlArea,
  Header,
  DeleteCheckboxTh,
  DeleteCheckboxTd
} from './index.style'
import type { Dispatch } from 'redux'
import type { ReduxAction } from '../../../actionTypes'
import type { HistoryQueryParameter } from '../../../dataTypes'
import type { ReduxState } from '../../../reducer'
import type { HISTORY_BOARD_QUERY_TYPE } from '../../../graphql/query'

type StateProps = {|
  historyQueryParameter: HistoryQueryParameter,
  deleteClickIds: Array<string>
|}

type Props = {
  ...StateProps,
  ...HISTORY_BOARD_QUERY_TYPE,
  dispatch: Dispatch<ReduxAction>
}

class History extends Component<Props> {
  render() {
    const { loading } = this.props.data
    if (loading) return null

    const { clocks } = this.props.data.user

    var history = []
    if (clocks.length) {
      const filtered = clocks
        // must have complate clock in/out. not allow only clock in data of first time.
        .filter(v => {
          return v.clockOut !== null // during clock-in data. can not calculate totalTime when clockout was null.
        })
      const length = filtered.length

      history = filtered.map((v, i) => {
        const clockIn = v.clockIn
        const clockout = v.clockOut
        const createdAt = v.createdAt
        const clockId = v.id
        const small = new Date(clockIn)
        const large = new Date(clockout)
        const total = calcTotalTime(large, small)

        return (
          <tr style={this.bottomBoerderEliminator(length, i)} key={i}>
            <DeleteCheckboxTd style={this.bottomBoerderEliminator(length, i)}>
              <DeleteCheckbox clockId={clockId} />
            </DeleteCheckboxTd>
            <Td>{ISOtoYmd(createdAt)}</Td>
            <Td>{total}</Td>
            <InTime clockIn={clockIn} clockId={clockId} />
            <OutTime date={ISOtoHm(clockout)} />
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
        <ControlArea>
          <Select />
          <DeleteButton deleteClickIds={this.props.deleteClickIds} />
        </ControlArea>
        <Table style={{ borderLeftWidth: 0 }}>
          <Tbody>
            <Tr>
              <DeleteCheckboxTh> </DeleteCheckboxTh>
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

  bottomBoerderEliminator(length: number, i: number): Object {
    return length === i + 1
      ? {
          borderBottomWidth: 1,
          borderBottomColor: '#fff',
          borderBottomStyle: 'solid'
        }
      : {}
  }
}

const mapStateProps = (state: ReduxState): StateProps => {
  return {
    historyQueryParameter: state.historyQueryParameter,
    deleteClickIds: state.deleteClickIds
  }
}

export default compose(
  connect(mapStateProps),
  graphql(HISTORY_BOARD_QUERY, {
    options: ({ historyQueryParameter }) => {
      // $FlowFixMe
      return {
        variables: {
          first: historyQueryParameter.first,
          orderBy: historyQueryParameter.orderBy
        }
      }
    }
  }),
  pure
)(History)
