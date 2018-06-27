import {
  CREATE_USER_MUTATION,
  CLOCK_IN_MUTATION,
  CLOCK_OUT_MUTATION
} from './mutation'

describe('CreateUserMutation', () => {
  it('should AST is not regression', () => {
    expect(CREATE_USER_MUTATION).toMatchSnapshot()
  })
})

describe('ClockInMutation', () => {
  it('should AST is not regression', () => {
    expect(CLOCK_IN_MUTATION).toMatchSnapshot()
  })
})

describe('ClockOutMutation', () => {
  it('should AST is not regression', () => {
    expect(CLOCK_OUT_MUTATION).toMatchSnapshot()
  })
})
