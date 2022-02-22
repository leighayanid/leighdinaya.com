<template>
  <div class="flex items-center font-thin space-x-5 text-md z-50">
    <lazy-toggle-theme />
    <base-transition>
      <button class="md:hidden block" aria-label="toggle" @click="toggleMenu">
        <svg
          v-if="!$store.state.toggle.toggle"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 transition-transform duration-200 transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </base-transition>
  </div>
</template>

<script>
import BaseTransition from './base/BaseTransition.vue'
export default {
  components: { BaseTransition },
  methods: {
    toggleMenu() {
      this.$store.dispatch('toggle/setToggle', !this.$store.state.toggle.toggle)
    },
  },
}
</script>
