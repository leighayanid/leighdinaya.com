import { mount } from '@vue/test-utils'
import ToggleTheme from '@/components/ToggleTheme.vue'

const factory = (propsData) => {
  return mount(ToggleTheme, {
    propsData,
  })
}

describe('ToggleTheme.vue', () => {
  it('wrapper exists', () => {
    const wrapper = factory()
    expect(wrapper.exists()).toBe(true)
  })

  it('renders correctly', () => {
    const wrapper = factory()
    expect(wrapper.element).toMatchSnapshot()
  })

  it('has a button', () => {
    const wrapper = factory()
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('toggle theme to dark', async () => {
    const wrapper = factory()
    wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.darkTheme).toBe(true)
  })

  it('toggle theme to light', async () => {
    const wrapper = factory()
    wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()
    wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.darkTheme).toBe(false)
  })
})
