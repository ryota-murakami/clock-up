import React from 'react'
import { shallow } from 'enzyme'
import { Control } from './index'

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
    it('should be show ClockoutButton', () => {
      const wrapper = shallow(<Control data={data} />)

      expect(wrapper.find('Apollo(Apollo(ClockoutButton))').exists()).toBe(true)
    })
    it('should be show ClokinTime', () => {
      const wrapper = shallow(<Control data={data} />)

      expect(wrapper.find('Connect(Apollo(ClockinTime))').exists()).toBe(true)
    })
  })

  describe('during clock-out', () => {
    const data = {
      user: { foo: 'bar', isDuringClockIn: false }
    }
    it('should be show ClockinButton', () => {
      const wrapper = shallow(<Control data={data} />)

      expect(
        wrapper.find('Apollo(Apollo(ClockinButton))').exists()
      ).toBe(true)
    })
  })
})
