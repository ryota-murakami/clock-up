import { CLOCK_BOARD_QUERY, HISTORY_BOARD_QUERY } from './query'

describe('ClockBoardQuery', () => {
  it('should AST is not regression', () => {
    expect(CLOCK_BOARD_QUERY).toMatchSnapshot()
  })
})

describe('HistoryBoardQuery', () => {
  it('should AST is not regression', () => {
    expect(HISTORY_BOARD_QUERY).toMatchSnapshot()
  })
})
