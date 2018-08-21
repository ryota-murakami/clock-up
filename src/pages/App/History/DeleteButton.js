// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql, withApollo } from 'react-apollo'
import { pure, compose } from 'recompose'
import styled from 'styled-components'
import { Button } from '../../../elements/Button'
import { theme } from '../../../theme'
import { DELETE_CLOCK_MUTATION } from '../../../graphql/mutation'
import type { MutationFunc } from 'react-apollo'
import { HISTORY_BOARD_QUERY } from '../../../graphql/query'
import type { ReduxState } from '../../../reducer'
import type { HistoryQueryParameter } from '../../../dataTypes'
import type { Dispatch } from 'redux'
import type { PushHistoryDeleteButton } from '../../../actionTypes'

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

type StateProps = {|
  historyQueryParameter: HistoryQueryParameter
|}

type Props = {
  ...StateProps,
  dispatch: Dispatch<PushHistoryDeleteButton>,
  deleteClickIds: Array<string>,
  DeleteClockMutation: MutationFunc<*, *>
}

class DeleteButton extends Component<Props> {
  handleClick = () => {
    const {
      deleteClickIds,
      DeleteClockMutation,
      historyQueryParameter,
      dispatch
    } = this.props
    dispatch({ type: 'PUSH_HISTORY_DELETE_BUTTON' })

    deleteClickIds.forEach(id => {
      // $FlowIssue
      DeleteClockMutation({
        variables: { clockId: id },

        /**
         * START: refrect mutation to UI
         */
        update: (cache, { data: { deleteClock } }) => {
          const data = cache.readQuery({
            query: HISTORY_BOARD_QUERY,
            variables: {
              first: historyQueryParameter.first,
              orderBy: historyQueryParameter.orderBy
            }
          })
          // $FlowIssue
          const oldClicks = data.user.clocks
          const newClocks = oldClicks.filter(v => v.id !== id)

          // hack https://stackoverflow.com/questions/27519836/uncaught-typeerror-cannot-assign-to-read-only-property
          // $FlowIssue
          const newUser = { ...data.user, writable: true }
          const newData = { user: newUser }
          newData.user.clocks = newClocks
          // hack https://stackoverflow.com/questions/27519836/uncaught-typeerror-cannot-assign-to-read-only-property

          cache.writeQuery({
            query: HISTORY_BOARD_QUERY,
            variables: {
              first: historyQueryParameter.first,
              orderBy: historyQueryParameter.orderBy
            },
            data: newData
          })
          /**
           * END: refrect mutation to UI
           */
        }
      })
    })
  }

  render() {
    const { deleteClickIds } = this.props

    return (
      <Container>
        {deleteClickIds.length ? (
          <Button onClick={this.handleClick} color={theme.red}>
            Delete
          </Button>
        ) : null}
      </Container>
    )
  }
}

const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    historyQueryParameter: state.historyQueryParameter
  }
}

export default compose(
  connect(mapStateToProps),
  withApollo,
  graphql(DELETE_CLOCK_MUTATION, { name: 'DeleteClockMutation' }),
  pure
)(DeleteButton)
