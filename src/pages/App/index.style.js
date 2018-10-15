import styled from 'styled-components'

export const Container = styled.main`
  @media (min-width: 768px) {
    width: 100%;
    max-width: 1180px;
    margin: 0 auto;
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
