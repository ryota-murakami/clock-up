// @flow
import React from 'react'
import styled from 'styled-components'
import { BounceLoader } from 'react-spinners'

type Props = {}

export class Loading extends React.Component<Props> {
  render() {
    return (
      <Container>
        <BounceLoader color={'#36D7B7'} size={100} />
      </Container>
    )
  }
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export default Loading
