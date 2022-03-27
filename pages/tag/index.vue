<template>
  <div>
    <h1 class="md:text-xl text-lg font-bold">#{{ tag }}</h1>
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
  </div>
</template>

<script>
import { formatDate } from '~/utils/formatDate'
export default {
  name: 'Tag',
  async asyncData({ route, store }) {
    await store.dispatch('blog/fetchTagPosts', route.query.tag)

    return {
      blogs: store.state.blog.tagPosts,
    }
  },

  methods: {
    formatDate,
  },
}
</script>
