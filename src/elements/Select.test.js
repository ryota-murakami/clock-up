import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Select } from './Select'

describe('<Select />', () => {
  it('should match to spapshot', () => {
    const wrapper = shallow(
      <Select>
        <option value="1">1</option>
      </Select>
    )

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
