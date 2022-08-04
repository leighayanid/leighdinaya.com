<template>
  <div class="flex items-start text-left my-10">
    <img
      src="/images/profile.webp"
      class="h-14 w-14 rounded-full mr-3"
      loading="lazy"
    />
    <div class="leading-1 items-center">
      <p class="text-gray-900 font-medium">by Leigh Dinaya</p>
      <p class="text-sm dark:text-gray-500">
        Leigh is a passionate web developer who loves to make things work. He
        likes to build products that solve user's problems.
      </p>
      <app-tags :tags="tags" class="mt-2 mb-5 mx-auto" @tag="tag" />
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
      this.$router.push(`/blog/tag/${tag}`)
    },
  },
}
</script>
