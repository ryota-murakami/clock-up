import styled from 'styled-components'
import { theme } from '../color'

export const Header = styled.div`
  padding: 0 30px;
  grid-area: header;
  border-bottom: 1px solid ${theme.borderColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`
