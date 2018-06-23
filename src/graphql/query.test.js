import { ClockBoardQuery, HistoryBoardQuery } from './query'

describe('ClockBoardQuery', () => {
  it('should AST is not regression', () => {
    expect(ClockBoardQuery).toMatchSnapshot()
  })
})

describe('HistoryBoardQuery', () => {
  expect(HistoryBoardQuery).toMatchSnapshot()
})
