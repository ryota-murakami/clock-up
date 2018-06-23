import styled from 'styled-components'
import { theme } from '../../../constant'

export const Container = styled.div`
  flex-basics: max-content;
  flex-grow: 3;
  color: ${theme.textColor};
  font-size: 1.1em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  border: 1px solid ${theme.borderColor};
  border-radius: 5px;
  margin-right: 10px;
`
