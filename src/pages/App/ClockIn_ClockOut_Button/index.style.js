import styled from 'styled-components'

export const ClockOutContainer = styled.div`
  @media (min-width: 768px) {
    width: 93.4%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 0 20px;
  }

  @media (max-width: 767px) {
    width: 93.4%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

export const ClockInContainer = styled.div`
  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 0 20px;
  }

  @media (max-width: 767px) {
    width: 93.4%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`
