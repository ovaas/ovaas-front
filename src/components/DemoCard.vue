<template>
  <div class="p-4 flex flex-col bg-white dark:bg-white dark:bg-opacity-15 rounded-lg cursor-pointer border border-transparent hover:border-gray-400 basic-transition" @click="$router.push(demo.path)">
    <div class="relative rounded-lg overflow-hidden w-full pb-2/3">
      <img
        :src="demo.image"
        alt="human-pose-estimation"
        class="absolute object-cover w-full h-full"
      >
    </div>
    <div class="text-left px-2 w-full">
      <h2 class="text-xl font-medium pt-4">
        {{ demo.title }}
      </h2>
      <p class="mt-1">
        {{ demo.content }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  demo: {
    type: Object,
    require: true,
  },
})
</script>

<style scoped>
  p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
</style>
