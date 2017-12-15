// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { borderColor, color } from '../cssVariables'

type Props = {
  data: Object
}

export class History extends Component<Props> {
  trimLvatest(data) {
    data.user.clocks.splice(0, 1)
  }

  render() {
    const { data } = this.props

    // this.trimLatest(data)
    // const history = data.user.clocks.map(i => {
    //   const clockIn = i.clockIn
    //   const clockout = i.clockOut
    //   const createdAt = i.createdAt
    //   const clockInDateObj = new Date(clockIn)
    //   const clockoutDateObj = new Date(clockout)
    //
    //   const diff = clockoutDateObj - clockInDateObj // milliseconds
    //   var msec = diff
    //   const hh = Math.floor(msec / 1000 / 60 / 60)
    //   msec -= hh * 1000 * 60 * 60
    //   const mm = Math.floor(msec / 1000 / 60)
    //   msec -= mm * 1000 * 60
    //   const ss = Math.floor(msec / 1000)
    //   msec -= ss * 1000
    //
    //   const total = hh + 'h' + mm + 'm' + ss + 's'
    //
    //   return (
    //     <tr>
    //       <td>{createdAt}</td>
    //       <td>{total}</td>
    //       <td>{clockIn}</td>
    //       <td>{clockout}</td>
    //     </tr>
    //   )
    // })

    return (
      <Container>
        <Header>History</Header>
        <table>
          <thead>
            <th>createdAt</th>
            <th>total</th>
            <th>clockIn</th>
            <th>clockout</th>
          </thead>
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
