// @flow
import React, { Component } from 'react'
import { pure, compose } from 'recompose'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Button } from '../../../components/Button'
import { theme } from '../../../theme'
import type { Dispatch } from 'redux'
import type { SHOW_DELETE_HISTORY_DIALOG } from '../../../types/action'

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

type Props = {
  checkedHistoryIdList: Array<string>,
  dispatch: Dispatch<SHOW_DELETE_HISTORY_DIALOG>
}

class DeleteButton extends Component<Props> {
  handleClick = () =>
    this.props.dispatch({ type: 'SHOW_DELETE_HISTORY_DIALOG' })

  render() {
    const { checkedHistoryIdList } = this.props

    return (
      <Container>
        {checkedHistoryIdList.length ? (
          <Button onClick={this.handleClick} color={theme.red}>
            Delete
          </Button>
        ) : null}
      </Container>
    )
  }
}

export default compose(
  connect(),
  pure
)(DeleteButton)
