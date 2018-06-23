import { CreateUserMutation, ClockInMutation } from './mutation'

describe('CreateUserMutation', () => {
  it('should AST is not regression', () => {
    expect(CreateUserMutation).toMatchSnapshot()
  })
})

describe('ClockInMutation', () => {
  it('should AST is not regression', () => {
    expect(ClockInMutation).toMatchSnapshot()
  })
})
