import { mount } from '@vue/test-utils'
import AppTags from '@/components/AppTags.vue'

describe('AppTags', () => {
  test('wrapper exists', () => {
    const wrapper = mount(AppTags)
    expect(wrapper.exists()).toBe(true)
  })

  test('renders correct tags', () => {
    const wrapper = mount(AppTags, {
      propsData: {
        tags: ['nuxtjs', 'tailwindcss', 'vuejs'],
      },
    })
    expect(wrapper.vm.tags).toEqual(['nuxtjs', 'tailwindcss', 'vuejs'])
    expect(wrapper.findAll('button').length).toBe(3)
    expect(wrapper.findAll('button').at(0).text()).toBe('nuxtjs')
  })
})
