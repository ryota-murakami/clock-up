import styled, { css } from 'styled-components'
import { theme } from '../../../theme'

const tableBorder = css`
  border: 1px solid ${theme.borderColor};
  border-collapse: collapse;
`
const tablePadding = css`
  padding: 10px 8px;
`
export const Table = styled.table`
  margin: 0 auto;
  padding: 10px;
  ${tableBorder};
`
export const Tr = styled.tr``
export const Th = styled.th`
  ${tableBorder};
  ${tablePadding};
`
export const Td = styled.td`
  white-space: nowrap;
  ${tableBorder};
  ${tablePadding};
`
export const Tbody = styled.tbody`
  tr:nth-child(even) > td {
    background-color: #fafafa;
  }
`

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
