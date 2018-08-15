import styled from 'styled-components'
import { theme } from '../../../theme'

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

export const DeleteCheckbox = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 100%;
  border-style: solid;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.2);
`

export const DeleteCheckboxTr = styled.div`
  border-width: 0;
`

export const DeleteCheckboxTd = styled.div`
  border-width: 0;
`
