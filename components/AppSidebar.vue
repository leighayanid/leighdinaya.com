<template>
  <div
    v-show="$store.state.toggle.toggle"
    class="w-full h-screen dark:bg-zinc-800 bg-slate-100 rounded-b-lg py-10 px-8 shadow-md transition-opacity z-50"
  >
    <hr class="mt-10 my-5" />
    <div class="text-xl" @click="close">
      <base-transition-group class="flex flex-col">
        <nuxt-link v-if="$store.state.toggle.toggle" key="1" to="/blog"
          >Blog</nuxt-link
        >
        <nuxt-link v-if="$store.state.toggle.toggle" key="2" to="/projects"
          >Projects</nuxt-link
        >
        <nuxt-link v-if="$store.state.toggle.toggle" key="3" to="/bookmarks"
          >Bookmarks</nuxt-link
        >
        <nuxt-link v-if="$store.state.toggle.toggle" key="4" to="/about"
          >About</nuxt-link
        >
        <a
          v-if="$store.state.toggle.toggle"
          key="5"
          href="https://github.com/leighayanid"
          >Github</a
        >
        <a
          v-if="$store.state.toggle.toggle"
          key="6"
          href="https://twitter.com/structdev"
          >Twitter</a
        >
      </base-transition-group>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    close() {
      this.$store.dispatch('toggle/setToggle', !this.$store.state.toggle.toggle)
    },
  },
}
</script>

<style scoped>
a {
  @apply py-2 text-base;
}
</style>
