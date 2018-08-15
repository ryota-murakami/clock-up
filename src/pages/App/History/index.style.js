import styled from 'styled-components'
import { theme } from '../../../theme'
import { Td, Th } from '../../../elements/Table'

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

  &:hover {
    background-color: #000;
  }
`

export const DeleteCheckboxTh = styled(Th)`
  width: 30px;
  border-width: 0;
`

export const DeleteCheckboxTd = styled(Td)`
  width: 30px;
  border-width: 0;
  background-color: #fff !important;
  display: flex;
  justify-content: center;
  align-items: center;
`
