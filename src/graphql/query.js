import gql from 'graphql-tag'

export const getUserQuery = gql`
  query getUserQuery {
    user {
      id
      isDuringClockIn
      clocks(last: 1) {
        id
        clockIn
        clockOut
      }
    }
  }
`
