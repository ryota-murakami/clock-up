// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { borderColor, color } from '../cssVariables'
import { calcTimeDiff } from '../util'

type Props = {
  clocks: Array
}

export class History extends Component<Props> {
  render() {
    const { clocks } = this.props

    var history = ''
    if (clocks.length) {
      history = clocks.map((v, i) => {
        const clockIn = v.clockIn
        const clockout = v.clockOut
        const createdAt = v.createdAt
        const small = new Date(clockIn)
        const large = new Date(clockout)
        const total = calcTimeDiff(large, small)

        return (
          <tr key={i}>
            <td>{createdAt}</td>
            <td>{total}</td>
            <td>{clockIn}</td>
            <td>{clockout}</td>
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
        <table>
          <tbody>
            <tr>
              <th>createdAt</th>
              <th>total</th>
              <th>clockIn</th>
              <th>clockout</th>
            </tr>
            {history}
          </tbody>
        </table>
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

export default History
