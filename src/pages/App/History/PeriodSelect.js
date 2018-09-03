// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { pure, compose } from 'recompose'
import styled from 'styled-components'
import type { Period } from '../../../dataTypes'
import type { Dispatch } from 'redux'
import type { ChangeHistoryAction } from '../../../actionTypes'

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledSelect = styled.select``

type Props = {
  dispatch: Dispatch<ChangeHistoryAction>
}

class PeriodSelect extends Component<Props> {
  renewGQL(value: Period) {
    this.props.dispatch({
      type: 'CHANGE_HISTORY_FILTER',
      period: value
    })
  }

  render() {
    return (
      <Container>
        <StyledSelect
          onChange={e => this.renewGQL(e.target.value)}
          defaultValue={'1week'}
        >
          <option value="1week">1week</option>
          <option value="1month">1month</option>
          <option value="all">all</option>
        </StyledSelect>
      </Container>
    )
  }
}

export default compose(
  connect(),
  pure
)(PeriodSelect)