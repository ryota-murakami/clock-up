// @flow
import React, { Component } from 'react'
import { compose, pure } from 'recompose'
import { graphql } from 'react-apollo'
import type { MutationFunc, MutationOpts } from 'react-apollo'
import { CLOCK_IN_MUTATION } from '../../../graphql/mutation'
import { CLOCK_BOARD_QUERY } from '../../../graphql/query'
import { StyledButton } from './ClockInButton.style'
import { theme } from '../../../theme'
import { today } from '../../../functions'
import type { CLOCK_BOARD_QUERY_TYPE, Day } from '../../../graphql/query'

type Props = {
  data: CLOCK_BOARD_QUERY_TYPE,
  CLOCK_IN_MUTATION: MutationFunc<*, *>
}

type MutationVariable = {
  userId: string,
  clockIn: string,
  day: Day
}

export class ClockInButton extends Component<Props> {
  gqlLogic = () => {
    const { data, CLOCK_IN_MUTATION } = this.props
    const userId = data.user.id

    const opt: MutationOpts<MutationVariable> = {
      variables: {
        userId: userId,
        clockIn: new Date().toISOString(),
        day: today()
      },
      update: (cache, res) => {
        if (res.data === undefined) {
          throw new Error('GQL Error: Mutation could not got respose cacheData')
        }

        const cacheData = cache.readQuery({ query: CLOCK_BOARD_QUERY })
        if (cacheData === null) {
          throw new Error('Apollo Cache Broken')
        }
        cacheData.user = res.data.updateUser
        cache.writeQuery({ query: CLOCK_BOARD_QUERY, data: cacheData })
      }
    }

    CLOCK_IN_MUTATION(opt)
  }

  render() {
    const { loading } = this.props.data
    if (loading) return null

    return (
      <StyledButton primary color={theme.green} onClick={this.gqlLogic}>
        Clock In
      </StyledButton>
    )
  }
}

export default compose(
  graphql(CLOCK_BOARD_QUERY),
  graphql(CLOCK_IN_MUTATION, {
    name: 'CLOCK_IN_MUTATION'
  }),
  pure
)(ClockInButton)
