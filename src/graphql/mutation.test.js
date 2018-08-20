import {
  CREATE_USER_MUTATION,
  CLOCK_IN_MUTATION,
  CLOCK_OUT_MUTATION,
  EDIT_CLOCK_IN_MUTATON,
  DELETE_CLOCK_MUTATION
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

describe('EditClockInMutation', () => {
  it('should AST is not regression', () => {
    expect(EDIT_CLOCK_IN_MUTATON).toMatchSnapshot()
  })
})

describe('DeleteClockMutation', () => {
  it('should AST is not regression', () => {
    expect(DELETE_CLOCK_MUTATION).toMatchSnapshot()
  })
})
