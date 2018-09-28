// @flow
import React from 'react'
import styled from 'styled-components'
import { theme } from './../../theme'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Message = styled.div`
  padding: 40px;
  border: 2px ${theme.gray} solid;
  border-radius: 5px;
  font-size: 24px;
  color: ${theme.textColor};
`

const ErrorBoundaryFallbackComponent = (): React$Node => (
  <Container>
    <Message>
      Something Error Ooccurring
      <span role="img" aria-label="face-emoji">
        😞
      </span>
    </Message>
  </Container>
)
export default ErrorBoundaryFallbackComponent
