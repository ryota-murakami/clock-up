// @flow
import React from 'react'
import { pure } from 'recompose'
import styled from 'styled-components'
import { theme } from '../../theme'
import Clock from './Clock'
import ClockIn_ClockOut_Button from './ClockIn_ClockOut_Button'
import type { CurrentTime } from '../../types/data'

const Container = styled.div`
  grid-area: left;
  margin: 10px;
  border-radius: 5px;
  border: 1px solid ${theme.borderColor};
`

type Props = {
  currentTime: CurrentTime
}

const Left = (props: Props) => {
  const { currentTime } = props

  return (
    <Container>
      <Clock currentTime={currentTime} />
      {/*eslint-disable react/jsx-pascal-case*/}
      <ClockIn_ClockOut_Button currentTime={currentTime} />
    </Container>
  )
}

export default pure<*>(Left)
