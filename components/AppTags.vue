<template>
  <div>
    <button
      v-for="(tag, index) in tags"
      :key="index"
      class="mr-1 mb-1 border border-gray-500 text-gray-500 px-2 rounded-full text-sm hover:bg-black hover:text-white"
      @click="searchTag"
    >
      {{ tag }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      required: true,
    },
  },
  methods: {
    searchTag(event) {
      this.$emit('tag', event.target.innerText)
    },
  },
}
</script>
