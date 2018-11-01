// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { compose, pure } from 'recompose'
import { HISTORY_BOARD_QUERY } from '../../../graphql/query'
import { connect } from 'react-redux'
import { graphql, withApollo } from 'react-apollo'
import type { CLICK_HISTORY_DELETE_BUTTON } from '../../../types/action'
import { DELETE_CLOCK_MUTATION } from '../../../graphql/mutation'
import type { MutationFunc } from 'react-apollo'
import type { Dispatch } from 'redux'

const Container = styled.div``

type Props = {
  dispatch: Dispatch<CLICK_HISTORY_DELETE_BUTTON>,
  checkedHistoryIdList: Array<string>,
  DELETE_CLOCK_MUTATION: MutationFunc<*, *>
}

class DeleteDialog extends Component<Props> {
  handleClick = (): void => {
    const { checkedHistoryIdList, DELETE_CLOCK_MUTATION, dispatch } = this.props
    dispatch({ type: 'CLICK_HISTORY_DELETE_BUTTON' })

    checkedHistoryIdList.forEach(id => {
      DELETE_CLOCK_MUTATION({
        variables: { clockId: id },

        /**
         * START: refrect mutation to UI
         */
        update: (cache, { data: { deleteClock } }) => {
          const data = cache.readQuery({
            query: HISTORY_BOARD_QUERY
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
    return (
      <Container>
        <button onclick={this.handleClick()}>delete</button>
      </Container>
    )
  }
}

export default compose(
  connect(),
  c => withApollo<*>(c),
  graphql(DELETE_CLOCK_MUTATION, { name: 'DELETE_CLOCK_MUTATION' }),
  pure
)(DeleteDialog)
