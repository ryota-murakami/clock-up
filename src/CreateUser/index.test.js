import React from 'react'
import { shallow } from 'enzyme'
import { sel } from '../testUtil'
import { CreateUser } from './index'

describe('<CreateUser />', () => {
  describe('data.loading == true', () => {
    function setup() {
      const data = { loading: true }
      const wrapper = shallow(<CreateUser data={data} />)

      return wrapper
    }
    it('Loadingが表示されること', () => {
      const wrapper = setup()
      expect(wrapper.find(sel('loading')).exists()).toEqual(true)
    })
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
