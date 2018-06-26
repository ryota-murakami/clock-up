import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

// for enzyme
export function sel(id: string): string {
  return `[enzyme-testid="${id}"]`
}
