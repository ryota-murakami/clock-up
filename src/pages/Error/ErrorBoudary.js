// @flow
import React, { Component } from 'react'
import ErrorBoundaryFallbackComponent from './ErrorBoundaryFallbackComponent'

type Props = {|
  children: React$Node
|}

type State = {|
  error: ?Error,
  info: ?any
|}

class ErrorBoudary extends Component<Props, State> {
  state = {
    error: null,
    info: null
  }

  componentDidCatch(error: Error, info: any): void {
    this.setState({ error, info })
  }

  render() {
    const { error } = this.state
    if (error) {
      return <ErrorBoundaryFallbackComponent />
    }
    return this.props.children
  }
}

export default ErrorBoudary
