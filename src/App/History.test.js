import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { History } from './History'

describe('<History />', () => {
  describe('pass empty array', () => {
    function setup() {
      const wrapper = shallow(<History clocks={[]} />)
      return wrapper
    }

    it('should be render without error', () => {
      const wrapper = setup()

      expect(wrapper.exists()).toBe(true)
    })

    it('should be render with N/A', () => {
      const wrapper = setup()

      expect(wrapper.find('Table__Td').exists()).toBe(true)
      expect(
        wrapper
          .find('Table__Td')
          .first()
          .dive()
          .exists()
      ).toBe(true)
      expect(
        wrapper
          .find('Table__Td')
          .first()
          .dive()
          .text()
      ).toBe('N/A')
    })

    it('should be match snapshot', () => {
      const wrapper = setup()

      expect(toJson(wrapper)).toMatchSnapshot()
    })
  })
  describe('pass first time clock in data', () => {
    const clocks = [
      {
        id: 'cjbfuqo1j3n5p0146x0pjsj7o',
        clockIn: '2017-12-21T02:12:28.707Z',
        clockOut: null,
        createdAt: '2017-12-21T02:12:28.000Z',
        updatedAt: '2017-12-21T02:12:28.000Z',
        __typename: 'Clock'
      }
    ]
    function setup() {
      const wrapper = shallow(<History clocks={clocks} />)
      return wrapper
    }

    it('should be render with N/A', () => {
      const wrapper = setup()

      expect(wrapper.find('Table__Td').exists()).toBe(true)
      expect(
        wrapper
          .find('Table__Td')
          .first()
          .dive()
          .exists()
      ).toBe(true)
      expect(
        wrapper
          .find('Table__Td')
          .first()
          .dive()
          .text()
      ).toBe('N/A')
    })

    it('should be match snapshot', () => {
      const wrapper = setup()

      expect(toJson(wrapper)).toMatchSnapshot()
    })
  })
  describe('pass complete data', () => {
    const clocks = [
      {
        id: 'cjbhtpf8psjmv0146zkmd9zrh',
        clockIn: '2017-12-22T11:19:02.776Z',
        clockOut: null,
        createdAt: '2017-12-22T11:19:03.000Z',
        updatedAt: '2017-12-22T11:19:03.000Z',
        __typename: 'Clock'
      },
      {
        id: 'cjbfuqo1j3n5p0146x0pjsj7o',
        clockIn: '2017-12-21T02:12:28.707Z',
        clockOut: '2017-12-21T16:54:21.094Z',
        createdAt: '2017-12-21T02:12:28.000Z',
        updatedAt: '2017-12-21T16:54:21.000Z',
        __typename: 'Clock'
      }
    ]
    function setup() {
      const wrapper = shallow(<History clocks={clocks} />)
      return wrapper
    }

    it('should be render TotalTime', () => {
      const wrapper = setup()

      expect(wrapper.find('tr').exists()).toBe(true)
      expect(wrapper.html().includes('2017/12/21')).toBe(true) // "date" column
      expect(wrapper.html().includes('14h41m')).toBe(true) // "total" column
      expect(wrapper.html().includes('11:12')).toBe(true) // "in" column
      expect(wrapper.html().includes('01:54')).toBe(true) // "out" column
    })

    it('should be match snapshot', () => {
      const wrapper = setup()

      expect(toJson(wrapper)).toMatchSnapshot()
    })
  })
})
