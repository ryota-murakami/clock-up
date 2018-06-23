import styled from 'styled-components'
import { theme } from '../../color'

export const Container = styled.div`
  height: 25%;
  border: 1px solid ${theme.borderColor};
  margin: 20px;
  padding: 60px;
  border-radius: 5px;
`

export const Day = styled.div`
  height: 30%;
  color: ${theme.textColor};
  font-size: 1.5em;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const Time = styled.div`
  height: 70%;
  color: ${theme.textColor};
  font-size: 7em;
  text-align: center;
`
