import { ClockBoardQuery } from './query'

describe('getUserQuery', () => {
  it('should AST is not regression', () => {
    expect(ClockBoardQuery).toMatchSnapshot()
  })
})
