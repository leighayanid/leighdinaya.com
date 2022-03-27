export const state = () => ({
  projects: [],
  project: null,
  featuredProjects: [],
})

export const mutations = {
  SET_PROJECTS(state, projects) {
    state.projects = projects
  },
  SET_PROJECT(state, project) {
    state.project = project
  },
  SET_FEATURED_PROJECTS(state, projects) {
    state.featuredProjects = projects
  },
}

export const actions = {
  async fetchProjects({ commit }) {
    const projects = await this.$content('projects')
      .sortBy('date', 'desc')
      .fetch()
    commit('SET_PROJECTS', projects)
  },

  async fetchFeaturedProjects({ commit }) {
    const projects = await this.$content('projects')
      .where({ featured: { $eq: true } })
      .limit(4)
      .only(['title', 'description', 'status', 'slug', 'date', 'img'])
      .sortBy('date', 'desc')
      .fetch()
    commit('SET_FEATURED_PROJECTS', projects)
  },

  async fetchProject({ commit }, slug) {
    const project = await this.$content('projects', slug).fetch()
    commit('SET_PROJECT', project)
  },
}

export const getters = {
  projects(state) {
    return state.projects
  },
  project(state) {
    return state.project
  },
  featuredProjects(state) {
    return state.featuredProjects
  },
}
