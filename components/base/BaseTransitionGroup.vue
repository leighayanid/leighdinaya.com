<template>
  <transition-group
    mode="out-in"
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
    :duration="{ enter: 500, leave: 500 }"
  >
    <slot />
  </transition-group>
</template>

<script>
export default {}
</script>
