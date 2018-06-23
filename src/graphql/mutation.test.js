import {
  CreateUserMutation,
  ClockInMutation,
  ClockOutMutation
} from './mutation'

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

describe('ClockOutMutation', () => {
  it('should AST is not regression', () => {
    expect(ClockOutMutation).toMatchSnapshot()
  })
})
