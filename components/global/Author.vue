<template>
  <div class="flex items-start text-left my-10">
    <img
      src="/images/profile.webp"
      class="h-14 w-14 rounded-full mr-3"
      loading="lazy"
    />
    <div class="leading-1 items-center">
      <p>Written by Leigh Dinaya</p>
      <p class="text-sm text-gray-800">
        Front-end developer, writer, and a gym rat.
      </p>
      <app-tags :tags="tags" class="mb-5 mx-auto" @tag="tag" />
    </div>
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
    tag(tag) {
      this.$router.push({
        name: 'tag',
        query: { tag },
      })
    },
  },
}
</script>
