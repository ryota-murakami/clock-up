// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import ClockinBtn from './ClockinButton'
import ClockinTime from './ClockinTime'
import ClockoutBtn from './ClockoutButton'

type Props = {
  data: Object
}

export class Control extends Component<Props> {
  render() {
    const { data } = this.props

    if (data.user.isDuringClockIn) {
      return (
        <ClockoutContainer>
          <ClockinTime data={data} />
          <ClockoutBtn data={data} />
        </ClockoutContainer>
      )
    } else {
      return (
        <ClockinContainer>
          <ClockinBtn data={data} />
        </ClockinContainer>
      )
    }
  }
}

const ClockoutContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 20px;
`

const ClockinContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 0 20px;
`

export default Control
