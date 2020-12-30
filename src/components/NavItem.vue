<template>
  <div class="flex flex-col justify-center items-center w-14 h-14 bg-white rounded-lg bg-opacity-0 hover:text-black hover:bg-opacity-100 basic-transition hover:shadow-sm">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Home',
  },
})
</script>

<style>
</style>
