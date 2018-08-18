// @flow
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { pure, compose } from 'recompose'
import styled from 'styled-components'
import { Button } from '../../../elements/Button'
import { theme } from '../../../theme'

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

type Props = {
  deleteClickIds: Array<string>
}

type State = {}

class DeleteButton extends Component<Props, State> {
  render() {
    const { deleteClickIds } = this.props

    return (
      <Container>
        {deleteClickIds.length ? (
          <Button color={theme.red}>Delete</Button>
        ) : null}
      </Container>
    )
  }
}

export default compose(pure)(DeleteButton)
