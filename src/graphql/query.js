import gql from 'graphql-tag'

export const ClockBoardQuery = gql`
  query ClockBoardQuery {
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

export const HistoryBoardQuery = gql`
  query HistoryBoardQuery($first: Int, $orderBy: ClockOrderBy) {
    user {
      id
      clocks(first: $first, orderBy: $orderBy) {
        id
        clockIn
        clockOut
        createdAt
        updatedAt
      }
    }
  }
`
