import gql from 'graphql-tag'

export const fetchUserQuery = gql`
  query FetchUserQuery {
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
