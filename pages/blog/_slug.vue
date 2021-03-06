<template>
  <div class="h-auto">
    <article class="my-5">
      <div class="mx-auto mb-10">
        <h1 class="md:text-2xl text-xl font-extrabold mt-5 text-purple-500">
          {{ blog.title }}
        </h1>

        <h3 class="text-gray-500 mt-2 text-sm">
          {{ blog.readingTime.text }}. Published on
          {{ formatDate(blog.createdAt) }}. Last updated:
          {{ formatDate(blog.updatedAt) }}
        </h3>
        <author :tags="blog.tags" />
      </div>

      <div class="relative">
        <nuxt-content
          :document="blog"
          tag="blog"
          class="prose dark:prose-invert prose-code:bg-none prose-headings:text-purple-500 prose:space-y-5 relative"
        ></nuxt-content>
        <scroll-to-top v-if="showScrollTop" />
      </div>

      <prev-next :prev="prev" :next="next" class="my-5" />
    </article>

    <div class="flex my-10">
      <app-news-letter />
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/utils/formatDate'
import Prism from '@/plugins/prism'

export default {
  name: 'Blogslug',

  async asyncData({ $content, store, params }) {
    await store.dispatch('blog/fetchPost', params.slug)

    const [prev, next] = await $content('blogs')
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()

    return { blog: store.getters['blog/post'], prev, next }
  },

  data() {
    return {
      showScrollTop: false,
    }
  },

  head() {
    return {
      title: this.blog.title,
      meta: [
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: this.blog.title },
        { hid: 'og:type', property: 'og:type', content: 'blog' },
        {
          hid: 'og:image',
          property: 'og:image',
          content: `https://leighdinaya.com/${this.blog.image}`,
        },
        // Twitter Card
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.blog.title,
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: `https://leighdinaya.com/${this.blog.image}`,
        },
      ],
    }
  },

  mounted() {
    Prism.highlightAll()
    window.addEventListener('scroll', () => {
      this.showScrollTop = window.scrollY > 1000
    })
  },

  methods: {
    formatDate,
  },
}
</script>
