// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import ClockinBtn from './ClockinBtn'
import ClockinTime from './ClockinTime'
import ClockoutBtn from './ClockoutBtn'

type Props = {
  data: Object
}

export class Control extends Component<Props> {
  render() {
    const { data } = this.props

    if (data.user.isDuringClockIn) {
      return (
        <Container>
          <ClockinTime data={data} />
          <ClockoutBtn data={data} />
        </Container>
      )
    } else {
      return (
        <Container>
          <ClockinBtn data={data} />
        </Container>
      )
    }
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 0 20px;
`

export default Control
