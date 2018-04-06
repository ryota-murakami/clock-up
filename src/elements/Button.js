import styled from 'styled-components'

export const Button = styled.button`
  color: ${props => (props.primary ? '#ffffff' : props.color)};
  background-color: ${props => (props.primary ? props.color : '#ffffff')};
  font-size: 1em;
  line-height: 28px;
  padding: 0.25em 1em;
  border-radius: 3px;
  border: 2px solid ${props => props.color};
  cursor: pointer;
  &:focus {
    outline: 0;
  }
`
