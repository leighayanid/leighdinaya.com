<template>
  <div>
    <lazy-app-sidebar class="absolute top-0 left-0" />
    <lazy-app-navbar />
    <div class="container">
      <Nuxt keep-alive />
    </div>
    <lazy-app-footer />
  </div>
</template>

<script>
export default {}
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s;
}

.page-enter,
.page-leave-to {
  opacity: 0;
}

.layout-enter-active,
.layout-leave-active {
  transition: opacity 0.09s ease-in-out;
}

.layout-enter,
.layout-leave-to {
  opacity: 0;
}
</style>
