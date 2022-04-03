export const state = () => ({
  posts: [],
  post: {},
  featuredPosts: [],
  searchPosts: [],
  tagPosts: [],
})

export const mutations = {
  SET_POSTS(state, posts) {
    state.posts = posts
  },
  SET_POST(state, post) {
    state.post = post
  },
  SET_FEATURED_POSTS(state, posts) {
    state.featuredPosts = posts
  },
  SET_SEARCH_POSTS(state, posts) {
    state.searchPosts = posts
  },
  SET_TAG_POSTS(state, posts) {
    state.tagPosts = posts
  },
}

export const actions = {
  async fetchPosts({ commit }) {
    const posts = await this.$content('blogs')
      .where({ published: { $eq: true } })
      .sortBy('date', 'desc')
      .fetch()
    commit('SET_POSTS', posts)
  },

  async fetchPost({ commit }, slug) {
    const post = await this.$content('blogs', slug).fetch()
    commit('SET_POST', post)
  },

  async fetchFeaturedPosts({ commit }) {
    const posts = await this.$content('blogs')
      .where({ featured: { $eq: true } })
      .limit(3)
      .only(['title', 'slug', 'date'])
      .sortBy('date', 'desc')
      .fetch()
    commit('SET_FEATURED_POSTS', posts)
  },

  async searchPosts({ commit }, { query }) {
    const posts = await this.$content('blogs')
      .limit(6)
      .sortBy('date', 'desc')
      .search('title', query)
      .fetch()
    commit('SET_SEARCH_POSTS', posts)
  },

  async fetchTagPosts({ commit }, tag) {
    const posts = await this.$content('blogs')
      .where({ tags: { $contains: tag } })
      .sortBy('date', 'desc')
      .fetch()
    commit('SET_TAG_POSTS', posts)
  },
}

export const getters = {
  posts(state) {
    return state.posts
  },
  post(state) {
    return state.post
  },
  featuredPosts(state) {
    return state.featuredPosts
  },
}
