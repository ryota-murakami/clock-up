// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { borderColor, color } from '../common/CSS'
import { calcTotalTime, ISOtoYmd, ISOtoHm } from '../common/util'
import { Table, Td, Tbody, Th } from '../common/components/Table'

type Props = {
  clocks: Array
}

export class History extends Component<Props> {
  render() {
    const { clocks } = this.props

    var history = ''
    // must have complate clock in/out. not allow only clock in data of first time.
    if (clocks.length && clocks[0].clockOut !== null) {
      history = clocks.map((v, i) => {
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
    } else {
      history = (
        <tr>
          <Td>N/A</Td>
          <Td>N/A</Td>
          <Td>N/A</Td>
          <Td>N/A</Td>
        </tr>
      )
    }

    return (
      <Container>
        <Header>History</Header>
        <Table>
          <Tbody>
            <tr>
              <Th>date</Th>
              <Th>total</Th>
              <Th>in</Th>
              <Th>out</Th>
            </tr>
            {history}
          </Tbody>
        </Table>
      </Container>
    )
  }
}

const Container = styled.div`
  color: ${color};
`

const Header = styled.div`
  margin-bottom: 10px;
  padding: 10px 0;
  text-align: center;
  font-size: 1.2em;
  border-bottom: 1px solid ${borderColor};
`

export default History
