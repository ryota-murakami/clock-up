import {
  CREATE_USER_MUTATION,
  CLOCK_IN_MUTATION,
  CLOCK_OUT_MUTATION,
  EDIT_CLOCK_IN_MUTATON,
  DELETE_CLOCK_MUTATION,
  EDIT_CLOCK_OUT_MUTATION
} from './mutation'

describe('CREATE_USER_MUTATION', () => {
  it('should AST is not regression', () => {
    expect(CREATE_USER_MUTATION).toMatchSnapshot()
  })
})

describe('CLOCK_IN_MUTATION', () => {
  it('should AST is not regression', () => {
    expect(CLOCK_IN_MUTATION).toMatchSnapshot()
  })
})

describe('CLOCK_OUT_MUTATION', () => {
  it('should AST is not regression', () => {
    expect(CLOCK_OUT_MUTATION).toMatchSnapshot()
  })
})

describe('EDIT_CLOCK_IN_MUTATON', () => {
  it('should AST is not regression', () => {
    expect(EDIT_CLOCK_IN_MUTATON).toMatchSnapshot()
  })
})

describe('DELETE_CLOCK_MUTATION', () => {
  it('should AST is not regression', () => {
    expect(DELETE_CLOCK_MUTATION).toMatchSnapshot()
  })
})

describe('EDIT_CLOCK_OUT_MUTATION', () => {
  it('should AST is not regression', () => {
    expect(EDIT_CLOCK_OUT_MUTATION).toMatchSnapshot()
  })
})
