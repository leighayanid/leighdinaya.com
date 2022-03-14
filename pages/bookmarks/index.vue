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
}
</script>
