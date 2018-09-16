// @flow
import React, { Component } from 'react'
import { compose, pure } from 'recompose'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { EDIT_CLOCK_OUT_MUTATION } from '../../../graphql/mutation'
import { ISOtoHm } from '../../../functions'
import { Td } from '../../../elements/Table'
import type { Dispatch } from 'redux'
import type { MutationFunc } from 'react-apollo'
import type { ReduxAction } from '../../../actionTypes'
import type { ReduxState } from '../../../reducer'

type State = {
  onInput: boolean
}

type StateProps = {}

type Props = {
  date: string
}

export class OutTime extends Component<Props> {
  handleClick() {
    // TODO show nunber input & timepicker
    return () => alert('OutTime')
    // TODO when decided, throw gql mutation
  }

  render() {
    const { date } = this.props
    return <Td onClick={this.handleClick()}>{date}</Td>
  }
}

export default compose(pure)(OutTime)
