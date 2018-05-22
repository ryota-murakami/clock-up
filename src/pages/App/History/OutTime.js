// @flow
import React from 'react'
import { Td } from '../../../elements/Table'

type Props = {|
  date: string
|}

export const OutTime = ({ date }: Props) => {
  return <Td onClick={() => alert('OutTime')}>{date}</Td>
}

export default OutTime
