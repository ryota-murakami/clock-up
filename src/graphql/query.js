// @flow
import gql from 'graphql-tag'
import type { GraphqlQueryControls } from 'react-apollo'

// GraphQL ENUMS type
export type Day =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday'

export type CLOCK_BOARD_QUERY_TYPE = {
  ...GraphqlQueryControls<>,
  user: {
    id: string,
    isDuringClockIn: boolean,
    clocks: Array<{
      id: string,
      clockIn: string,
      clockOut: string
    }>
  }
}

export const CLOCK_BOARD_QUERY = gql`
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

export type HISTORY_BOARD_QUERY_TYPE = {
  ...GraphqlQueryControls<>,
  user: {
    id: string,
    clocks: Array<{
      id: string,
      clockIn: string | null,
      clockOut: string,
      createdAt: string,
      updatedAt: string
    }>
  }
}

export const HISTORY_BOARD_QUERY = gql`
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
