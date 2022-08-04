<template>
  <div
    class="flex md:flex-row flex-col-reverse justify-between items-start md:items-center md:my-16 my-10 relative"
  >
    <lazy-hydrate when-visible>
      <div>
        <h1
          class="mb-2 md:text-5xl font-inter tracking-wide text-3xl font-extrabold pb-3 dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-r from-blue-400 to-fuchsia-800 sm:pb-5"
        >
          LEIGH DINAYA
        </h1>
        <h2
          class="font-inter font-extrabold md:text-lg text-md mb-4 opacity-90"
        >
          Web developer. Web3 enthusiast. OSS advocate. <br />
          Lifelong learner.
        </h2>
        <h3
          class="md:text-base text-gray-800 dark:text-white text-sm md:w-10/12 w-full"
        >
          I work in <em>Vue.js</em> ecosystem building
          <strong class="decoration-purple-500">server</strong> and
          <strong class="decoration-blue-500">client-side</strong> rendered
          websites, <strong class="decoration-fuchsia-500">Jamstack</strong> and
          <strong class="decoration-purple-500">progressive</strong> web apps.
        </h3>
      </div>
    </lazy-hydrate>

    <lazy-hydrate when-visible>
      <img
        src="./../static/images/profile-lg.webp"
        alt="profile"
        class="md:h-28 md:w-28 h-20 w-20 md:mb-0 mb-2 rounded-full custom-filter relative"
        width="100px"
        height="100px"
        loading="lazy"
      />
    </lazy-hydrate>
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration'
export default {
  components: {
    LazyHydrate,
  },
}
</script>

<style scoped>
.custom-filter {
  filter: grayscale(90%);
}

strong {
  @apply underline decoration-2;
}
</style>
