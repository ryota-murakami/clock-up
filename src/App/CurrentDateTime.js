// @flow
import React, { Component } from 'react'
import styled from 'styled-components'

type Props = {}

export class CurrentDateTime extends Component<Props> {
  render() {
    return <Main>CurrentDateTime</Main>
  }
}

const Main = styled.div`
  margin: 0 auto;
`

export default CurrentDateTime
