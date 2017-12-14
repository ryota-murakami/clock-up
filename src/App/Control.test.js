import React from 'react'
import { shallow } from 'enzyme'
import Control from './Control'

describe('<Control />', () => {
  describe('incorrect data', () => {
    const incorrectData = {}
    it('should be throw error', () => {
      expect(() => shallow(<Control data={incorrectData} />)).toThrow()
    })
  })

  describe('during clock-in', () => {
    const data = {
      user: { foo: 'bar', isDuringClockIn: true }
    }
    it('should be show ClockoutBtn', () => {
      const wrapper = shallow(<Control data={data} />)

      expect(wrapper.find('Apollo(Apollo(ClockoutBtn))').exists()).toBe(true)
    })
    it('should be show ClokinTime', () => {
      const wrapper = shallow(<Control data={data} />)

      expect(wrapper.find('ClockinTime').exists()).toBe(true)
    })
  })

  describe('during clock-out', () => {
    const data = {
      user: { foo: 'bar', isDuringClockIn: false }
    }
    it('should be show ClockinBtn', () => {
      const wrapper = shallow(<Control data={data} />)

      expect(wrapper.find('Apollo(Apollo(ClockinBtn))').exists()).toBe(true)
    })
  })
})
