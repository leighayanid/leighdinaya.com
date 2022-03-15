<template>
  <div
    class="flex md:flex-row flex-col-reverse justify-between md:items-center md:my-20 my-10 relative"
  >
    <lazy-hydrate when-visible>
      <div>
        <h1
          class="mb-2 font-extrabold md:text-5xl text-3xl font-inter tracking-wide"
        >
          LEIGH DINAYA
        </h1>
        <h2 class="font-inter font-bold mb-4">
          Web developer. Web3 enthusiast. OSS advocate.
        </h2>
        <h3 class="md:text-base text-sm">
          I solve problems and build solutions for the modern web.
          <br />Working primarily on the <em>Vue.js</em> ecosystem.
        </h3>
      </div>
    </lazy-hydrate>

    <lazy-hydrate when-visible>
      <img
        src="./../static/images/profile.jpeg"
        alt="profile"
        class="md:h-28 md:w-28 h-20 w-20 md:mb-0 mb-2 rounded-full custom-filter p-1 relative"
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
</style>
