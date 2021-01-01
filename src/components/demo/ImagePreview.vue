<template>
  <div class="flex-1 bg-white dark:bg-gray-900 rounded-2xl relative overflow-hidden border-2 dark:border-gray-500">
    <ImageShare v-if="image !== ''" :image="image" />
    <img v-if="image !== ''" :src="image" alt="" class="absolute object-contain h-full w-full z-10">
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  image: {
    type: String,
    require: true,
  },
})
</script>
