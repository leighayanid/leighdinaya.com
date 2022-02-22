<template>
  <section class="resources">
    <div class="flex">
      <h3 class="text-xl font-semibold">
        Curated Resources. Includes bookmarks, notes, etc.
      </h3>
    </div>
    <div class="my-2">
      <app-list-resources :resources="resources" class="flex-1" />
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const resources = await $content('resources').sortBy('date', 'desc').fetch()

    return {
      resources,
    }
  },

  methods: {
    // filter notes by ascending/descending order of createdAt
    async sortBy(order) {
      this.notes = await this.$content('blogs')
        .only(['title', 'slug', 'date', 'tags'])
        .sortBy('date', order)
        .fetch()
    },
  },
}
</script>
