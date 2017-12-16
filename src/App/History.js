// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { borderColor, color } from '../cssVariables'
import { calcTimeDiff, ISOtoHumanReadable, ISOtoYmd, ISOtoHm } from '../util'

type Props = {
  clocks: Array
}

export class History extends Component<Props> {
  render() {
    const { clocks } = this.props

    var history = ''
    if (clocks.length) {
      history = clocks
        .filter(v => {
          return v.clockOut !== null // during clock-in data
        })
        .map((v, i) => {
          const clockIn = v.clockIn
          const clockout = v.clockOut
          const createdAt = v.createdAt
          const small = new Date(clockIn)
          const large = new Date(clockout)
          const total = calcTimeDiff(large, small)

          return (
            <tr key={i}>
              <td>{ISOtoYmd(createdAt)}</td>
              <td>{total}</td>
              <td>{ISOtoHm(clockIn)}</td>
              <td>{ISOtoHm(clockout)}</td>
            </tr>
          )
        })
    } else {
      history = (
        <tr>
          <td>N/A</td>
          <td>N/A</td>
          <td>N/A</td>
          <td>N/A</td>
        </tr>
      )
    }

    return (
      <Container>
        <Header>History</Header>
        <Table>
          <tbody>
            <tr>
              <th>date</th>
              <th>total</th>
              <th>in</th>
              <th>out</th>
            </tr>
            {history}
          </tbody>
        </Table>
      </Container>
    )
  }
}

const Container = styled.div`
  color: ${color};
`

const Header = styled.div`
  padding: 10px 0;
  text-align: center;
  font-size: 1.2em;
  border-bottom: 1px solid ${borderColor};
`

const Table = styled.table`
  margin: 0 auto;
  padding: 10px;s
`

export default History
