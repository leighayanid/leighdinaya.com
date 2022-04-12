<template>
  <div>
    <div v-if="error.statusCode === 404">
      <h1 class="text-8xl font-extrabold">404</h1>
      <p class="text-xl font-semibold">Page not found.</p>
      <NuxtLink to="/" class="text-purple-500">Home page</NuxtLink>
    </div>
    <h1 v-else class="text-xl font-semibold">An error occurred</h1>
  </div>
</template>

<script>
export default {
  layout: 'none',
  props: ['error'],
}
</script>
