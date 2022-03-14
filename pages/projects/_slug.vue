<template>
  <div class="h-auto">
    <div>
      <base-back-button />
    </div>
    <article class="my-5">
      <div class="mx-auto">
        <h1 class="md:text-3xl text-2xl font-extrabold mt-5">
          {{ project.title }}
        </h1>

        <p class="italic">{{ project.description }}</p>

        <img
          v-if="project.img"
          :src="`/images/${project.img}`"
          class="rounded-lg my-10"
        />
      </div>

      <nuxt-content
        :document="project"
        tag="project"
        class="prose dark:text-slate-50 dark:prose-headings:text-slate-50 dark:prose-a:text-slate-50 dark:prose-code:text-slate-50 dark:prose-inline-code:text-slate-50"
      ></nuxt-content>
    </article>
  </div>
</template>

<script>
import { formatDate } from '@/utils/formatDate'
export default {
  name: 'ProjectSlug',

  async asyncData({ $content, store, params }) {
    await store.dispatch('project/fetchProject', params.slug)
    return {
      project: store.getters['project/project'],
    }
  },

  head() {
    return {
      title: this.project.title,
      meta: [
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: this.project.title },
        { hid: 'og:type', property: 'og:type', content: 'project' },
        {
          hid: 'og:image',
          property: 'og:image',
          content: `https://my-site.com/${this.project.image}`,
        },
        // Twitter Card
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.project.title,
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: `https://my-site.com/${this.project.image}`,
        },
      ],
    }
  },

  methods: {
    formatDate,
  },
}
</script>
