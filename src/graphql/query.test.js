import { ClockBoardQuery, HistoryBoardQuery } from './query'

describe('ClockBoardQuery', () => {
  it('should AST is not regression', () => {
    expect(ClockBoardQuery).toMatchSnapshot()
  })
})

describe('HistoryBoardQuery', () => {
  it('should AST is not regression', () => {
    expect(HistoryBoardQuery).toMatchSnapshot()
  })
})
