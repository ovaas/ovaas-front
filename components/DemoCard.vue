<script setup lang="ts">
import type { Demo } from '@/lib/schema'

const props = defineProps<{ demo: Demo }>()

const { title, description } = useDemoLocale(props.demo)
</script>

<template>
  <NuxtLink :to="`/demo/${demo.slug}`" class="flex flex-col p-4 bg-white border border-transparent shadow-lg cursor-pointer dark:bg-dark-300 rounded-xl hover:border-gray-400 basic-transition">
    <div class="relative w-full mb-4 overflow-hidden rounded-lg pb-2/3">
      <img
        :src="demo.thumbnailUrl"
        alt="human-pose-estimation"
        class="absolute object-cover w-full h-full"
      >
    </div>
    <div class="w-full px-2 text-left">
      <h2 class="text-xl font-semibold">
        {{ title }}
      </h2>
      <p class="mt-1">
        {{ description }}
      </p>
    </div>
  </NuxtLink>
</template>

<style scoped>
  p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
</style>
