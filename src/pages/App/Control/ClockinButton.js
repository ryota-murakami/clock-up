// @flow
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import type { MutationFunc } from 'react-apollo'
import { ClockInMutation } from '../../../graphql/mutation'
import { ClockBoardQuery } from '../../../graphql/query'
import { compose } from 'redux'
import { Button } from '../../../elements/Button'
import { theme } from '../../../color'
import type { ClockBoardQueryType } from '../../../graphql/query'

type Props = {|
  data: ClockBoardQueryType,
  ClockInMutation: MutationFunc<*, *>
|}

export class ClockinButton extends Component<Props> {
  gqlLogic: Function

  constructor(props: Props) {
    super(props)
    this.gqlLogic = this.gqlLogic.bind(this) // avoid Class properties arrow function bind in order to test mocking
  }

  gqlLogic(): void {
    const { data, ClockInMutation } = this.props
    const userId = data.user.id

    // $FlowIssue
    ClockInMutation({
      variables: { userId: userId, clockIn: new Date().toISOString() },
      update: (proxy, { data: { updateUser } }) => {
        const data = proxy.readQuery({ query: ClockBoardQuery })
        // $FlowIssue
        data.user = updateUser
        proxy.writeQuery({ query: ClockBoardQuery, data })
      }
    })
  }

  render() {
    const { loading } = this.props.data
    if (loading) return null

    return (
      <Button
        primary
        color={theme.green}
        onClick={this.gqlLogic}
        enzyme-testid="clock-in-btn"
      >
        Clock In
      </Button>
    )
  }
}

export default compose(
  graphql(ClockBoardQuery),
  graphql(ClockInMutation, {
    name: 'ClockInMutation'
  })
)(ClockinButton)
