// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { borderColor, textColor } from '../common/CSS'
import { calcTotalTime, ISOtoYmd, ISOtoHm } from '../common/util'
import { Table, Tr, Td, Tbody, Th } from '../common/components/Table'
import { Select } from '../common/components/Select'

type Props = {
  clocks: Array<Object>
}

export class History extends Component<Props> {
  render() {
    const { clocks } = this.props

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

    // TODO 表示期間を変更するセレクトボックスを追加
    return (
      <Container>
        <Header>History</Header>
        <SelectBoxWrapper>
          <Select>
            <option>latest 1week</option>
            <option selected>latest 1month</option>
            <option>2018/01</option>
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

export default History
