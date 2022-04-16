<template>
  <ul>
    <li v-for="project of projects" :key="project.title">
      <base-card class="relative">
        <NuxtLink :to="`/projects/${project.slug}`">
          <div class="flex flex-col">
            <h2 class="font-inter md:text-xl text-lg font-bold">
              {{ project.title }}
            </h2>
            <p class="text-sm mt-2">
              {{ project.description }}
            </p>
          </div>
        </NuxtLink>
        <span
          class="border-violet-500 border px-2 py-0 text-xs rounded-full left-3/4"
          >{{ project.status }}</span
        >
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
