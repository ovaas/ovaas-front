<template>
  <router-link :to="demo.path" class="flex flex-col p-4 bg-white border border-transparent shadow-lg cursor-pointer dark:bg-white dark:bg-opacity-15 rounded-xl hover:border-gray-400 basic-transition">
    <div class="relative w-full mb-4 overflow-hidden rounded-lg pb-2/3">
      <img
        :src="demo.image"
        alt="human-pose-estimation"
        class="absolute object-cover w-full h-full"
      >
    </div>
    <div class="w-full px-2 text-left">
      <h2 class="text-xl font-semibold">
        {{ demo.title }}
      </h2>
      <p class="mt-1">
        {{ demo.content }}
      </p>
    </div>
  </router-link>
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
