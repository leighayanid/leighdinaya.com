<template>
  <ul>
    <li v-for="project of projects" :key="project.title">
      <base-card class="relative">
        <span
          class="border-violet-500 border px-2 py-0 text-xs rounded-full absolute top-10 left-3/4"
          >{{ project.status }}</span
        >
        <NuxtLink :to="`/projects/${project.slug}`">
          <div class="flex flex-col">
            <h2 class="font-inter md:text-2xl text-xl font-bold">
              {{ project.title }}
            </h2>
            <p class="font-thin text-sm">
              {{ project.description }}
            </p>
          </div>
        </NuxtLink>
      </base-card>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    projects: {
      type: Array,
      required: true,
    },
  },
}
</script>
