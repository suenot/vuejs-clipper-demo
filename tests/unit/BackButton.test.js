import { mount, shallowMount } from '@vue/test-utils'
import BackButton from '@/components/BackButton.vue'

describe('BackButton.vue', () => {
  it('render text', () => {
    const msg = 'Назад'
    const wrapper = shallowMount(BackButton)
    expect(wrapper.text()).toMatch(msg)
  })

  it('snapshot', () => {
    const wrapper = mount(BackButton)
    expect(wrapper.element).toMatchSnapshot()
  })
})
