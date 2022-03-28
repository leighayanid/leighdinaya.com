export const state = () => ({
  toggle: false,
})

export const mutations = {
  setToggle(state, payload) {
    state.toggle = payload
  },
}

export const actions = {
  setToggle({ commit }, payload) {
    commit('setToggle', payload)
  },
}

export const getters = {
  toggle(state) {
    return state.toggle
  },
}
