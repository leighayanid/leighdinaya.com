<template>
  <ul>
    <li v-for="blog of blogs" :key="blog.slug">
      <base-card>
        <NuxtLink :to="`/blog/${blog.slug}`">
          <div class="flex flex-col">
            <h2 class="font-inter md:text-2xl text-xl font-bold">
              {{ blog.title }}
            </h2>
            <p class="font-thin text-sm">{{ formatDate(blog.date) }}</p>
          </div>
        </NuxtLink>
      </base-card>
    </li>
  </ul>
</template>

<script>
import { formatDate } from '@/utils/formatDate'
export default {
  props: {
    blogs: {
      type: Array,
      required: true,
    },
  },
  methods: {
    formatDate,
  },
}
</script>
