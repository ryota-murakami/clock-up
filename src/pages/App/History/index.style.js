import styled from 'styled-components'
import { theme } from '../../../theme'
import { Td, Th } from '../../../components/Table'

export const Container = styled.div`
  color: ${theme.textColor};
  padding-left: 5px;
  padding-right: 5px;
`

export const ControlArea = styled.div`
  padding: 10px;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const Header = styled.div`
  padding: 10px 0;
  text-align: center;
  font-size: 1.2em;
  border-bottom: 1px solid ${theme.borderColor};
`

export const DeleteCheckboxTh = styled(Th)`
  width: 30px;
  border-width: 0;
  border-top-width: 1px;
  border-top-color: #fff;
  border-top-style: solid;
`

export const DeleteCheckboxTd = styled(Td)`
  width: 30px;
  border-width: 0;
  background-color: #fff !important;
  display: flex;
  justify-content: center;
  align-items: center;
`
