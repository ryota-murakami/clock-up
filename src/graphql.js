import gql from 'graphql-tag'

export const fetchUserQuery = gql`
  query FetchUserQuery {
    user {
      id
      isDuringClockIn
      clocks(first: 10, orderBy: createdAt_DESC) {
        id
        clockIn
        clockOut
        createdAt
        updatedAt
      }
    }
  }
`
