// @flow
import React from 'react'
import styled from 'styled-components'
import { BounceLoader } from 'react-spinners'

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export function Loading() {
  return (
    <Container>
      <BounceLoader color={'#36D7B7'} size={100} />
    </Container>
  )
}

export default Loading
