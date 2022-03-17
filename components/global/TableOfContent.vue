<template>
  <nav class="dark:bg-zinc-800 bg-zinc-300 p-8 rounded-lg my-10">
    <p>Table of Contents</p>
    <ul>
      <li
        v-for="link of toc"
        :key="link.id"
        :class="{ 'py-2': link.depth === 2, 'ml-2 pb-2': link.depth === 3 }"
      >
        <NuxtLink :to="`#${link.id}`">{{ link.text }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    toc: {
      type: Array,
      required: true,
    },
  },
}
</script>
