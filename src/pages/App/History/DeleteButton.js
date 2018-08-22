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
import type { HistoryGQLParam } from '../../../dataTypes'
import type { Dispatch } from 'redux'
import type { PushHistoryDeleteButton } from '../../../actionTypes'

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

type StateProps = {|
  historyGQLParam: HistoryGQLParam
|}

type Props = {
  ...StateProps,
  dispatch: Dispatch<PushHistoryDeleteButton>,
  checkedHistoryIdList: Array<string>,
  DeleteClockMutation: MutationFunc<*, *>
}

class DeleteButton extends Component<Props> {
  handleClick = () => {
    const {
      checkedHistoryIdList,
      DeleteClockMutation,
      historyGQLParam,
      dispatch
    } = this.props
    dispatch({ type: 'PUSH_HISTORY_DELETE_BUTTON' })

    checkedHistoryIdList.forEach(id => {
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
              first: historyGQLParam.first,
              orderBy: historyGQLParam.orderBy
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
              first: historyGQLParam.first,
              orderBy: historyGQLParam.orderBy
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

const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    historyGQLParam: state.historyGQLParam
  }
}

export default compose(
  connect(mapStateToProps),
  withApollo,
  graphql(DELETE_CLOCK_MUTATION, { name: 'DeleteClockMutation' }),
  pure
)(DeleteButton)
