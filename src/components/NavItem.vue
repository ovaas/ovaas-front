<template>
  <div class="flex flex-col items-center justify-center bg-white bg-opacity-0 rounded-lg w-14 h-14 hover:text-black hover:bg-opacity-100 basic-transition hover:shadow-sm">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  title: {
    type: String,
    default: 'Home',
  },
})
</script>

<style>
</style>
