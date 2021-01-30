<template>
  <main class="h-full px-6 py-10 mx-auto lg:px-10 lg:pt-14 md:pb-16 md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-screen-2xl" :class="layout">
    <div v-if="backBtn" class="items-center hidden text-4xl back md:inline-flex hover:text-gray-500 dark:hover:text-gray-300">
      <router-link to="/">
        <bx-bx-left-arrow-circle />
      </router-link>
    </div>
    <div class="text-4xl font-bold title">
      <h1>{{ title }}</h1>
    </div>
    <div class="content">
      <slot />
    </div>
  </main>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  title: {
    type: String,
    require: true,
  },
  backBtn: {
    type: Boolean,
    default: false,
  },
  layout: {
    type: String,
    default: 'grid-container',
  },
})
</script>

<style scoped>
.home {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  gap: 28px 0px;
}
.grid-container {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  gap: 28px 24px;
  @apply gap-x-0 md:gap-x-5;
}
.back { grid-area: 1 / 1 / 2 / 2; }
.title { grid-area: 1 / 2 / 2 / 3; }
.content { grid-area: 2 / 2 / 3 / 3; }
</style>
