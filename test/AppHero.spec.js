import { mount, shallowMount } from '@vue/test-utils'
import AppHero from '@/components/AppHero.vue'

describe('AppHero', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(AppHero)
    expect(wrapper.vm).toBeTruthy()
  })
  test('renders a name', () => {
    const wrapper = shallowMount(AppHero)
    expect(wrapper.find('h1').text()).toBe('LEIGH DINAYA')
  })
  test('renders an image', () => {
    const wrapper = shallowMount(AppHero)
    expect(wrapper.find('img').exists()).toBe(true)
  })
})
