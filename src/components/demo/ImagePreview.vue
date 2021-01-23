<template>
  <div class="relative flex-1 overflow-hidden bg-white border-2 dark:bg-gray-900 rounded-2xl dark:border-gray-500">
    <ImageShare v-if="image !== ''" :image="image" />
    <img v-if="image !== ''" :src="image" alt="" class="absolute z-10 object-contain w-full h-full">
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  image: {
    type: String,
    require: true,
  },
})
</script>
