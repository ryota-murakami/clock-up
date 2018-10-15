// @flow
import React from 'react'
import { pure } from 'recompose'
import styled from 'styled-components'
import { theme } from '../../theme'
import History from './History'

export const Container = styled.div`
  grid-area: right;
  margin: 10px;
  border-radius: 5px;
  border: 1px solid ${theme.borderColor};

  @media (max-width: 767px) {
    display: none;
  }
`

const Right = () => (
  <Container>
    <History />
  </Container>
)

export default pure(Right)
