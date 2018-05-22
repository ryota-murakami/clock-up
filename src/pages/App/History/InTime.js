// @flow
import React from 'react'
import { Td } from '../../../elements/Table'

type Props = {|
  date: string
|}

export const InTime = ({ date }: Props) => {
  return <Td onClick={() => alert('click')}>{date}</Td>
}

export default InTime
