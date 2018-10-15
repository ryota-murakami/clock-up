// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql, withApollo } from 'react-apollo'
import { pure, compose } from 'recompose'
import styled from 'styled-components'
import { Button } from '../../../components/Button'
import { theme } from '../../../theme'
import { DELETE_CLOCK_MUTATION } from '../../../graphql/mutation'
import type { MutationFunc } from 'react-apollo'
import { HISTORY_BOARD_QUERY } from '../../../graphql/query'
import type { Dispatch } from 'redux'
import type { ON_CLICK_HISTORY_DELETE_BUTTON } from '../../../types/action'

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

type Props = {
  dispatch: Dispatch<ON_CLICK_HISTORY_DELETE_BUTTON>,
  checkedHistoryIdList: Array<string>,
  DELETE_CLOCK_MUTATION: MutationFunc<*, *>
}

class DeleteButton extends Component<Props> {
  handleClick = (): void => {
    const { checkedHistoryIdList, DELETE_CLOCK_MUTATION, dispatch } = this.props
    dispatch({ type: 'ON_CLICK_HISTORY_DELETE_BUTTON' })

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
  withApollo,
  graphql(DELETE_CLOCK_MUTATION, { name: 'DELETE_CLOCK_MUTATION' }),
  pure
)(DeleteButton)
