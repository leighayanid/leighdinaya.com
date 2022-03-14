<template>
  <base-transition>
    <button
      class="w-10 h-10 rounded-full bg-purple-500 text-white grid place-items-center shadow-lg fixed bottom-10 md:right-48 right-5"
      @click="scrollToTop"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M5 15l7-7 7 7"
        />
      </svg>
    </button>
  </base-transition>
</template>

<script>
import BaseTransition from './base/BaseTransition.vue'
export default {
  components: { BaseTransition },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    },
  },
}
</script>
