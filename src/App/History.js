// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { borderColor, color } from '../cssVariables'

type Props = {}

export class History extends Component<Props> {
  render() {
    return (
      <Container>
        <Header>History</Header>
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
// TODO Clockテーブルのデータを直近10個ほど取得する

export default History
