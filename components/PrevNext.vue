<template>
  <div class="flex justify-between mt-10">
    <div v-if="prev" class="flex flex-col px-4 py-10 w-full">
      <h1>Previous</h1>
      <NuxtLink
        :to="`/blog/${prev.slug}`"
        class="font-bold text-primary hover:underline border-primary"
      >
        {{ prev.title }}
      </NuxtLink>
    </div>

    <div class="flex flex-col px-4 py-10 w-full">
      <h1>Next</h1>
      <NuxtLink
        v-if="next"
        :to="`/blog/${next.slug}`"
        class="font-bold text-primary hover:underline border-primary"
      >
        {{ next.title }}
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    prev: {
      type: Object,
      default: () => null,
    },
    next: {
      type: Object,
      default: () => null,
    },
  },
}
</script>
