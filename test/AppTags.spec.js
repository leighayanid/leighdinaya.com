import { mount } from '@vue/test-utils'
import AppTags from '@/components/AppTags.vue'

describe('AppTags', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(AppTags, {
      propsData: {
        tags: ['nuxtjs', 'tailwindcss', 'vuejs'],
      },
    })
    expect(wrapper.vm.tags).toEqual(['nuxtjs', 'tailwindcss', 'vuejs'])
  })
})
