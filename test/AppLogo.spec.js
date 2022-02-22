import { mount } from '@vue/test-utils'
import AppLogo from '@/components/AppLogo.vue'

describe('AppLogo', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(AppLogo, {
      stubs: {
        NuxtLink: true,
      },
    })
    expect(wrapper.vm).toBeTruthy()
  })
})
