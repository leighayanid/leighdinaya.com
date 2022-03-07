<template>
  <div class="w-full flex items-center justify-center dark:hidden">
    <div class="relative w-full">
      <div
        class="absolute -top-10 -left-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply custom-filter opacity-30 dark:opacity-80"
      ></div>

      <div
        class="absolute -right-10 md:w-52 md:h-52 h-32 w-32 bg-fuchsia-500 rounded-full custom-filter opacity-30 animate-blob animation-delay-2s"
      ></div>

      <div
        class="transform absolute md:left-10 md:w-72 md:h-72 h-48 w-48 md:top-0 top-10 bg-blue-500 rounded-full mix-blend-multiply custom-filter opacity-30 animate-blob animation-delay-4s"
      ></div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.custom-filter {
  filter: blur(30px);
}
</style>
