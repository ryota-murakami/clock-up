import styled from 'styled-components'
import { theme } from '../../theme'

export const Container = styled.main`
  @media (min-width: 768px) {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 50px 1fr;
    grid-template-areas:
      'header header header'
      'left left right';
    grid-column-gap: 10px;
  }

  @media (max-width: 767px) {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 100%;
    grid-template-areas: 'left';
    grid-column-gap: 0;
  }
`

export const Right = styled.div`
  grid-area: right;
  margin: 10px;
  border-radius: 5px;
  border: 1px solid ${theme.borderColor};
`

export const Left = styled.div`
  grid-area: left;
  margin: 10px;
  border-radius: 5px;
  border: 1px solid ${theme.borderColor};
`
