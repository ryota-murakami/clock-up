import { getUserQuery } from './query'

describe('getUserQuery', () => {
  it('should AST is not regression', () => {
    expect(getUserQuery).toMatchSnapshot()
  })
})
