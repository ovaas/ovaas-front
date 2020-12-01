<template>
  <button class="bg-white border border-gray-300 dark:bg-gray-100 hover:bg-gray-50 dark:hover:bg-gray-200 rounded-full inline-flex justify-center items-center w-10 h-10 focuse:outline-none shadow-sm text-2xl" :disabled="isDisable" :class="{ 'opacity-50 cursor-not-allowed': isDisable }">
    <Icon class="iconify" :icon="icon" />
  </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  icon: {
    type: String,
    default: 'bx:bx-undo',
  },
  isDisable: {
    type: Boolean,
    default: false,
  },
})
</script>

<style>

</style>
