<template>
  <transition
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
    :duration="{ enter: 1000, leave: 500 }"
  >
    <slot />
  </transition>
</template>

<script>
export default {}
</script>
