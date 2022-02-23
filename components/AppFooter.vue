<template>
  <footer class="py-8 bg-slate-100 dark:bg-zinc-800 flex flex-col space-y-4">
    <div class="container flex md:flex-row flex-col justify-between">
      <div class="links flex flex-col space-y-3">
        <nuxt-link to="/">Home</nuxt-link>
        <nuxt-link to="/projects">Projects</nuxt-link>
        <nuxt-link to="/blog">Blog</nuxt-link>
        <nuxt-link to="/about">About</nuxt-link>
      </div>
      <div class="social flex flex-col md:mt-0 mt-3 space-y-3">
        <a href="https://twitter.com/leighrd_">Twitter</a>
        <a href="https://github.com/leighayanid">Github</a>
        <a href="https://youtube.com">Youtube</a>
      </div>
      <div class="social flex flex-col md:mt-0 mt-3 space-y-2">
        <h1 class="font-semibold">Say Hi!</h1>
        <p>leighdinaya@protonmail.com</p>
        <p>+639266781390</p>
      </div>
    </div>
    <div>
      <p class="text-center text-gray-500">&copy; 2020 Leigh R.</p>
    </div>
  </footer>
</template>

<script>
export default {}
</script>
