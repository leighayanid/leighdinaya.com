<template>
  <div class="h-auto">
    <div class="self-end">
      <base-back-button />
    </div>
    <article class="my-5">
      <div class="mx-auto">
        <h1 class="md:text-3xl text-2xl flex items-center font-extrabold mt-5">
          {{ project.title }}
          <a :href="project.project_url" class="ml-2" type="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
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
