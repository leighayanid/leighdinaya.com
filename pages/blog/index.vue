<template>
  <section class="blogs">
    <div class="flex justify-between items-center">
      <h3 class="text-xl font-semibold">Blog</h3>
    </div>
    <lazy-app-search-input
      class="my-3"
      @search="search"
    ></lazy-app-search-input>
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
      <div class="mt-3">
        <h3>Tags</h3>
        <app-tags :tags="tags" class="p-2 md:mt-0 mt-5 rounded-lg" @tag="tag" />
      </div>
    </base-collapse>
    <div class="my-2">
      <ul>
        <li v-for="blog of blogs" :key="blog.slug">
          <NuxtLink :to="`/blog/${blog.slug}`">
            <div class="flex flex-col md:px-10 md:py-7 px-0 py-3">
              <h2 class="font-inter md:text-xl text-lg font-extrabold">
                {{ blog.title }}
              </h2>
              <p class="text-sm mt-2">{{ formatDate(blog.date) }}</p>
            </div>
          </NuxtLink>
          <hr class="my-5" />
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { formatDate } from '~/utils/formatDate'
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

    formatDate,
  },
}
</script>
