import gql from 'graphql-tag'
import type { GraphqlQueryControls } from 'react-apollo'

export type ClockBoardQueryType = GraphqlQueryControls & {|
  user: ?{
    id: string,
    isDuringClockIn: boolean,
    clocks: Array<{
      id: string,
      clockIn: string,
      clockOut: string
    }>
  }
|}

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

export type HistoryBoardQueryType = GraphqlQueryControls & {|
  user: ?{
    id: string,
    clocks: Array<{
      id: string,
      clockIn: string,
      clockOut: string,
      createdAt: string,
      updatedAt: string
    }>
  }
|}

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
