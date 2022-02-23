<template>
  <section class="projects">
    <div class="flex">
      <h3 class="text-xl font-semibold">Personal Projects</h3>
    </div>
    <div class="my-2">
      <app-list-project
        :projects="projects"
        class="flex-1 grid md:grid-cols-2 grid-cols-1 md:gap-6 gap-3"
      />
    </div>
    <div class="flex justify-between items-center">
      <nuxt-link to="/blog" class="text-lg my-5 underline"
        >All Projects &#x2192;</nuxt-link
      >
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ store }) {
    await store.dispatch('project/fetchProjects')

    return {
      projects: store.getters['project/projects'],
    }
  },
}
</script>
