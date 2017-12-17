import styled, { css } from 'styled-components'
import { borderColor } from '../commonCSS'

const tableBorder = css`
  border: 1px solid ${borderColor};
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

export const Th = styled.th`
  ${tableBorder};
  ${tablePadding};
`

export const Td = styled.td`
  ${tableBorder};
  ${tablePadding};
`

export const Tbody = styled.tbody`
  tr:nth-child(even) > Td {
    background-color: #fafafa;
  }
`
