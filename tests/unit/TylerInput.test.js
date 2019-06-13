import { mount } from '@vue/test-utils'
import TylerInput from '@/components/TylerInput.vue'

describe('TylerInput.vue', () => {
  it('snapshot', () => {
    const wrapper = mount(TylerInput, {
      propsData: {
        value: {
          value: 'value',
          placeholder: 'placeholder'
        }
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
