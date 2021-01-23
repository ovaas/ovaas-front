<template>
  <main :class="$attrs.class ? $attrs.class : 'w-5/6'" class="flex flex-col items-start min-h-full px-4 pt-10 mx-auto pb-14">
    <div class="relative mb-8 text-4xl font-bold">
      <h1>{{ title }}</h1>
      <div v-if="backBtn" class="absolute top-0 inline-flex items-center h-full transform -translate-x-12 hover:text-gray-500 dark:hover:text-gray-300">
        <router-link to="/">
          <bx-bx-left-arrow-circle />
        </router-link>
      </div>
    </div>
    <slot />
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
})
</script>

<style>

</style>
