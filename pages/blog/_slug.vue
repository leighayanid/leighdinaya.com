<template>
  <div class="h-auto">
    <article class="my-5">
      <div class="mx-auto">
        <h1 class="text-3xl font-extrabold mt-5">{{ blog.title }}</h1>

        <h2 class="italic">{{ blog.description }}</h2>

        <h3 class="text-gray-500">
          Article last updated: {{ formatDate(blog.updatedAt) }}
        </h3>
      </div>

      <table-of-content v-if="blog.toc" :toc="blog.toc" class="my-5" />

      <nuxt-content
        :document="blog"
        tag="blog"
        class="prose dark:text-slate-50 dark:prose-headings:text-slate-50"
      ></nuxt-content>

      <prev-next :prev="prev" :next="next" class="my-5" />
    </article>

    <div class="flex justify-between items-center my-10">
      <author :tags="blog.tags" class="mx-auto" />
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/utils/formatDate'
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
          content: `https://my-site.com/${this.blog.image}`,
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
          content: `https://my-site.com/${this.blog.image}`,
        },
      ],
    }
  },

  methods: {
    formatDate,
  },
}
</script>
