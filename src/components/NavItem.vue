<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: 'Home',
  },
})
</script>

<template>
  <div class="flex flex-col items-center justify-center bg-white bg-opacity-0 rounded-lg w-14 h-14 basic-transition hover:(text-black bg-opacity-100 shadow-sm)">
    <slot />
  </div>
</template>
