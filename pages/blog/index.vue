<template>
  <section class="blogs">
    <div class="flex justify-between items-center">
      <h3 class="text-xl font-semibold">Blog</h3>
    </div>
    <app-search-input class="my-3" @search="search"></app-search-input>
    <base-collapse class="my-5 z-50">
      <div class="btn-group">
        <button
          class="border dark:bg-slate-800 bg-slate-200 px-2 py-1 text-sm rounded-full"
          @click="sortBy('desc')"
        >
          Latest
        </button>
        <button
          class="border px-2 py-1 text-sm import CollapseComp from '~/components/base/CollapseComp.vue' rounded-full"
          @click="sortBy('asc')"
        >
          Oldest
        </button>
      </div>
      <app-tags :tags="tags" class="p-2 md:mt-0 mt-5 rounded-lg" @tag="tag" />
    </base-collapse>
    <div class="my-2">
      <app-list-blog
        :blogs="blogs"
        class="flex-1 grid grid-cols-1 md:gap-6 gap-3"
      />
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ params, store }) {
    await store.dispatch('blog/fetchPosts')

    const tags = await store.state.blog.posts.reduce((tags, note) => {
      note.tags.forEach((tag) => {
        if (!tags.includes(tag)) {
          tags.push(tag)
        }
      })

      return tags
    }, [])

    return {
      blogs: store.state.blog.posts,
      tags,
    }
  },

  data() {
    return {
      searchQuery: '',
      searchTag: '',
    }
  },

  watch: {
    async searchQuery(searchQuery) {
      await this.$store.dispatch('blog/searchPosts', {
        query: this.searchQuery,
      })

      if (!searchQuery) {
        this.blogs = this.$store.state.blog.posts
        return
      }

      this.blogs = this.$store.state.blog.searchPosts
    },

    async searchTag(searchTag) {
      await this.$store.dispatch('blog/fetchTagPosts', this.searchTag)
      this.blogs = await this.$store.state.blog.tagPosts
    },
  },

  methods: {
    search(event) {
      this.searchQuery = event.target.value
    },

    tag(tag) {
      this.searchTag = tag
    },
  },
}
</script>
