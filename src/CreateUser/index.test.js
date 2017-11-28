import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import CreateUser from './index'
import { apolloWarapper } from '../testUtil'

describe('<CreateUser />', () => {
  it('snapshot', () => {
    const wrapper = shallow(apolloWarapper(CreateUser))
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  describe('data.loading == true', () => {
    it('Loadingが表示されること', () => {})
  })
  describe('data.loading == false', () => {
    it('Loadingが表示されないこと', () => {})
    describe('isFreshUser() == true', () => {
      it('createUser()が起動すること', () => {})
      it("<Redirect to={{ pathname: '/' }} /> がreturnされること", () => {})
    })
    describe('isFreshUser() == true', () => {
      it('createUser()が起動しないこと', () => {})
      it("<Redirect to={{ pathname: '/' }} /> がreturnされること", () => {})
    })
  })
})
