// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { borderColor } from '../cssVariables'

type Props = {}

export class CurrentDateTime extends Component<Props> {
  render() {
    return (
      <Container>
        <Day>Wednesday Nov 22 2017</Day>
        <Time>3:14</Time>
      </Container>
    )
  }
}

const Container = styled.div`
  height: 50%;
  border: 1px solid ${borderColor};
  margin: 20px;
  border-radius: 5px;
`

const Day = styled.div``

const Time = styled.div``

export default CurrentDateTime
