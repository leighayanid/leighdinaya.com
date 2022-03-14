import { mount } from '@vue/test-utils'
import AppSearchInput from '@/components/AppSearchInput.vue'

describe('AppSearchInput', () => {
  it('adds a text to the input', async () => {
    const wrapper = mount(AppSearchInput)
    await wrapper.find('[data-username]').setValue('test')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('[data-username]').element.value).toBe('test')
  })

  it('emits expected data', () => {
    const wrapper = mount(AppSearchInput)

    expect(wrapper.exists()).toBeTruthy()
    wrapper.vm.search('test')
    expect(wrapper.emitted().search[0]).toEqual(['test'])
  })

  it('emits empty input', () => {
    const wrapper = mount(AppSearchInput)

    expect(wrapper.exists()).toBeTruthy()
    wrapper.vm.search()
    expect(wrapper.emitted().search[0]).toEqual([undefined])
  })

  // same as above but without mounting the component
  it('emits an event on empty input', () => {
    const events = {}
    const $emit = (event, ...args) => {
      events[event] = [...args]
    }

    AppSearchInput.methods.search.call({ $emit })
    expect(events.search).toEqual([undefined])
  })
})
