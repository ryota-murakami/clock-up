// @flow
import React, { Component } from 'react'
import type { MutationFunc } from 'react-apollo'
import { ClockBoardQuery } from '../../../graphql/query'
import { graphql } from 'react-apollo'
import { ClockOutMutation } from '../../../graphql/mutation'
import { compose } from 'redux'
import { Button } from '../../../elements/Button'
import { theme } from '../../../color'
import type { ClockBoardQueryType } from '../../../graphql/query'

type Props = {|
  data: ClockBoardQueryType,
  ClockOutMutation: MutationFunc<*, *>
|}

export class ClockoutButton extends Component<Props> {
  gqlLogic: Function

  constructor(props: Props): void {
    super(props)
    this.gqlLogic = this.gqlLogic.bind(this) // avoid Class properties arrow function bind in order to test mocking
  }

  gqlLogic(): void {
    const { data, ClockOutMutation } = this.props

    const userId = data.user.id
    const clockId = data.user.clocks[0].id

    // $FlowIssue
    ClockOutMutation({
      variables: {
        clockId: clockId,
        userId: userId,
        clockOut: new Date().toISOString()
      }
    }).catch(e => {
      console.log(e)
      alert('error occurred when updateClock on clockout')
    })
  }

  render() {
    const { data } = this.props
    if (data.loading) return null

    return (
      <Button
        primary
        color={theme.red}
        onClick={this.gqlLogic}
        enzyme-testid="clock-out-btn"
      >
        clock out
      </Button>
    )
  }
}

export default compose(
  graphql(ClockBoardQuery),
  graphql(ClockOutMutation, {
    name: 'ClockOutMutation'
  })
)(ClockoutButton)
