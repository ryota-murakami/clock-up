import React from 'react'
import { shallow } from 'enzyme'
import { sel } from '../testUtil'
import { App } from './index'

describe('<App />', () => {
  describe('data.loading == true', () => {
    function setup() {
      const data = { loading: true }
      const wrapper = shallow(<App data={data} />)
      return wrapper
    }
    it('[data]propsのみの受け渡しでErrorなくレンダリングされること', () => {
      expect(() => setup()).not.toThrow()
    })
    it('loadingが表示されること', () => {
      const wrapper = setup()
      expect(wrapper.find(sel('loading')).exists()).toEqual(true)
    })
  })
})
