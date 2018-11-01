// @flow
import React, { Component } from 'react'
import { pure } from 'recompose'
import styled from 'styled-components'

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

// TODO style
const StyledSelect = styled.select``

type Props = {}

class HistoryFilter extends Component<Props> {
  render() {
    return (
      <Container>
        <StyledSelect defaultValue={'1week'}>
          <option value="1week">1week</option>
          <option value="1month">1month</option>
          <option value="all">all</option>
        </StyledSelect>
      </Container>
    )
  }
}

export default pure<*>(HistoryFilter)
