<template>
  <ul>
    <li v-for="resource of resources" :key="resource.link">
      <a :href="resource.link" target="_blank">
        <div class="flex items-center border-b border-zinc-400 py-2">
          <span
            class="font-thin text-sm dark:text-slate-200 text-slate-700 w-1/3"
            >{{ formatDate(resource.date) }}</span
          >
          <h2 class="font-inter flex-1">
            {{ resource.title }}
          </h2>
        </div>
      </a>
    </li>
  </ul>
</template>

<script>
import { formatDate } from '~/utils/formatDate'

export default {
  props: {
    resources: {
      type: Array,
      required: true,
    },
  },
  methods: {
    formatDate,
  },
}
</script>
