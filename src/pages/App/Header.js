// @flow
import React from 'react'
import { pure } from 'recompose'
import styled from 'styled-components'
import { theme } from '../../theme'
import LogoutButton from './LogoutButton'

export const StyledHeader = styled.div`
  padding: 0 30px;
  grid-area: header;
  border-bottom: 1px solid ${theme.borderColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  @media (max-width: 767px) {
    display: none;
  }
`

const Header = () => (
  <StyledHeader>
    <LogoutButton />
  </StyledHeader>
)

export default pure(Header)
