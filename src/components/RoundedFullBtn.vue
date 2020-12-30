<template>
  <button class="bg-white border border-gray-300 dark:bg-gray-100 hover:bg-gray-50 dark:hover:bg-gray-200 rounded-full inline-flex justify-center items-center w-10 h-10 focus:outline-none focus:ring-2 shadow-sm text-2xl" :disabled="isDisable" :class="{ 'opacity-50 cursor-not-allowed': isDisable }">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  isDisable: {
    type: Boolean,
    default: false,
  },
})
</script>

<style>

</style>
