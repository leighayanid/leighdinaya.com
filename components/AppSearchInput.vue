<template>
  <div>
    <input
      type="search"
      autocomplete="off"
      placeholder="Search Blog Posts"
      class="px-3 py-2 rounded-full text-sm text-slate-800 border-1 border relative w-full"
      data-username
      @input="debounceSearch"
      @change="search"
    />
  </div>
</template>

<script>
import debounce from 'debounce'

export default {
  methods: {
    debounceSearch: debounce(function (e) {
      this.search(e)
    }, 1000),

    search(event) {
      this.$emit('search', event)
    },
  },
}
</script>
