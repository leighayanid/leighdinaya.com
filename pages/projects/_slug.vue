<template>
  <div class="h-auto">
    <article class="my-5">
      <div class="mx-auto">
        <h1 class="text-xl font-extrabold mt-5">{{ project.title }}</h1>

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
        class="prose dark:text-slate-50 dark:prose-headings:text-slate-50"
      ></nuxt-content>

      <prev-next :prev="prev" :next="next" class="my-5" />
    </article>
  </div>
</template>

<script>
export default {
  name: 'ProjectSlug',

  async asyncData({ $content, store, params }) {
    await store.dispatch('project/fetchProject', params.slug)

    const [prev, next] = await $content('projects')
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()
    return { project: await store.getters['project/project'], prev, next }
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
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
  },
}
</script>
