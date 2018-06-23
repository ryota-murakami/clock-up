import styled from 'styled-components'
import { theme } from '../../../constant'

export const Container = styled.div`
  color: ${theme.textColor};
`

export const SelectBoxWrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export const Header = styled.div`
  padding: 10px 0;
  text-align: center;
  font-size: 1.2em;
  border-bottom: 1px solid ${theme.borderColor};
`
